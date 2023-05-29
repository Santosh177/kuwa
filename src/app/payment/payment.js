'use client';
import { usePaymentPageData } from '@/context/payment';
import { useCountryList } from '@/context/countryList';
import { useAuth } from '@/context/userDetail';
import Loader from '@/components/Loader/Loader';
import CouponCode from "./components/CouponCode/CouponCode";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails , createPayloadForCartItems , createPayloadForItems} from "@/utils";
import { useRouter } from 'next/navigation';
import { useAddressData } from "@/context/address";
import styles from './payment.module.scss';
import { useState , useEffect} from "react";
import {getCartItem} from '@/services'

export default function Payment({cartData,paymentModes}) {
  const router = useRouter();
  const {couponCodeData={}} = usePaymentPageData();
  const countryList = useCountryList();
  const {isLogin=false, userData={}} = useAuth();
  const deliveryFeesConfig = countryList.find((data) => data.code == "AE" || data.code == "AF")
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} } = useAddressData();
  console.log("data",cartData)
  const [data, setData] = useState(cartData);
  const [cartItems , setCartItems] = useState([]);
  const [ priceDetails , setPriceDetails] = useState({});
  const [ paymentOption, setPaymentOption] = useState("TAP");
  const [ selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [ isLoader , setIsLoader] = useState(false)


  useEffect(()=>{
    if(data && Object.keys(data).length > 0 ){
            if(data['products']){
                getData();
            }
            
    }
},[data]);


useEffect(()=>{
  console.log("couponCodeDatacouponCodeData",couponCodeData)
  applyCouponDiscount()
},[couponCodeData])


const applyCouponDiscount = () => {
  const { totalAmount=0 } = priceDetails || {};
  const {total=0} = data || {};
  if(couponCodeData && Object.keys(couponCodeData).length > 0 && couponCodeData.discount ){
    const couponDiscountAmount = couponCodeData.discount || 0;
    setPriceDetails((prevState) => {
      return({
        ...prevState,
        totalAmount:totalAmount - couponDiscountAmount,
        discountAmount: couponDiscountAmount
      });
    });
  }else{
    setPriceDetails((prevState) => {
      return({
        ...prevState,
        totalAmount:total,
        discountAmount: 0
      });
    });
  }
}


const getData = async() => {
    const getCartItem = await getCartItemDetails(data['products']);
    setCartItems(getCartItem)
}

useEffect(()=>{
  if(cartItems && cartItems.length > 0){
    calculatePriceDetails()
  }

},[cartItems]);

const calculatePriceDetails = () => {
  const { total=0, subtotal=0, currency = "" } = data || {};
  const minThreshold = deliveryFeesConfig.minThreshold || 0;
  let  finalAmount = total;
  if(total < minThreshold){
    finalAmount = total + deliveryFeesConfig.deliveryFee
  }
   
  const priceDetailsData = {
    cartItemCount: cartItems && cartItems.length,
    subTotal: subtotal,
    totalAmount: finalAmount,
    savedAmount: total - subtotal,
    discountAmount:total - subtotal,
    currency:currency,
    deliveryFees: (total < minThreshold) ? deliveryFeesConfig.deliveryFee : 0
  }
  setPriceDetails(priceDetailsData)
}


  const onPayment = async(data) => {
    console.log("userDatauserData",userData);
    setIsLoader(true);

    const userName = userData && userData['userName'] || "";
   
    const getCartItems = await getCartItem();
    const cartItemsData = getCartItems && getCartItems['products'];
    const cartItemPayload = await createPayloadForCartItems(cartItemsData);
    const isCouponApplied = (couponCodeData['reason'] === "Applied Successfully")
    const description = `${userName + ",MULTIPLE_ITEM," + couponCodeData['couponCode']}`;
    const userId = getCartItems['customer'] || null;
    console.log("selectedAddress",selectedAddress)
      let payload = {
        "cartId":getCartItems['id'] || "",
        "orderType": "one-time",
        "userId": userId || "",
        "addressId": selectedAddress && selectedAddress.id || 511,
        "countryCode": "AE",
        "countryId": 1,
        "description": description,
        "finalAmount": priceDetails['totalAmount'],
        "totalAmount": priceDetails['totalAmount'],
        "currency": "AED",
        "orderSource": "WEBSITE",
        "orderCategory": "CART",
        "couponApplied": isCouponApplied || false,
        "couponCode": couponCodeData['couponCode'] || "",
        "discount": priceDetails['discountAmount'],
        "paymentType": "Regular",
        "taxAmount": 0,
        "shippingAmount": 0,
        "deliveryCharges":priceDetails['deliveryFees'],
        "cartItems": cartItemPayload
      }
      if(priceDetails['totalAmount'] == 0){
        payload['paymentMode'] = "100%";
            const placeOrderResp  =  await fetch('/api/place-order-without-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(payload)
            })
            const placeOrder = await placeOrderResp.json();
            console.log("placeOrderplaceOrder",placeOrder)
            setIsLoader(false);
            if(placeOrder && placeOrder.status_code == 200){
              router.push('/payment/success')
            }
      }
      if(selectedPaymentMethod == "CHECKOUT_CARD"){
          payload['token'] = data['token'];
          payload['paymentMode'] = "CARD";
          console.log("CHECKOUT_CARD",payload)
            const placeOrderResp  =  await fetch('/api/checkout-place-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(payload)
            })
            const placeOrder = await placeOrderResp.json();
            console.log("placeOrderplaceOrder",placeOrder)
            setIsLoader(false);
            if(placeOrder && placeOrder.status_code == 200){
              router.push(placeOrder.redirect_link)
            }
      }else if(selectedPaymentMethod == "TAMARA"){
            let items = await createPayloadForItems(cartItemsData);
            let tamaraPayload = {
              "paymentMode":"TAMARA",
              "paymentType":"PAY_BY_INSTALMENTS",
              "locale":"en_AE",
              "installments":3,
              "items": items
            }
            const finalPayload ={...payload,...tamaraPayload};
            console.log("TAMARA",finalPayload)
          //   console.log("Paylaof",payload)
            const placeOrderResp  =  await fetch('/api/tamara-place-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(finalPayload)
          })
          const placeOrder = await placeOrderResp.json();
          console.log("placeOrderplaceOrder",placeOrder)
          setIsLoader(false);
          if(placeOrder && placeOrder.status_code == 200){
            router.push(placeOrder.redirect_link)
          }

      }else if(selectedPaymentMethod == "TABBY"){
            let items = await createPayloadForItems(cartItemsData);
            let tabbyPayload = {
              "paymentMode":"TABBY",
              "paymentType":"PAY_BY_INSTALMENTS",
              "locale":"en",  
              "installments":4,
              "items": items
            }
            const finalPayload = {...payload,...tabbyPayload}
           console.log("TABBY",finalPayload)
            console.log("PAyloadd",tabbyPayload)
               const placeOrderResp  =  await fetch('/api/tabby-place-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(finalPayload)
          })
            const placeOrder = await placeOrderResp.json();
            console.log("placeOrderplaceOrder",placeOrder)
            setIsLoader(false);
            if(placeOrder && placeOrder.status_code == 200){
              router.push(placeOrder.redirect_link)
            }

      }else if(selectedPaymentMethod == "TAP"){
            let items = await createPayloadForItems(cartItemsData);
            let tapPayload = {
              "paymentMode":"TAP",
              "paymentType":"PAY_BY_INSTALMENTS",
              "locale":"en",  
              "installments":4,
              "items": items
            }
            const finalPayload = {...payload,...tapPayload}
            console.log("TAP",finalPayload)
               const placeOrderResp  =  await fetch('/api/tap-place-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(finalPayload)
          })
            const placeOrder = await placeOrderResp.json();
            console.log("placeOrderplaceOrder",placeOrder)
            setIsLoader(false);
            if(placeOrder && placeOrder.status_code == 200){
              router.push(placeOrder.redirect_link)
            }
      }else if(selectedPaymentMethod == "COD"){
          payload['paymentMode'] = "COD";
            const placeOrderResp  =  await fetch('/api/place-order-without-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(payload)
            })
            const placeOrder = await placeOrderResp.json();
            console.log("placeOrderplaceOrder",placeOrder)
            setIsLoader(false);
            if(placeOrder && placeOrder.status_code == 200){
              router.push('/payment/success')
            }
      }
  }


  const onProceed = () => {
    if(selectedPaymentMethod =="CHECKOUT_CARD"){
      Frames.submitCard()
    }else if(selectedPaymentMethod){
      onPayment()
    }

  }

 

      return (
        <>
          
          <div className={styles.orderSummary}>
              <div className={styles.couponCode}>
                <CouponCode />
              </div>
              <div className={styles.paymentMethod}>
              <PaymentMethod price={priceDetails.totalAmount } paymentModes={paymentModes} onPayment={(data)=>onPayment(data)} onSelectedPaymentMethod ={(paymentMethod)=>setSelectedPaymentMethod(paymentMethod)} selectedPaymentMethod={selectedPaymentMethod} />
              </div>
              <div className={styles.priceDetails}>
                <div className={styles.headerTxt}>Price Details</div>
                <PriceDetails data={priceDetails}/>
              </div>
              {/* <PaymentFooterBtn onProceed={()=>onPayment()} /> */}
              <PaymentFooterBtn btnName="Proceed to pay" totalPrice={priceDetails.currency+" "+priceDetails.totalAmount} onProceed={onProceed} />
          </div>
          <div className={styles.orderSummaryDesktop}>
              <div className={styles.paymentLeftContainer}>
                <div className={styles.couponCode}>
                  <CouponCode />
                </div>
                <div className={styles.priceDetails}>
                <div className={styles.headerTxt}>Price Details</div>
                <PriceDetails data={priceDetails} />
              </div>
              </div>
              <div className={styles.paymentMethod}>
                <PaymentMethod price={priceDetails.totalAmount } paymentModes={paymentModes} onPayment={(data)=>onPayment(data)} onSelectedPaymentMethod ={(paymentMethod)=>setSelectedPaymentMethod(paymentMethod)} selectedPaymentMethod={selectedPaymentMethod} />
              </div>
              {/* <PaymentFooterBtn onProceed={()=>onProceed()  } /> */}
              <PaymentFooterBtn btnName="Proceed to pay" totalPrice={priceDetails.currency+" "+priceDetails.totalAmount} onProceed={onProceed} />
          </div>
          <Loader isShow={isLoader} />
        </>
      )
    }
    