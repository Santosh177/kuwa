'use client';
import { usePaymentPageData } from '@/context/payment';
import { useCountryList } from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import { useAuth } from '@/context/userDetail';
import Loader from '@/components/Loader/Loader';
import { useCartItems } from '@/context/cartItems';
import CouponCode from "./components/CouponCode/CouponCode";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import PaymentFooterBtn from "./components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails , createPayloadForCartItems , createPayloadForItems} from "@/utils";
import { useRouter } from 'next/navigation';
import { useAddressData } from "@/context/address";
import styles from './payment.module.scss';
import { useState , useEffect} from "react";
import {getCartItem} from '@/services';
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import DeliveryAddress from '../order-summary/DeliveryAddress/DeliveryAddress'
import CartItemCard from "@/components/CartItemCard/CartItemCard";
import { updateCartItem, deleteCartItem } from '@/services';
import { useRef } from 'react';
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';

const getActivePaymentMethod = (paymentModes,tamaraConfig) => {
  let config ={
      card_checkout: {
        isEnable: false,
      },
      card_tap:{
        isEnable: false,
      },
      tamara: {
        isEnable: false,
        installment:3,
        minLimit:"",
        maxLimit:""
      },
      tabby: {
        isEnable: false,
        installment:"",
        minLimit:"",
        maxLimit:""
      },
      applePay: {
        isEnable: false,
      },
      cod: {
        isEnable: true,
        paymentMode:"COD",
        paymentGateWay:"COD"
      }
  }


 
  paymentModes.map((data,index)=>{
      if(data && data.paymentMode === "APPLE_PAY"){
        // console.log("&& window && window.ApplePaySession;", window && window.ApplePaySession)
        config['applePay']['paymentMode'] =  data.paymentMode;
        config['applePay']['paymentGateway'] =  data.paymentGateway;
        try {
          if(window && window.ApplePaySession){
            config['applePay']['isEnable'] =  true;
          }
        } catch (error) {
          
        }

        
      }else if(data.paymentMode === "TAMARA"){
        config['tamara']['paymentMode'] =  data.paymentMode;
        config['tamara']['paymentGateway'] =  data.paymentGateway;
        config['tamara']['isEnable'] =  true;
        if (tamaraConfig && tamaraConfig.length > 0) {
          const getMinLimit = tamaraConfig[0] && tamaraConfig[0]['min_limit'] && tamaraConfig[0]['min_limit']['amount'] || 0;
          const getMaxLimit = tamaraConfig[0] && tamaraConfig[0]['max_limit'] && tamaraConfig[0]['max_limit']['amount'] || 0;
          config['tamara']['minLimit'] = getMinLimit;
          config['tamara']['maxLimit'] = getMaxLimit;
      }
      }else if(data.paymentMode === "TABBY"){
        config['tabby']['paymentMode'] =  data.paymentMode;
        config['tabby']['paymentGateway'] =  data.paymentGateway;
        config['tabby']['isEnable'] =  true;
      }else if(data.paymentMode === "CARD" && data.paymentGateway === "TAP"){
        config['card_tap']['paymentMode'] =  data.paymentMode;
        config['card_tap']['paymentGateway'] =  data.paymentGateway;
        config['card_tap']['isEnable'] =  true;
      }else if(data.paymentMode === "CARD" && data.paymentGateway === "CHECKOUT"){
        config['card_checkout']['paymentMode'] =  data.paymentMode;
        config['card_checkout']['paymentGateway'] =  data.paymentGateway;
        config['card_checkout']['publicKey'] =  data.paymentGatewayConfig.publicKey;
        config['card_checkout']['isEnable'] =  true;
      }
  })
  return config;

}

const OrderSummayDesktopLayout = ({ priceDetails = {}, paymentMethodConfig = {}, onProceed = {}, onPayment = {}, data, cartItems }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)  
  const { selectedPaymentMethod=""} = usePaymentPageData();
  return(
    <div className={styles.orderSummaryDesktop}>
        <div className={styles.paymentLeftContainer}>
        <div>
          <DeliveryAddress />
        </div>
                <div className={styles.couponCode}>
                  <CouponCode />
                </div>
                <div></div>
                <div className={styles.priceDetails}>
                {/* <div className={styles.headerTxt}>Price Details</div> */}
                <PriceDetails data={priceDetails} />
              </div>
              <div className={styles.productDetailsTitle}>Product Details</div>
        {
          cartItems.map((data, index) => {
            return (
              <CartItemCard data={data} key={index} paymentPage={true} index={index}/>
            )
          })
        }
              </div>
              <div className={styles.paymentMethod}>
                <PaymentMethod price={priceDetails.totalAmount } paymentMethodConfig={paymentMethodConfig} onPayment={onPayment}  />
              </div>
              <PaymentFooterBtn paymentMethodConfig={paymentMethodConfig} onPayment={onPayment} btnName="Proceed To Pay" totalPrice={priceDetails.currency+" "+priceDetails.totalAmount} onProceed={(pMode)=>{(selectedPaymentMethod != "" || pMode!="")?onProceed(pMode):{}}} isEnable={selectedPaymentMethod != ""} />
      </div>
  )
}

