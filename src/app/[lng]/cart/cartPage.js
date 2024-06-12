
'use client';
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { useCountryList } from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import { useCartItems } from '@/context/cartItems';
// import CartItemCard from "@/app/[lng]/components/CartItemCard/CartItemCard"
import CartItemCard from "../components/CartItemCard/CartItemCard";
// import PriceDetailsInfo from "@/app/[lng]/components/PriceDetails/PriceDetails";
import PriceDetailsInfo from "../components/PriceDetails/PriceDetails";

import CompanyInfo from "../components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "../components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails } from "@/utils";
import Loader from "../components/Loader/Loader";
import { deleteCartItem , updateCartItem } from '@/services';
import styles from './cart-page.module.scss';
import useCleverTapEvents from "@/hooks/useCleverTapEvents";
import { useAuth } from '@/context/userDetail';
import { createPayloadForCartItems,getDialCode } from "@/utils";
import {getCartItem} from '@/services';
import { useRef } from 'react';
import { getOutOfStockProduct } from "@/utils";
import OutOfStockProductsPopUp from "../components/OutOfStockProductsPopUp/OutOfStockProductsPopUp";
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';
import { mixPanelTrackEvent } from "../../[lng]/page.js";
import { useLanguage } from "@/context/languageDetails";
import CartPageProductCard from "../components/CartPageProductCard/CartPageProductCard";
import { addToCart } from "@/services";
import NotifyEmailPopup from "../components/NotifyEmailPopup/NotifyEmailPopup";
import NotifySuccessPopup from "../components/NotifySuccessPopup/NotifySuccessPopup";

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
    const [isAllOutOfStockProducts,setIsAllOutOfStockProducts] = useState(false);
    const [isNoOutOfStockProducts,setIsNoOutOfStockProducts] = useState(false)
    const [outOfStockProducts,setOutOfStockProducts] = useState([]);
    const [IsShowOutOfStockProductsPopUp,setIsShowOutOfStockProductsPopUp] = useState(false);
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    const [isShowNotifySuccessPopup, setIsShowNotifySuccessPopup] = useState(false);
    const [isShowNotifyEmailPopup, setIsShowNotifyEmailPopup] = useState(false);
    const [emailId,setEmailId] = useState("")
    const [nonloginProductId,setNonLoginProductId] = useState("");
    const [nonLoginVariantId,setNonLoginVariantId] = useState("");
    const emailAddress = userData && userData.emailAddress;
    const [leftArrow, setLeftArrow] = useState(isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/inactive_right_arrow.svg" : "https://d25uasl7utydze.cloudfront.net/assets/inactive_left_arrow.svg");
    const [rightArrow, setRightArrow] = useState(isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/active_left_arrow.svg" : "https://d25uasl7utydze.cloudfront.net/assets/active_right_arrow.svg");

    const [cartProducts,setCartProducts] = useState([])

    let appleSession;

  console.log("cartItemsCard",cartItems)

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
              getOutOfStockProducts()
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
              if(isLogin){
                mixPanelTrackEvent("cart_items", trackData,userData.id)
              }
              else{
                mixPanelTrackEvent("cart_items", trackData)
              }
           
          } catch (error) {
              console.log(error, "not work for older user")
          }
      }
  }, [cartData,(typeof window !== "undefined") && window.clevertap]);


    useEffect(()=>{
  if(outOfStockProducts.length === cartItems.length){
    setIsAllOutOfStockProducts(true)
    setIsNoOutOfStockProducts(false)
  }
   if(outOfStockProducts.length <  cartItems.length){
    setIsAllOutOfStockProducts(false)
    setIsNoOutOfStockProducts(false)
  }
   if(outOfStockProducts.length == 0){
    setIsNoOutOfStockProducts(true)
    setIsAllOutOfStockProducts(false)
  }
  },[cartItems,outOfStockProducts])

    const getData = async() => {
        const getCartItem = await getCartItemDetails(data['products'],data.currency);
        setCartItems(getCartItem)
    }
    
    const getOutOfStockProducts = async()=>{
      const getOutOfStockProductsData= await getOutOfStockProduct(data[`products`],data.currency);
      setOutOfStockProducts(getOutOfStockProductsData)
    }

   console.log("outOfStockProducts++++",outOfStockProducts)
   console.log("isAllOutOfStockProducts",isAllOutOfStockProducts)

    useEffect(()=>{
      if(cartItems && cartItems.length > 0){
        calculatePriceDetails()

      }

    },[cartItems]);

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
    
   useEffect(()=>{
    const deviceType = getDeviceType();
    const trackData = {
        userId:userData?.id,
        device: deviceType
    }
    setTimeout(()=>{
      clevertapEvent.onCleverTapEvent("kuwa_cart_landing",trackData)
      if(isLogin){
        mixPanelTrackEvent("kuwa_cart_landing",trackData, userData.id)
      }
      else{
        mixPanelTrackEvent("kuwa_cart_landing",trackData,)
      }
     
    },2000)
   
   },[])
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
        if(isLogin){
          mixPanelTrackEvent("kuwa_add_to_cart_checkout",trackData, userData.id) 
        } 
        else{
          mixPanelTrackEvent("kuwa_add_to_cart_checkout",trackData,) 
        }
       
    }
  }

    const onProceed = async() => {

      if(isNoOutOfStockProducts){
        if(haveAddress){
          router.push('./payment')
        }
        else{
          router.push('/address/add-address')
        }
      }
      else{
        setIsShowOutOfStockProductsPopUp(true)
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
    const productScroll = useRef();
    const showViewDetails = ()=>{
      priceDetailsContainer.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }

    const getCartPageProducts = async() => {
      try{
        setIsLoading(true)
        const getCartPageProducts  =  await fetch('/api/get-cart-page-products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if(getCartPageProducts.status == 200){
          setIsLoading(false)
          const cartPageProducts = await getCartPageProducts.json();
          setCartProducts(cartPageProducts)
          console.log("cartPageProducts",cartPageProducts)
        }
        else{
          setIsLoading(false)
          console.log("error to fetch the data")
        }
       
      }
      catch(error){
        setIsLoading(false)
        console.log("error",error)
      }
     
    }
    useEffect(()=>{
      getCartPageProducts()
    },[])

    const handleNonLogin = (id,variantId)=>{
      console.log("id, variantId", id, variantId);
       setIsShowNotifyEmailPopup(true);
       setNonLoginProductId(id);
       setNonLoginVariantId(variantId);
    }
    
    const handleNotify = async() =>{
      const payload={
           productId:nonloginProductId|| null,
           variantId:nonLoginVariantId || null,
           email: emailId 
         }
         try {
          setIsLoading(true)
           const res = await fetch(`/api/out-of-stock`, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(payload),
           });
           if(res.status == 200){
            setIsLoading(false)
             setIsShowNotifySuccessPopup(true);
           }
           else{
            setIsLoading(false)
            console.log(error)
           }
           
           
         } catch (error) {
          setIsLoading(false)
           console.error('Error:', error);
         }
       }
    
       const handleNotifyMe = async(productId, variantId)=>{
        console.log("variantId",variantId)
        const payload={
          productId:productId || null,
          variantId:variantId || null,
          email: emailAddress 
        }
        try {
          setIsLoading(true)
          const res = await fetch(`/api/out-of-stock`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          if(res.status == 200){
            setIsLoading(false)
            setIsShowNotifySuccessPopup(true);
          }
          else{
            setIsLoading(true)
            console.log(error)
          }
         
          
        } catch (error) {
          setIsLoading(false)
          console.error('Error:', error);
        }
      }

    const handleAddtoProduct = async(data)=>{
      try{
        setIsLoading(false)
        const cardData =await addToCart(data)
        window.location.reload();
      }
      catch{

      }
     

    }
    const checkArrows = () => {
      if (isArabic ? productScroll.current.scrollLeft >= 0 : productScroll.current.scrollLeft <= 0) {
        console.log("leftInactive")
        setLeftArrow(isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/inactive_right_arrow.svg" : "https://d25uasl7utydze.cloudfront.net/assets/inactive_left_arrow.svg");
      } else {
        console.log("rightInactive")
       setLeftArrow(isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/active_right_arrow.svg" : "https://d25uasl7utydze.cloudfront.net/assets/active_right%20arrow-1.svg");
      }
      console.log("width",productScroll.current.scrollLeft,productScroll.current.clientWidth,productScroll.current.scrollWidth)
      if (isArabic ? productScroll.current.scrollLeft + productScroll.current.scrollWidth > productScroll.current.clientWidth : productScroll.current.scrollLeft + productScroll.current.clientWidth >= productScroll.current.scrollWidth) {
        setRightArrow(isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/active_left_arrow.svg" : "https://d25uasl7utydze.cloudfront.net/assets/inactive_right_arrow.svg");
      } else {
        setRightArrow(isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/inactive_left_arrow.svg" : "https://d25uasl7utydze.cloudfront.net/assets/active_right_arrow.svg");
      }
    };
  
    useEffect(() => {
      checkArrows();
    }, [cartProducts]);
    const handleLeft = () =>{
      productScroll.current.scrollLeft+=-154;
      checkArrows();
    }
    const handleRight = () =>{
      productScroll.current.scrollLeft+=154;
      checkArrows();
    }

  
    const onHandleApplePay = () => {
      // console.log("userDatauserData",userData)
      // const deliveryFeesConfig = countryList.find((data) => data.code == selectedCountry.code) || {}
      let totalAmount = priceDetails['totalAmount'];
      let devliveryFees = priceDetails['deliveryFees'];
      const cartItemCount = cartItems && cartItems.length;
      const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";
      console.log("prePaidDiscountbb",prePaidDiscount);
      let extraDiscount = prePaidDiscount > 0 ? parseFloat(((totalAmount * prePaidDiscount)/100).toFixed(2)) : 0;
      totalAmount = totalAmount - extraDiscount
      const customFee = selectedCountry?.customFee || 0 ;
      console.log("finalAmount",extraDiscount)
      console.log("cartItemscartItems",cartItems)
      let labelData = [];

      cartItems.map((data,index)=>{
        labelData.push({"label": isArabic ? data.productNameArabic : data.productName,"amount":(data.finalPrice)*(data.qty)})
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
          },
          {
            "label": "Additional Discount",
            "amount": - extraDiscount
          }
        ],
      };

      if (customFee > 0) {
        lineItems.push({
            "label": "Custom Duty",
            "amount": customFee
        });
    }

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
                window.clevertap?.onUserLogin?.push({
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
                 
                 window.clevertap?.event?.push("kuwa_user_add_address_signup_success", {
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
      const taxAmount = await calculateVatPercentage(priceDetails['subTotal']);
      const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";
      let extraDiscount = prePaidDiscount > 0 ? parseFloat(((totalAmount * prePaidDiscount)/100).toFixed(2)) : 0;
      const customFee = selectedCountry?.customFee || 0;
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
          "finalAmount": priceDetails['totalAmount'] + customFee,
          "totalAmount": priceDetails['totalAmount'] + customFee,
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
          "cartItems": cartItemPayload,
          "prepaidDiscountAmount":extraDiscount,
          "customFee":customFee,
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
  const customFee = selectedCountry?.customFee || 0;
    const totalPrice =((priceDetails && priceDetails.totalAmount)? priceDetails.currency +" "+(priceDetails.totalAmount + customFee) :"") 
    const subTotal = priceDetails.subTotal
    const minThreshold = deliveryFeesConfig?.minThreshold;
    const deliveryFee = deliveryFeesConfig?.deliveryFee
    const totalAmount = priceDetails.totalAmount
    const currency = selectedCountry?.currency;
    const deliveryFeeMinPrice = minThreshold - subTotal;
    const progressBarColor = deliveryFeeMinPrice >= 0 ? Math.min((subTotal / minThreshold) * 100, 100) : 100;
    const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";
    const colorPerc = `${(207 * progressBarColor)/100}px`

    const cartPageProductSHeading = isArabic ? cartProducts[0]?.cartPageHeadingArabic : cartProducts[0]?.cartPageHeading

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
      return (
        <>
          {/* <script type="text/javascript" src="/fresh-chat.js" async></script> */}
          <div className={styles.cartPage}>
            <div className={styles.leftSection}>
            <div className={styles.cartItemsContainer}>
              <div className={[styles.headerTxt,styles.cartHeaderTxt].join(" ")}>{isArabic ? "محتويات السلة" : "Cart Items"} </div>
              <div className={styles.cartDataInfo}>
              {
                cartItems.map((data, index)=>{
                  return(
                    <CartItemCard data={data} key={index} onUpdateItem={onUpdateItem} onDeleteItem={()=>onDeleteItem(data)} />
                  )
                })
              }
              </div>
            </div>
            <div className={ styles.freeShippingSection}>
              <div className={styles.content}>
                 {deliveryFeeMinPrice > 0 ? <div className={styles.text}>{isArabic ? "أنت فقط": "You're only"} <span className={styles.feeText}>{deliveryFeeMinPrice+ " " + currency}</span> {isArabic ? "بعيد عن" : "away from "}<span className={styles.shipTxt}>{isArabic ? "الشحن المجاني" : "Free Shipping"}</span></div> 
                 : <div className={styles.text}> {isArabic ? "سلة التسوق مؤهلة لـ"  :"Your cart is eligible for"} <span className={styles.shipTxt}>{isArabic ? "توصيل مجاني" : "free delivery"}</span></div>}
                  <div className={styles.progressBar}></div>
                   <div style={activeProgressBar}>
                   <div className={styles.roundDiv}></div>
                   <div className={styles.image}><img src={isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/truck_white.svg" : "https://d25uasl7utydze.cloudfront.net/assets/truck%20(1).svg"}></img></div>
                   </div>
                  {deliveryFeeMinPrice > 0 ? "" : <div className={styles.saveTxt}>{isArabic ? "لقد وفرت" :"You saved"} {deliveryFee + " " + currency} {isArabic ? "على رسوم التوصيل" : "on delivery fee"}</div>} 
               
              </div>
              <div className={styles.btn} onClick={redirectAllProduct}>{isArabic ? "إضافة" : "Add"}</div>
            </div>
            <div className={styles.CartPageProductCardContainer}>
            <div className={styles.headerPart}>
            <div className={styles.heading}>{cartPageProductSHeading}</div>
            <div className={styles.arrowPart}>
              <div className={`${styles.leftArrow} ${isArabic ? styles['leftArrow-ar'] : styles['leftArrow-en']}`} onClick={isArabic ? handleRight : handleLeft  }><img src={leftArrow}/></div><br/>
              <div className={`${styles.rightArrow} ${isArabic ? styles['rightArrow-ar'] : styles['rightArrow-en']}`} onClick={isArabic ? handleLeft : handleRight}><img src={rightArrow}/></div>
            </div>
          </div>
         <div className={styles.cartPageProductList} ref={productScroll}>
        { cartProducts &&  cartProducts?.map((data,index)=>{ 

const {
  cartPageId = "",
  currency = "",
  rank = 0,
  productId = "",
  productName = "",
  productNameArabic = "",
  productAvailableQuantity = 0,
  productListPrice = 0.0,
  productFinalPrice = 0.0,
  productDiscount = 0.0,
  productImage="",
  variantId = "",
  variantName = "",
  variantImage = "",
  variantListPrice = 0.0,
  variantFinalPrice = 0.0,
  variantDiscount = 0.0,
  dealId = "",
  dealTag = "",
  dealTagArabic = "",
  dealHeading = "",
  dealHeadingArabic = "",
  isDealActive = false,
  isTimerActive = false,
  dealIconUrl = "",
  countDownStartsAt = "",
  countDownEndsAt = "",
  currentTimerValue = "",
  currentTimerStatus = "",
  currentDateTime = "",
  dealInventory = 0,
  dealListPrice = 0.0,
  dealFinalPrice = 0.0,
  dealDiscountPrice = 0.0
} = data 

let cardData = {};
if(variantId){
  if(dealId && isDealActive && isTimerActive && currentTimerStatus == "in-between" ){
    cardData={
      "productId":productId,
      "productName":productName,
      "productNameArabic":productNameArabic,
      "productAvailableQuantity":productAvailableQuantity,
      "productListPrice":dealListPrice,
      "productFinalPrice":dealFinalPrice,
      "productDiscount":dealDiscountPrice,
      "variantId":variantId,
      "dealId":dealId,
      "dealTag":dealTag,
      "dealTagArabic":dealTagArabic,
      "dealIconUrl":dealIconUrl,
      "dealInventory":dealInventory,
      "currency":currency,
      "productImage":variantImage
      }
  }
  else{
    cardData={
    "productId":productId,
    "productName":productName,
    "productNameArabic":productNameArabic,
    "productAvailableQuantity":productAvailableQuantity,
    "productListPrice":variantListPrice,
    "productFinalPrice":variantFinalPrice,
    "productDiscount":variantDiscount,
    "variantId":variantId,
    "currency":currency,
    "productImage":variantImage

    }
  }
}
else{
  if(dealId && isDealActive && isTimerActive && currentTimerStatus == "in-between" ){
    cardData={
      "productId":productId,
      "productName":productName,
      "productNameArabic":productNameArabic,
      "productAvailableQuantity":productAvailableQuantity,
      "productListPrice":dealListPrice,
      "productFinalPrice":dealFinalPrice,
      "productDiscount":dealDiscountPrice,
      "variantId":variantId,
      "dealId":dealId,
      "dealTag":dealTag,
      "dealTagArabic":dealTagArabic,
      "dealIconUrl":dealIconUrl,
      "dealInventory":dealInventory,
      "currency":currency,
      "productImage":productImage

      }
  }
  else{
    cardData={
      "productId":productId,
      "productName":productName,
      "productNameArabic":productNameArabic,
      "productAvailableQuantity":productAvailableQuantity,
      "productListPrice":productListPrice,
      "productFinalPrice":productFinalPrice,
      "productDiscount":productDiscount,
      "currency":currency,
      "productImage":productImage

      }
  }
}

let cardPayloadData = {}
if(variantId){
if(dealId && isDealActive && isTimerActive && currentTimerStatus == "in-between" ){
  cardPayloadData={
    product:productId,
    quantity:1,
    dealId,
    variantId,
    isVariant:true
  }
}
else{
  cardPayloadData={
    product:productId,
    quantity:1,
    dealId,
    isVariant:true
  }
}
}
else{
  if(dealId && isDealActive && isTimerActive && currentTimerStatus == "in-between" ){
    cardPayloadData={
      product:productId,
      quantity:1,
      dealId,
      isVariant:false,
      variantId:null
    }
  }
  else{
    cardPayloadData={
      product:productId,
      quantity:1,
      isVariant:false,
      variantId:null
    }
  }
}

 
       
         
          return( 
            <CartPageProductCard key={index} cardData = {cardData} handleAddtoProduct={()=>handleAddtoProduct(cardPayloadData)} handleNotifyMe={()=>handleNotifyMe(productId)} handleNonLogin={()=>handleNonLogin(productId)} />
          )})
        
           
          } 
          </div>
        
        
             
            </div>
            </div>
            <div className={styles.priceDetailsContainer}>
              {/* <div className={styles.headerTxt}>Price Details</div> */}
              <div className={styles.priceInfo} ref={priceDetailsContainer}>
                <PriceDetailsInfo data={priceDetails} customFee={customFee} />
              </div>
              <CompanyInfo />
            </div>
          </div>
        {isAllOutOfStockProducts ? <PaymentFooterBtn isAllOutOfStockProducts={isAllOutOfStockProducts}  btnName={isArabic ? "استمر في التسوق" : "Continue shopping"} onProceed={()=>window.location.href="./"} /> :  <PaymentFooterBtn showViewDetails={showViewDetails} isApplePaySession={isApplePaySession} btnName={isArabic ? "المتابعة إلى الدفع" : "Proceed To Checkout"} totalPrice={totalPrice} onHandleApplePay={()=>onHandleApplePay()} onProceed={onProceed} prePaidDiscount={prePaidDiscount} />}
         {IsShowOutOfStockProductsPopUp &&  <OutOfStockProductsPopUp outOfStockProducts={outOfStockProducts} setIsShowOutOfStockProductsPopUp={setIsShowOutOfStockProductsPopUp} haveAddress={haveAddress}/>}
         <div className={styles.NotifySuccessPopup}>{isShowNotifySuccessPopup && <NotifySuccessPopup setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}/>}</div>
         <div>{isShowNotifyEmailPopup && <NotifyEmailPopup setIsShowNotifyEmailPopup={setIsShowNotifyEmailPopup} setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}  emailId={emailId} setEmailId={setEmailId} handleNotify={handleNotify}/>}</div>
          <Loader isShow={isLoading}/>
        </>
      )
    }
    
