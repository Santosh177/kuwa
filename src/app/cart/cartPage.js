
'use client';
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { useCountryList } from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import { useCartItems } from '@/context/cartItems';
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetailsInfo from "@/components/PriceDetails/PriceDetails";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails } from "@/utils";
import Loader from "@/components/Loader/Loader";
import { deleteCartItem , updateCartItem } from '@/services';
import styles from './cart-page.module.scss';
import useCleverTapEvents from "@/hooks/useCleverTapEvents";
import { useAuth } from '@/context/userDetail';
import { createPayloadForCartItems,getDialCode } from "@/utils";
import {getCartItem} from '@/services';
import { useRef } from 'react';
export default  function Cart({cartData}) {
    console.log("to check")
    const router = useRouter();
    const countryList = useCountryList();
    const {setCartItemCount={} } = useCartItems();
    const { selectedCountry={} } = useCountry();
    const deliveryFeesConfig = selectedCountry;
    const [ data , setData ] = useState(cartData);
    const [ cartItems , setCartItems ] = useState([]);
    const [ priceDetails , setPriceDetails ] = useState({});
    const [ haveAddress, setHaveAddress] = useState(false);
    const [ isLoading , setIsLoading ] = useState(false);
    const clevertapEvent = useCleverTapEvents();
    const {isLogin=false, userData={}} = useAuth();
    const [isApplePaySession , setIsApplePaySession] = useState(false)
     let appleSession;

  

    useEffect(()=>{
      try {
        if(window && window.fcWidget){
          window.fcWidget.hide()
        }
      } catch (error) {
        
      }

   
      setData(cartData);

      if(cartData && cartData.quantity){
        setCartItemCount(cartData.quantity)
      }
      
    },[cartData])


    useEffect(()=>{
      getAddress()
      if(window && window.ApplePaySession){
        setIsApplePaySession(true)
      }
    },[])


    useEffect(()=>{
        if(data && Object.keys(data).length > 0 ){
          if(data['products']){
              getData();
          }
                
        }
    },[data]);

    useEffect(() => {
      if ( cartData && cartData.products && cartData.products.length > 0) {
          let trackData = []
          cartData.products.map((item) => {
              const productId = item && item.id || "";
              const productName = item && item.description && item.description.name || "";
              const qty = item && item.quantity || 1;
              let variantId = null;
              let track = {
                  productId: productId,
                  productName: productName,
                  quantity: qty,
              }
              if(item && item.variants && item.variants.variants){
                 variantId = item.variants.variants.id;
              }
              if(variantId){
                track['variantId'] = variantId;
              }
              trackData.push(track)
          })
          try {
              if (window.clevertap) {
                  window.clevertap.setMultiValuesForKey("cart_items", trackData);
              }
          } catch (error) {
              console.log(error, "not work for older user")
          }
      }
  }, [cartData,(typeof window !== "undefined") && window.clevertap]);


    const getData = async() => {
        const getCartItem = await getCartItemDetails(data['products'],data.currency);
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
        cartItemCount: cartData && cartData.quantity,
        subTotal: subtotal,
        totalAmount: finalAmount,
        savedAmount: total - subtotal,
        discountAmount:total - subtotal,
        currency:currency,
        deliveryFees: (total < minThreshold) ? deliveryFeesConfig.deliveryFee : 0
      }
      setPriceDetails(priceDetailsData)
    }
    
      

    const onUpdateItem = async(data) => {
      setIsLoading(true)
      const cartItem = await updateCartItem(data);
      refreshData()
    }


    const getAddress = async() => {
      const getAddressResp  =  await fetch('/api/get-address', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const addressData = await getAddressResp.json();
      console.log("Address+++",addressData)
      const haveAddress = addressData && addressData['shippingAddress'] && addressData['shippingAddress'] .length > 0;
      if(haveAddress){
        setHaveAddress(haveAddress);
      }
    }
      
  let trackData = []
  function trcakcData() {
    if (cartData && cartData.products && cartData.products.length > 0) {
      cartData.products.map((item) => {
        const productId = item && item.id || "";
        const productName = item && item.description && item.description.name || "";
        const qty = item && item.quantity || 1;
        let variantId = null;
        let track = {
          productId: productId,
          productName: productName,
          quantity: qty,
        }
        if (item && item.variants && item.variants.variants) {
          variantId = item.variants.variants.id;
        }
        if (variantId) {
          track['variantId'] = variantId;
        }
        trackData.push(track)
      })
        clevertapEvent.onCleverTapEvent("kuwa_add_to_cart_checkout",trackData);  
    }
  }

    const onProceed = () => {
      if(haveAddress){
        router.push('/payment');
      }else{
        router.push('/address/add-address');
      }
      trcakcData();
    }

      
     const onDeleteItem = async (data) => {
      setIsLoading(true)
         const deleteData = {
          cartItemId: data.cartItemId
         }
      const cartItem = await deleteCartItem(deleteData);
      if(cartItem && cartItem.status == 200) {
        refreshData()
      }
     }
     const refreshData = () => {
      router.refresh()
      setTimeout(()=>{
        setIsLoading(false);
      },500)
    }
     
    const priceDetailsContainer = useRef();
    const showViewDetails = ()=>{
      priceDetailsContainer.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  
    const onHandleApplePay = () => {
      // console.log("userDatauserData",userData)
      // const deliveryFeesConfig = countryList.find((data) => data.code == selectedCountry.code) || {}
      let totalAmount = priceDetails['totalAmount'];
      let devliveryFees = priceDetails['deliveryFees'];
      const cartItemCount = cartItems && cartItems.length;
      console.log("cartItemscartItems",cartItems)
      let labelData = [];

      cartItems.map((data,index)=>{
        labelData.push({"label":data.productName,"amount":data.finalPrice})
      })
    
      const applePaySupportednetworks = "visa, mastercard, amex";
      let request = {
        merchantCapabilities: ['supports3DS'],
        supportedNetworks: applePaySupportednetworks.split(", "),
        countryCode: selectedCountry.code || "",
        currencyCode:  selectedCountry.currency || "",
        total: { label: "For " + (cartItemCount==1)?`${cartItemCount} item`:`${cartItemCount} items`, amount: totalAmount },
        "shippingType": "shipping",
        "requiredBillingContactFields": [
            "postalAddress",
            "name",
        ],
        "requiredShippingContactFields": [
            "postalAddress",
            "name",
        ],
        "lineItems": [
         ...labelData,
          {
            "label": "Shipping",
            "amount": devliveryFees
          }
        ],
      };

    console.log("request+++",request)
    
      if(!isLogin){
          request["requiredBillingContactFields"].push('phone')
          request["requiredBillingContactFields"].push('email')
          request["requiredShippingContactFields"].push('phone')
          request["requiredShippingContactFields"].push('email')
      }
      console.log("requestrequest",request)
      appleSession = new ApplePaySession(3, request);
      appleSession.begin();
      appleSession.onshippingmethodselected = function (event) {
          console.log("eventevent",event)
          var newTotal = {
              type: 'final',
              label: "config.shop.shop_name",
              amount: 500
          }
          var newLineItems = [
              {
              type: 'final',
              label: 'Subtotal',
              amount: 500
              },
              {
              type: 'final',
              label: "event.shippingMethod.label,",
              amount: 500
              }
          ]
          appleSession.completeShippingMethodSelection(
              ApplePaySession.STATUS_SUCCESS,
              newTotal,
              newLineItems
          )
      }
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
            console.log("payment TOkenn",event)
            const appleToken = event.payment.token;
            const applePayData = event;
            const decryptAppleTokenResp  =  await fetch('/api/decrypt-apple-token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(appleToken)
            })
            const decryptAppleToken = await decryptAppleTokenResp.json();
            const getCheckoutToken = decryptAppleToken.token_response;
            console.log("getCheckoutToken",getCheckoutToken)
            if (getCheckoutToken) {
              let data = {
                token: getCheckoutToken.token
              } 
              placeApplePayOrderFlow({applePayData:applePayData,token:getCheckoutToken.token})
            }
        }
      }
  }

    const placeApplePayOrderFlow = async({applePayData={},token=""}) =>{
      console.log("applePayData",applePayData)
      // const isLogin = false;
      const dialCodeForSelectedCountry = getDialCode(selectedCountry.code)
      const { givenName="", familyName = "" , phoneNumber="",emailAddress="" } =  applePayData && applePayData.payment && applePayData.payment.shippingContact || {}
      if(isLogin){
          onAddAddress({applePayData:applePayData,token:token})
      }else{
          const nonSignupUserPayload = {"email":emailAddress,"firstName":givenName,"lastName":familyName,"mobileNumber":dialCodeForSelectedCountry+phoneNumber};
          const signUpResp = await fetch('/api/signup', {
              method: 'POST',
              body:JSON.stringify(nonSignupUserPayload)
            })
            const signupRespData = await signUpResp.json();
            console.log("signupRespData",signupRespData)
            if(signupRespData &&   signupRespData.status_code &&   signupRespData.status_code == 200 && signupRespData.data){
              const name = signupRespData.data.firstName+ ' ' +signupRespData.data.lastName;
              const userId = signupRespData && signupRespData.data&& signupRespData.data.id || null
              const phone = signupRespData.data.mobileNumber ;
              const email = signupRespData.data.email;
              const countryName = selectedCountry && selectedCountry.name ||  ""
              if(userId){
                window.clevertap.onUserLogin.push({
                  "Site": {
                    "Name": name,            // String
                    "Identity": userId,              // String or number
                    "Email": email,         // Email address of the user
                    "Phone": phone, 
                    "Country":countryName,
                    "MSG-email": true,                // Disable email notifications
                    "MSG-push": true,                  // Enable push notifications
                    "MSG-sms": true,                   // Enable sms notifications
                    "MSG-whatsapp": true,              // Enable WhatsApp notifications
                  },
                  "cart_items": []
                 })
                 
                 window.clevertap.event.push("kuwa_user_add_address_signup_success", {
                  "Country":countryName,
                  "Email":email,
                  "Name": name,
                  "Phone": phone
                });
              }
            }
            if((signupRespData && signupRespData.status_code == 200) || (signupRespData && signupRespData.status_code == 400)){
              onAddAddress({applePayData:applePayData,token:token})
            }
      }
  }

  const onAddAddress = async({applePayData={},token=""}) =>{
      const countryName = selectedCountry && selectedCountry.name ||  ""
      const dialCodeForSelectedCountry = getDialCode(selectedCountry.code)
      const { givenName="", familyName = "" , phoneNumber="",emailAddress="" ,addressLines=[],subLocality="",locality="",postalCode="",country=""} =  applePayData && applePayData.payment && applePayData.payment.shippingContact || {}
      clevertapEvent.onCleverTapEvent("kuwa_add_address_save_and_proceed",{});
      const address = addressLines.toLocaleString()+" "+subLocality + " " +locality+ " " + postalCode;
      const apartment = locality;
      const billingAddressPayload =  {"country":countryName,"address":address,"apartment":apartment,"stateProvince":"","firstName":givenName,"lastName":familyName,"mobNumber":dialCodeForSelectedCountry+phoneNumber,"email":emailAddress,"sameAddressForBilling":true,"billingAddress":true,"isActive":true,"isDefaultAddress":true}
      const shippingAddressPayload ={"country":countryName,"address":address,"apartment":apartment,"stateProvince":"","firstName":givenName,"lastName":familyName,"mobNumber":dialCodeForSelectedCountry+phoneNumber,"email":emailAddress,"shippingAddress":true,"isActive":true,"isDefaultAddress":true}
      const addressPayload = {
          shippingAddress:billingAddressPayload,
          billingAddress: shippingAddressPayload
      }
      try {
        const res = await fetch('/api/save-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(addressPayload)
        })
        if (res.status === 200) {
          const saveAddressResp = await res.json()
          console.log("SAVEEE",saveAddressResp)
          onPayment({saveAddressResp:saveAddressResp,name:givenName+" "+familyName,token:token})
        } else {
          console.log("ERROR")
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
      }
    }
    const calculateVatPercentage = async (subTotal) => {
      if (selectedCountry && selectedCountry) {
        const vatPercentage = selectedCountry.vat;
        const vatAmount = subTotal-(((subTotal)* (100)) / (100 + (vatPercentage)))
        return parseFloat(vatAmount.toFixed(2));
      }
    }
  const onPayment = async({saveAddressResp={},name="",token=""})=>{
      const getCartItems = await getCartItem();
      const {billingAddress={} , shippingAddress={} } = saveAddressResp || {}
      const deliveryFeesConfig = countryList.find((data) => data.code == selectedCountry.code) || {}
      const userName = userData && userData['firstName'] || "";
      const cartItemsData = getCartItems && getCartItems['products'];
      const cartItemPayload = await createPayloadForCartItems(cartItemsData);
      const description = `${userName + ",MULTIPLE_ITEM," + ""}`;
      const userId = getCartItems['customer'] || userData['id'] || null;
      const taxAmount = await calculateVatPercentage(priceDetails['subTotal'])
      let payload = {
          "cartId":getCartItems['id'] || "",
          "orderType": "one-time",
          "userId": userId || "",
          "billingAddressId":billingAddress && billingAddress.id || "",
          "shippingAddressId":shippingAddress && shippingAddress.id || "",
          "addressId": shippingAddress && shippingAddress.id || "",
          "countryCode": selectedCountry.code || "",
          "countryId": selectedCountry.id || "",
          "description": description,
          "finalAmount": priceDetails['totalAmount'],
          "totalAmount": priceDetails['totalAmount'],
          "currency": selectedCountry.currency || "",
          "orderSource": "WEBSITE",
          "orderCategory": "CART",
          "couponApplied":  false,
          "couponCode":  "",
          "discount": 0,
          "paymentType": "Regular",
          "taxAmount": taxAmount,
          "shippingAmount": 0,
          "deliveryCharges":priceDetails['deliveryFees'],
          "cartItems": cartItemPayload
        }
        payload['token'] = token;
        payload['paymentMode'] = "APPLE_PAY";
        
      //   trackData['Payment Type'] = 'Apple pay' || ''
      //   clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData);
      console.log("payloadpayload",payload) 
          const placeOrderResp  =  await fetch('/api/apple-pay-place-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body:JSON.stringify(payload)
          })
    
          const placeOrder = await placeOrderResp.json();
          console.log("placeOrderResp",placeOrder)
          // setIsLoader(false);
          if(placeOrder && placeOrder.status_code == 200){
          const countryName = selectedCountry && selectedCountry.name ||  ""
          window.clevertap.event.push("kuwa_applepay", {
                  "Country":countryName,
                  "productName":name
              });
            appleSession.completePayment(ApplePaySession.STATUS_SUCCESS);
            // router.push(`/payment/success?orderId=${placeOrder.order_id}`)
            window.location.href = `/payment/success?orderId=${placeOrder.order_id}`
          }

      //   console.log("payloadpayload",payload)
  }
 
    const totalPrice =(priceDetails && priceDetails.totalAmount)? priceDetails.currency +" "+priceDetails.totalAmount :""
    const subTotal = priceDetails.subTotal
    const minThreshold = deliveryFeesConfig?.minThreshold;
    const deliveryFee = deliveryFeesConfig?.deliveryFee
    const totalAmount = priceDetails.totalAmount
    const currency = selectedCountry?.currency;
    const deliveryFeeMinPrice = minThreshold - subTotal;
    console.log("minThreshold",minThreshold)
    console.log("deliveryFeeMinPrice",deliveryFeeMinPrice)
    const progressBarColor = deliveryFeeMinPrice >= 0 ? Math.min((subTotal / minThreshold) * 100, 100) : 100;
    const colorPerc = `${(207 * progressBarColor)/100}px`
    console.log("first",colorPerc)
    const activeProgressBar={
      width:colorPerc,
      height:"4px",
      backgroundColor:"#247A81",
      position:"relative",
      bottom:"17px"
    }
    

    const redirectAllProduct = ()=>{
      window.location.href = '/collections?category='
    }
    console.log("progressBar",progressBarColor)
      return (
        <>
          {/* <script type="text/javascript" src="/fresh-chat.js" async></script> */}
          <div className={styles.cartPage}>
            <div className={styles.leftSection}>
            <div className={styles.cartItemsContainer}>
              <div className={[styles.headerTxt,styles.cartHeaderTxt].join(" ")}> Cart Items </div>
              {
                cartItems.map((data, index)=>{
                  return(
                    <CartItemCard data={data} key={index} onUpdateItem={onUpdateItem} onDeleteItem={()=>onDeleteItem(data)} />
                  )
                })
              }
            </div>
            <div className={ styles.freeShippingSection}>
              <div className={styles.content}>
                 {deliveryFeeMinPrice > 0 ? <div className={styles.text}>You're only <span className={styles.feeText}>{deliveryFeeMinPrice+ " " + currency}</span> away from <span className={styles.shipTxt}>Free Shipping</span></div> 
                 : <div className={styles.text}> Your cart is eligible for <span className={styles.shipTxt}>free delivery</span></div>}
                  <div className={styles.progressBar}></div>
                   <div style={activeProgressBar}>
                   <div className={styles.roundDiv}></div>
                   <div className={styles.image}><img src="https://d25uasl7utydze.cloudfront.net/assets/truck%20(1).svg"></img></div>
                   </div>
                  {deliveryFeeMinPrice > 0 ? "" : <div className={styles.saveTxt}>You saved {deliveryFee + " " + currency} on delivery fee</div>} 
               
              </div>
              <div className={styles.btn} onClick={redirectAllProduct}>Add</div>
            </div>
            </div>
            <div className={styles.priceDetailsContainer}>
              {/* <div className={styles.headerTxt}>Price Details</div> */}
              <div className={styles.priceInfo} ref={priceDetailsContainer}>
                <PriceDetailsInfo data={priceDetails} />
              </div>
              <CompanyInfo />
            </div>
          </div>
          <PaymentFooterBtn showViewDetails={showViewDetails} isApplePaySession={isApplePaySession} btnName="Proceed To Checkout" totalPrice={totalPrice} onHandleApplePay={()=>onHandleApplePay()} onProceed={onProceed} />
          <Loader isShow={isLoading}/>
        </>
      )
    }
    