const OrderSummayMobileLayout = ({priceDetails ={}, paymentMethodConfig={} , onProceed={}, onPayment={},cartItems}) => {
  const priceDetailsRef = useRef();
  const router = useRouter();
  const { selectedPaymentMethod=""} = usePaymentPageData();
  const showViewDetails = ()=>{
    priceDetailsRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
   }
  return(
    <div className={styles.orderSummary}>
        <div>
          <DeliveryAddress />
        </div>
    <div className={styles.couponCode}>
      <CouponCode />
    </div>
    <div className={styles.paymentMethod}>
    <PaymentMethod price={priceDetails.totalAmount } paymentMethodConfig={paymentMethodConfig} onPayment={onPayment} />
    </div>
    <div className={styles.priceDetails} ref={priceDetailsRef} >
      {/* <div className={styles.headerTxt}>Price Details</div> */}
      {<PriceDetails data={priceDetails}/>}
    </div>
    <div className={styles.productDetailsTitle}>Product Details</div>
    {
          cartItems.map((data, index) => {
            return (
              <CartItemCard paymentPage={true} data={data} key={index} index={index} />
            )
          })
        }
    <PaymentFooterBtn paymentMethodConfig={paymentMethodConfig}  onPayment={onPayment} btnName="Proceed To Pay" totalPrice={priceDetails.currency+" "+priceDetails.totalAmount} onProceed={(pMode)=>{(selectedPaymentMethod != "" || pMode!="")?onProceed(pMode):{}}}  isEnable={selectedPaymentMethod != ""}/>
</div>
  )
}

