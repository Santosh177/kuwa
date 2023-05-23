'use client';
import CouponCode from "./components/CouponCode/CouponCode";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import PaymentFooterBtn from "./components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails , createPayloadForCartItems , createPayloadForItems} from "@/utils";
import { useRouter } from 'next/navigation';
import styles from './payment.module.scss';
import { useState , useEffect} from "react";

export default function Payment({cartData}) {
  const router = useRouter();
  console.log("data",cartData)
  const [data, setData] = useState(cartData);
  const [cartItems , setCartItems] = useState([]);
  const [ priceDetails , setPriceDetails] = useState({});
  const [ paymentOption, setPaymentOption] = useState("TAP");
  const [ selectedPaymentMethod, setSelectedPaymentMethod] = useState("");


  useEffect(()=>{
    if(data && Object.keys(data).length > 0 ){
            if(data['products']){
                getData();
            }
            
    }
},[data]);


const getData = async() => {
    const getCartItem = await getCartItemDetails(data['products']);
    setCartItems(getCartItem)
}

useEffect(()=>{
  if(cartItems && cartItems.length > 0){
    getPriceDetails()

  }

},[cartItems]);

const getPriceDetails = () => {
  const { total=0, subtotal=0, currency = "Dhs" } = data || {};
  const priceDetails2 = {
    cartItemCount: cartItems && cartItems.length,
    subTotal: subtotal,
    totalAmount: total,
    savedAmount: total - subtotal,
    discountAmount:total - subtotal,
    currency:currency
  }
  setPriceDetails(priceDetails2)
}


  const onPayment = async() => {
    const getCartItemResp = await fetch('/api/get-cart-item', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const getCartItems = await getCartItemResp.json();
    const cartItemsData = getCartItems && getCartItems['products'];
    const cartItemPayload = await createPayloadForCartItems(cartItemsData);
    const description = `${"fullName" + ",MULTIPLE_ITEM," + "couponData"}`;
      let payload = {
        "cartUuid":1265,
        "orderType": "one-time",
        "userId": 2200,
        "addressId": 511,
        "countryCode": "AE",
        "countryId": 1,
        "cityId": 2,
        "description": "product, MULTIPLE_ITEM, No Coupon",
        "paymentMode": "CARD",
        "finalAmount": 1500,
        "totalAmount": 1500,
        "currency": "AED",
        "orderSource": "WEBSITE",
        "orderCategory": "CART",
        "couponApplied": true,
        "couponCode": "QA100X",
        "discount": 0,
        "paymentType": "Regular",
        "taxAmount": 81.25,
        "shippingAmount": 80.00,
        "cartItems": cartItemPayload,
        "customerCity": "",
      }
      if(paymentOption == "CHECKOUT_CARD"){
          payload['token'] = 'tok_7hm6eqpr452evmkcqruagdeway';
          console.log("CHECKOUT_CARD",payload)
            // const placeOrderResp  =  await fetch('/api/checkout-place-order', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //       Authorization: 'Bearer ' + "didToken",
            //     },
            //     body:JSON.stringify(payload)
            // })
            // const placeOrder = await placeOrderResp.json();
            // console.log("placeOrderplaceOrder",placeOrder)
            // if(placeOrder && placeOrder.status_code == 200){
            //   router.push(placeOrder.redirect_link)
            // }
      }else if(paymentOption == "TAMARA"){
            let items = await createPayloadForItems();
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
          //   const placeOrderResp  =  await fetch('/api/tamara-place-order', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json'
          //     },
          //     body:JSON.stringify(finalPayload)
          // })
          // const placeOrder = await placeOrderResp.json();
          // console.log("placeOrderplaceOrder",placeOrder)
          // if(placeOrder && placeOrder.status_code == 200){
          //   router.push(placeOrder.redirect_link)
          // }

      }else if(paymentOption == "TABBY"){
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
        //     console.log("PAyloadd",tabbyPayload)
          //      const placeOrderResp  =  await fetch('/api/tabby-place-order', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body:JSON.stringify(finalPayload)
          // })
          //   const placeOrder = await placeOrderResp.json();
          //   console.log("placeOrderplaceOrder",placeOrder)
          //   if(placeOrder && placeOrder.status_code == 200){
          //     router.push(placeOrder.redirect_link)
          //   }

      }else if(paymentOption == "TAP"){
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
          //   console.log("PAyloadd",tabbyPayload)
          //      const placeOrderResp  =  await fetch('/api/tap-place-order', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body:JSON.stringify(finalPayload)
          // })
          //   const placeOrder = await placeOrderResp.json();
          //   console.log("placeOrderplaceOrder",placeOrder)
          //   if(placeOrder && placeOrder.status_code == 200){
          //     router.push(placeOrder.redirect_link)
          //   }
      }else if(paymentOption == "COD"){
        console.log("COD",payload)
      }
  }


 
  console.log("paymentMethod",selectedPaymentMethod)

      return (
        <>
          <div className={styles.orderSummary}>
              <div className={styles.couponCode}>
                <CouponCode />
              </div>
              <div className={styles.paymentMethod}>
              <PaymentMethod onSelectedPaymentMethod ={(paymentMethod)=>setSelectedPaymentMethod(paymentMethod)} selectedPaymentMethod={selectedPaymentMethod} />
              </div>
              <div className={styles.priceDetails}>
                <div className={styles.headerTxt}>Price Details</div>
                <PriceDetails data={priceDetails}/>
              </div>
              <PaymentFooterBtn onProceed={()=>onPayment()} />
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
                <PaymentMethod onSelectedPaymentMethod ={(paymentMethod)=>setSelectedPaymentMethod(paymentMethod)} selectedPaymentMethod={selectedPaymentMethod} />
              </div>
            
              <PaymentFooterBtn onProceed={()=>onPayment()} />
          </div>
        </>
      )
    }
    