export default function Payment({cartData,paymentModes,tamaraConfig}) {
  console.log("paymentModes",paymentModes)
  const router = useRouter();
  const {couponCodeData={}, selectedPaymentMethod=""} = usePaymentPageData();
  const countryList = useCountryList();
  const { selectedCountry={} } = useCountry();
  const {isLogin=false, userData={}} = useAuth();
  console.log("countryListcountryList",countryList)
  console.log("selectedCountryselectedCountry",selectedCountry)
  const selectedCountryCode = selectedCountry && selectedCountry.code || "BH"
  const deliveryFeesConfig = countryList.find((data) => data.code == selectedCountryCode || data.code == selectedCountryCode) || {}
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} } = useAddressData();
  const [ data, setData] = useState(cartData);
  const [ cartItems , setCartItems] = useState([]);
  const [ priceDetails , setPriceDetails] = useState({});
  const [ isLoader , setIsLoader] = useState(false);
  const [tamaraPaymentConfig, setTamaraPaymentConfig] = useState([])
  const [ paymentMethodConfig , setPaymentMethodConfig] = useState(getActivePaymentMethod(paymentModes,[]));
  const clevertapEvent = useCleverTapEvents();
  const {setCartItemCount={} } = useCartItems();
  const [pageType, setPageType] = useState(getPageType())
  let appleSession;
  
  // useEffect(()=>{
  //   if(Object.keys(selectedAddress).length == 0){
  //     const getAddressIdFromLocalStorage = localStorage.getItem('addressId');
  //       const findSelectedAddress = listOfAddress.find((data) => data.id == JSON.parse(getAddressIdFromLocalStorage));
  //       setSelectedAddress(findSelectedAddress)
  //   }

  // },[listOfAddress])

  useEffect(() => {
    const handleResize = () => {
      setPageType(getPageType());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  function getPageType() {
    return window.innerWidth > 770 ? 'web' : 'mWeb';
  }

  useEffect(()=>{
    if(selectedAddress && Object.keys(selectedAddress).length == 0){
          const defaultAddress = listOfAddress.find((data) => data.isDefault);
          if(defaultAddress){
            setSelectedAddress(defaultAddress)
          }else{
            setSelectedAddress(listOfAddress[0])
          }
    }
  },[listOfAddress])

  useEffect(()=>{
    setData(cartData);
    if(cartData && cartData.quantity){
      setCartItemCount(cartData.quantity)
    }
  },[cartData])
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

  useEffect(()=>{
    getTamaraPaymentTypes()
  },[])

  useEffect(()=>{
    if(tamaraPaymentConfig && tamaraPaymentConfig.length > 0){
      const getPaymentMethodData = getActivePaymentMethod(paymentModes,tamaraPaymentConfig);
      setPaymentMethodConfig(getPaymentMethodData)
    }
  },[tamaraPaymentConfig])

  const getTamaraPaymentTypes = async() =>{
    try {
      const countryCode = selectedCountryCode;
      const getTamaraPaymentResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/tamara/payment-types?countryCode=${countryCode}`, {
        method: 'GET',
        cache: 'no-store' 
      })
      const getTamaraPaymentConfigData = await getTamaraPaymentResp.json();
      setTamaraPaymentConfig(getTamaraPaymentConfigData)
    } catch (error) {
  
    }
  
  }


  const applyCouponDiscount = () => {
    const { totalAmount=0 } = priceDetails || {};
    const {total=0} = data || {};
    if(couponCodeData && Object.keys(couponCodeData).length > 0 && couponCodeData.discount ){
      const couponDiscountAmount = couponCodeData.discount || 0;
      setPriceDetails((prevState) => {
        return({
          ...prevState,
          totalAmount:totalAmount - couponDiscountAmount,
          finalPayloadTotalAmount:totalAmount,
          discountAmount: couponDiscountAmount
        });
      });
    }else{
      calculatePriceDetails()
      // setPriceDetails((prevState) => {
      //   return({
      //     ...prevState,
      //     totalAmount:total,
      //     discountAmount: 0
      //   });
      // });
    }
  }


  const getData = async() => {
      const getCartItem = await getCartItemDetails(data['products'],data.currency);
      setCartItems(getCartItem)
  }
 

  useEffect(()=>{
    if(cartItems && cartItems.length > 0){
      calculatePriceDetails()
    }

  },[cartItems]);

  useEffect(() => {
    clevertapEvent.onCleverTapEvent("kuwa_payments_landing");  
  }, [])

  const calculatePriceDetails = () => {
    const { total=0, subtotal=0, currency = "" } = data || {};
    const minThreshold = deliveryFeesConfig.minThreshold || 0;
    let  finalAmount = total;
    if(total < minThreshold){
      finalAmount = total + deliveryFeesConfig.deliveryFee
    }
    
    const priceDetailsData = {
      cartItemCount: cartData && cartData.quantity,
      subTotal: subtotal,
      totalAmount: finalAmount,
      finalPayloadTotalAmount:finalAmount,
      savedAmount: total - subtotal,
      discountAmount:total - subtotal,
      currency:currency,
      deliveryFees: (total < minThreshold) ? deliveryFeesConfig.deliveryFee : 0
    }
    setPriceDetails(priceDetailsData)
  }

  const calculateVatPercentage = async (subTotal) => {
    if (selectedCountry && selectedCountry) {
      const vatPercentage = selectedCountry.vat;
      const vatAmount = subTotal-(((subTotal)* (100)) / (100 + (vatPercentage)))
      return parseFloat(vatAmount.toFixed(2));
    }
  }


    const onPayment = async(data,pMode="") => {
      setIsLoader(true);
      const userName = userData && userData['firstName'] || "";
      const getCartItems = await getCartItem();
      const cartItemsData = getCartItems && getCartItems['products'];
      const cartItemPayload = await createPayloadForCartItems(cartItemsData);
      const isCouponApplied = (couponCodeData['reason'] === "Applied Successfully")
      const description = `${userName + ",MULTIPLE_ITEM," + couponCodeData['coupon']}`;
      const userId = getCartItems['customer'] || userData['id'] || null;
      const taxAmount = await calculateVatPercentage(priceDetails['subTotal'])
      function getDeviceType() {
        if (isMobile) {
          if (isAndroid) {
            return 'Android';
          } else if (isIOS) {
            return 'iOS';
          } else {
            return 'Mobile';
          }
        } else if (isTablet) {
          return 'Tablet';
        } else {
          return 'Desktop';
        }
      }
        let payload = {
          "cartId":getCartItems['id'] || "",
          "orderType": "one-time",
          "userId": userId || "",
          "billingAddressId":selectedAddress && selectedAddress.asoBillingAddress || "",
          "shippingAddressId":selectedAddress && selectedAddress.id || "",
          "addressId": selectedAddress && selectedAddress.id || "",
          "countryCode": selectedCountry.code || "",
          "countryId": selectedCountry.id || "",
          "description": description,
          "finalAmount": priceDetails['totalAmount'],
          "totalAmount": priceDetails['finalPayloadTotalAmount'],
          "currency": selectedCountry.currency || "",
          "orderSource": "WEBSITE",
          "orderCategory": "CART",
          "couponApplied": isCouponApplied || false,
          "couponCode": couponCodeData['coupon'] || "",
          "discount": priceDetails['discountAmount'],
          "paymentType": "Regular",
          "taxAmount": taxAmount,
          "shippingAmount": 0,
          "deliveryCharges":priceDetails['deliveryFees'],
          "cartItems": cartItemPayload,
          "deviceType":getDeviceType(),
          "pageType":pageType
        }
      const trackData = {
        'Order Amount': payload['finalAmount'],
      }
      if (payload && payload['couponCode']) {
        trackData['Promo Code'] = payload['couponCode'] || '';
        trackData['Coupon Discount'] = payload['discount']
      }
        if(priceDetails['totalAmount'] == 0){
          payload['paymentMode'] = "100%";
          trackData['Payment Type'] = 'Zero final Amount' || ''
          clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData); 
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
                // router.push('/payment/success')
                window.location.href = '/payment/success'
              }
        }
        if(selectedPaymentMethod == "CHECKOUT_CARD"){
            payload['token'] = data['token'];
            payload['paymentMode'] = "CARD";
            trackData['Payment Type'] = 'card' || '';
            trackData['Payment Gateway'] = 'checkout' || '';
            clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData); 

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
                if(placeOrder && placeOrder.redirect_link){
                  window.location.href = placeOrder.redirect_link
                }else {
                  if(placeOrder && placeOrder.order_id){
                    window.location.href = `/payment/success?orderId=${placeOrder.order_id}`
                  }
                 
                }
                // router.push(placeOrder.redirect_link)
                // window.location.href = placeOrder.redirect_link
              }
        }else if(selectedPaymentMethod == "TAMARA"){
              trackData['Payment Type'] = 'tamara' || '';
              clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData); 
              let items = await createPayloadForItems(cartItemsData);
              let tamaraPayload = {
                "paymentMode":"TAMARA",
                "paymentType":"PAY_BY_INSTALMENTS",
                "locale":"en_BH",
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
              // router.push(placeOrder.redirect_link)
              window.location.href = placeOrder.redirect_link
            }

        }else if(selectedPaymentMethod == "TABBY"){
              trackData['Payment Type'] = 'TABBY' || ''
              clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData); 
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
                // router.push(placeOrder.redirect_link)
                window.location.href = placeOrder.redirect_link
              }

        }else if(selectedPaymentMethod == "TAP"){
              trackData['Payment Type'] = 'TAP' || ''
              clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData); 
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
                // router.push(placeOrder.redirect_link)
                window.location.href = placeOrder.redirect_link
              }
        }else if(selectedPaymentMethod == "COD"){
            payload['paymentMode'] = "COD";
            trackData['Payment Type'] = 'Cod' || ''
            clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData); 
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
              const orderId =placeOrder && placeOrder.order_id
              if(placeOrder && placeOrder.status_code == 200){
                if(orderId){
                  // router.replace(`/payment/success?orderId=${orderId}`)
                  window.location.href = `/payment/success?orderId=${orderId}&couponDiscount=${priceDetails['discountAmount']}&totalPurchaseValue=${priceDetails['totalAmount']}`
                }else{
                  window.location.href = `/payment/success`
                  // router.replace(`/payment/success`)
                }
               
              }
        }else if(selectedPaymentMethod == "APPLE_PAY" || pMode === "APPLE_PAY"){
          payload['token'] = data.token;
          payload['paymentMode'] = "APPLE_PAY";
          trackData['Payment Type'] = 'Apple pay' || ''
          clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData); 
            const placeOrderResp  =  await fetch('/api/apple-pay-place-order', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(payload)
            })
      
            const placeOrder = await placeOrderResp.json();
            setIsLoader(false);
            if(placeOrder && placeOrder.status_code == 200){
              appleSession.completePayment(ApplePaySession.STATUS_SUCCESS);
              // router.push(`/payment/success?orderId=${placeOrder.order_id}`)
              window.location.href = `/payment/success?orderId=${placeOrder.order_id}`
            }
            // const applePaySupportednetworks = "visa, mastercard, amex";
            // let request = {
            //   merchantCapabilities: ['supports3DS'],
            //   supportedNetworks: applePaySupportednetworks.split(", "),
            //   countryCode: selectedCountry.code || "",
            //   currencyCode:  selectedCountry.currency || "",
            //   total: { label: "For " + "Multiple_Package", amount: priceDetails['totalAmount'] },
            // };
            // appleSession = new ApplePaySession(3, request);
            // appleSession.begin();
            // appleSession.onvalidatemerchant = async (event) => {
            //   const appleValidationURL = event && event.validationURL;
            //   const validateData = {"apple_url":appleValidationURL,"merchant_name":'checkout'};
            //   console.log("validateDatavalidateData",validateData)
            //   const validateSessionResp  =  await fetch('/api/validate-apple-pay', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body:JSON.stringify(validateData)
            //   })
            //   const validateSessionData = await validateSessionResp.json();
            //   console.log("validateSessionData",validateSessionData)
            //   const getValidateSession = get(validateSessionData, 'data.session_response');
            //   if (getValidateSession) {
            //     appleSession.completeMerchantValidation(getValidateSession);
            //   }
            //   appleSession.onpaymentauthorized = async (event) => {
            //     const appleToken = get(event, 'payment.token');
            //     console.log("appleToken",appleToken)
            //       const decryptAppleTokenResp  =  await fetch('/api/decrypt-apple-token', {
            //         method: 'POST',
            //         headers: {
            //           'Content-Type': 'application/json',
            //         },
            //         body:JSON.stringify(appleToken)
            //       })
            //       const decryptAppleToken = await decryptAppleTokenResp.json();
            //       console.log("decryptAppleToken",decryptAppleToken)
            //       const getCheckoutToken = get(decryptAppleToken, 'data.token_response');
            //       if (getCheckoutToken) {
            //         payload['token'] = getCheckoutToken.token;
            //         payload['paymentMode'] = "APPLE_PAY";
            //         console.log("FInalRESPpayload",payload)
            //           const placeOrderResp  =  await fetch('/api/checkout-place-order', {
            //               method: 'POST',
            //               headers: {
            //                 'Content-Type': 'application/json',
            //               },
            //               body:JSON.stringify(payload)
            //           })
                
            //           const placeOrder = await placeOrderResp.json();
            //           console.log("placeOrderplaceOrder",placeOrder)
            //           setIsLoader(false);
            //           if(placeOrder && placeOrder.status_code == 200){
            //             router.push(placeOrder.redirect_link)
            //           }
            //       }
            //   }
            // }
        }
    }


    const onProceed = (pMode) => {
     
      if(selectedPaymentMethod =="CHECKOUT_CARD"){
        Frames.submitCard()
      }else if(selectedPaymentMethod === "APPLE_PAY" || pMode === "APPLE_PAY"){
        const applePaySupportednetworks = "visa, mastercard, amex";
        let request = {
          merchantCapabilities: ['supports3DS'],
          supportedNetworks: applePaySupportednetworks.split(", "),
          countryCode: selectedCountry.code || "",
          currencyCode:  selectedCountry.currency || "",
          total: { label: "For " + "Multiple_Package", amount: priceDetails['totalAmount'] },
        };
        appleSession = new ApplePaySession(3, request);
        appleSession.begin();
        appleSession.onvalidatemerchant = async (event) => {
          const appleValidationURL = event && event.validationURL;
          // alert("va"+JSON.stringify(appleValidationURL))
          const validateData = {"apple_url":appleValidationURL,"merchant_name":'checkout'};
          console.log("validateDatavalidateData",validateData)
          const validateSessionResp  =  await fetch('/api/validate-apple-pay-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(validateData)
          })
          const validateSessionData = await validateSessionResp.json();
          console.log("validateSessionData",validateSessionData)
          const getValidateSession = validateSessionData['session_response'];
          if (getValidateSession) {
            appleSession.completeMerchantValidation(getValidateSession);
          }
          appleSession.onpaymentauthorized = async (event) => {
            const appleToken = event.payment.token;
              const decryptAppleTokenResp  =  await fetch('/api/decrypt-apple-token', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(appleToken)
              })
              const decryptAppleToken = await decryptAppleTokenResp.json();
              const getCheckoutToken = decryptAppleToken.token_response;
              if (getCheckoutToken) {
                let data = {
                  token: getCheckoutToken.token
                } 
                onPayment(data,pMode)
               
              }
          }
        }
      }
      else if(selectedPaymentMethod){
        onPayment()
      }
    }



      return (
        <>
          <OrderSummayMobileLayout priceDetails={priceDetails} paymentMethodConfig={paymentMethodConfig} onProceed={onProceed} onPayment={onPayment} data={data} cartItems={cartItems} />
          <OrderSummayDesktopLayout priceDetails={priceDetails} paymentMethodConfig={paymentMethodConfig} onProceed={onProceed} onPayment={onPayment} data={data} cartItems={cartItems} />
          <Loader isShow={isLoader} />
        </>
      )
    }
    