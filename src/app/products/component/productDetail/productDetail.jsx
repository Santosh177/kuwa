"use client"

import React, { useEffect, useState } from "react";
import ProductImageSection from "./subComponents/productImageSection";
import ProductPricingSection from "./subComponents/productPricingSection";
import { useRouter } from 'next/navigation';
import {getCartItem} from '@/services';
import style from "./ProductDetail.module.scss"
import FrequntlyBoughtTogether from "./subComponents/frequntlyBoughtTogether";
import Loader from '@/components/Loader/Loader';
import { useCartItems } from '@/context/cartItems';
import useCleverTapEvents from "@/hooks/useCleverTapEvents";
import { useCountryList } from '@/context/countryList';
import { useAuth } from '@/context/userDetail';
import { useCountry } from '@/context/contryDetails';
import { createPayloadForCartItems,getDialCode } from "@/utils";
const ProductDeatil = ({ productData = {} }) => {
    let appleSession;
    const { benefits = "", frequentlyBoughtTogether = "", currency = "", description = "", id = "", images = [], ingredients = "", name = "", numberOfProductReview = "", price = null, quantity = 0, title = "", variants = [],mininmumDeliveryThreshold } = productData || {};
   const {dealId="",dealListPrice="",dealDiscountPrice="",dealFinalPrice="",dealInventory="",isDealActive="",isTimerActive=false,dealTag="",dealIconUrl="",countDownStartsAt="",countDownEndsAt="",currentTimerValue="",currentTimerStatus=""} = productData || {}
        // console.log("dealListPrice",dealListPrice)
        console.log("productdetails",productData)
   const [noOfProduct, setNoOfProduct] = useState(1);
    const countryList = useCountryList();
    const { selectedCountry={} } = useCountry();
  
    const {isLogin=false, userData={}} = useAuth();
    const { setCartItemData={},setCartItemCount={} } = useCartItems();
    const [selectedVarients, setselectedVarients] = useState("");
    const [selctedVrientsData, setSelectedVrientsData] = useState({});
    const [retailPrice, setRetailPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [allImages, setAllImages] = useState([]);
    const [haveAdress, setHaveAddress] = useState(false);
    const [ isAddedToCart , setIsAddedToCart ] = useState(false);
    const [ isLoading , setIsLoading] = useState(false)
    const [variantdealId, setVariantDealId] = useState();
   const[isVariantDealActive,setIsVariantDealActive] = useState();
   const[isVariantTimeActive,setIsVariantTimeActive] = useState();
   const[isVariantCurrenTimeStatus,setIsVariantCurrenTimeStatus] = useState();
   const[selectedVariantTag,setSelectedVariantTag] = useState();
   const[seleVariantIcon,setSeleVariantIcon] = useState();
   const [selectedVariantQuantity,setSelectedVariantQuantity] = useState(null);
    const router = useRouter()
    const clevertapEvent = useCleverTapEvents();

    let normalInventory = quantity
    useEffect(()=>{

        if(variants && variants.length > 0){
            const variantId = variants[0] && variants[0]['variants'] && variants[0]['variants']['id'];
            console.log("variantIdvariantId",variantId)
            if(variantId){
                setselectedVarients(variantId)
            }
        }
    },[variants,dealId])

    useEffect(() => {
        setIsLoading(true)
        if(dealId
             && isDealActive && isTimerActive
              && currentTimerStatus == "in-between"
             ){
            setFinalPrice(dealFinalPrice);
            setRetailPrice(dealListPrice);
            if(dealListPrice > dealFinalPrice){
                setDiscount(dealDiscountPrice);
            }
        }
        else{
            const { productPriceAmount = 0, productPriceType = "", productPriceSpecialAmount = 0 } = price || {};
            setFinalPrice(productPriceSpecialAmount);
            setRetailPrice(productPriceAmount);
            if (productPriceAmount > productPriceSpecialAmount) {
                setDiscount(productPriceAmount - productPriceSpecialAmount);
            }
        }
       
       
        let bulkImage = [];
        images.map((data)=> bulkImage.push(data.imageUrl))
        setAllImages(bulkImage)
    }, [dealId])
    
    useEffect(() => {
        if (selectedVarients) {

            const selectedVarientsData = variants.filter((item) => item?.pricings[0]?.variantId === selectedVarients);
            const { id = '', image = '', name = '', productId = '', quantity = '' } = selectedVarientsData[0].variants || {}
            let selectedVariantdealId = selectedVarientsData[0].pricings[0].dealId
         
            let isVariantDealActive = selectedVarientsData[0].pricings[0].isDealActive 
            let isVariantTimerActive = selectedVarientsData[0].pricings[0].isTimerActive || false
            let currentVariantTimerStatus = selectedVarientsData[0].pricings[0].currentTimerStatus || ""
            let dealTag = selectedVarientsData[0].pricings[0].dealTag || ""
            let dealIconUrl = selectedVarientsData[0].pricings[0].dealIconUrl || ""
            setVariantDealId(selectedVariantdealId);
            setIsVariantCurrenTimeStatus(currentVariantTimerStatus);
            setIsVariantTimeActive(isVariantTimerActive);
            setIsVariantDealActive(isVariantDealActive);
            setSeleVariantIcon(dealIconUrl);
            setSelectedVariantTag(dealTag);
            setSelectedVariantQuantity(quantity);
            if(selectedVariantdealId && isVariantDealActive && isVariantTimerActive 
                && currentVariantTimerStatus == "in-between"
                ){
               const  { varientId = '', dealListPrice = 0, dealFinalPrice = 0, dealDiscountPrice = 0 } = selectedVarientsData[0]?.pricings[0] || {};
            setFinalPrice(dealFinalPrice);
           setRetailPrice(dealListPrice);
           setDiscount(dealDiscountPrice);
            }
            else{
                console.log("selectedVarientsData",selectedVarientsData[0].pricings[0]) 
           const  { varientId = '', retailPrice = 0, finalPrice = 0, discount = 0 } = selectedVarientsData[0]?.pricings[0] || {};
           setFinalPrice(finalPrice);
           setRetailPrice(retailPrice);
           setDiscount(discount);
            }
            setSelectedVrientsData(selectedVarientsData)
          
            // if (!allImages.includes(image)) {
                setAllImages([image]);
            // }
        }
        
        else{
            if(dealId && isDealActive && isTimerActive
                 && currentTimerStatus == "in-between" 
                  ){
                console.log("dealId",dealFinalPrice)
                setFinalPrice(dealFinalPrice);
                setRetailPrice(dealListPrice);
                if(dealListPrice > dealFinalPrice){
                    setDiscount(dealDiscountPrice);
                }
            }
            else{
                const { productPriceAmount = 0, productPriceType = "", productPriceSpecialAmount = 0 } = price || {};
            setFinalPrice(productPriceSpecialAmount);
            setRetailPrice(productPriceAmount);
            if (productPriceAmount > productPriceSpecialAmount) {
                setDiscount(productPriceAmount - productPriceSpecialAmount);
            }
            }
            
            let bulkImage = [];
            images.map((data)=> bulkImage.push(data.imageUrl))
            setAllImages(bulkImage)
        }

    }, [selectedVarients,dealId])
  
    let payload = {
        "dealId" : selectedVarients ? variantdealId : (  dealId ? dealId : null),   
        "product": id,
        "quantity": noOfProduct,
        "isVariant": selectedVarients ? true : false,
        "variantId": selectedVarients,
        
    }
   const trackData = {
        "product Name": name,
        "quantity": noOfProduct,
        "product Id": id,
        "isVariant": selectedVarients ? true : false,
        "variantId": selectedVarients,
    }
    
    const addToCart = async (payload) => {
        console.log("addToCartaddToCart",payload)
        try {
            const res = await fetch('/api/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            if (res.status === 200) {
                return res.status
            } else {
                throw new Error(await res.text())
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
            setErrorMsg(error.message)
        }
    }
    const getAddress = async () => {
        const getAddressResp = await fetch('/api/get-address', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const addressData = await getAddressResp.json();
        const haveAddress = addressData && addressData['shippingAddress'] && addressData['shippingAddress'].length > 0;
        if (haveAddress) {
            setHaveAddress(haveAddress);
        }
    }
    useEffect(() => {
        getAddress();
        getCartItems();
    }, [])

    useEffect(()=>{
        console.log("noOfProductnoOfProduct",noOfProduct)
        // setIsAddedToCart(false)
    },[noOfProduct])
    const handelAddToCart = async (data) => {
        setIsLoading(true)
        console.log("handelAddToCart")
        const isIndividualProduct = (data && data.isIndividualProduct) || false
        payload["isGetBuyNow"] = isIndividualProduct;
        const response = await addToCart(payload);
        console.log("responseresponse")
        if (response === 200) {
            // setNoOfProduct(1);
           const data = await getCartItems();
            clevertapEvent.onCleverTapEvent("kuwa_add_to_cart",trackData);
            // router.push('/cart')
            // window.location.href = "/cart"
        }
    }



// useEffect(() => {

//     new window.TabbyProductPageSnippetCCI({
//       selector: '#tabbyDetail',
//       lang:    'en', // 'ar'
//       currency: currency, // 'SAR, AED, KWD, BHD'
//       price: finalPrice,
//     });

//     }, []);

    const getCartItems = async() => {
  
        const getCartItems = await getCartItem();
        setIsLoading(false)
        const cartItemsData = getCartItems && getCartItems['products'] || [];
        setCartItemData(getCartItems)
        let cartItems = cartItemsData.find((data) => data.id == id)
        setIsLoading(false)

        console.log("cartItems",cartItems)
        if(cartItems){
            setNoOfProduct(cartItems && cartItems.quantity);
            setIsAddedToCart(cartItems)
            if(cartItems && cartItems['variants'] && cartItems['variants']['variants']){
                const variantId = cartItems && cartItems['variants'] && cartItems['variants']['variants']['id'];
                setselectedVarients(variantId)

            }
            // return ({isItemAddedToCart: cartItems.length>0 , data:cartItems[0]})
        }else{
            
        }
    }

    const onChangeItemQty = () => {
        setIsAddedToCart(false)
    }

    const onChangePackOf = () =>{
        setIsAddedToCart(false)
        setNoOfProduct(1)
    }

    const handelViewCart = () => {
        window.location.href = "/cart";
    }

    const handelBuyNow = async () => {
        const response = await addToCart(payload)
        clevertapEvent.onCleverTapEvent("kuwa_buy_now", trackData);
        if (response === 200) {
            setNoOfProduct(1);
            if (haveAdress) {
                // router.push('/payment')
                window.location.href = '/payment'
            } else {
                router.push('/address/add-address');
            }
        }
    }
    const handelShareOption = (action) => {
        const redirectLocation = window.location.href
        if (action === "WhatsApp") {

        }
        if (action === "FaceBook") {

        }
    }
    const onHandleApplePay = () => {
        console.log("userDatauserData",userData)
        const deliveryFeesConfig = countryList.find((data) => data.code == selectedCountry.code) || {}
        const productPrice = parseInt(finalPrice) * parseInt(noOfProduct);
        const minThreshold = deliveryFeesConfig.minThreshold || 0;
        let totalAmount = productPrice;
        let devliveryFees = 0
        const productName = name;
        const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";
        console.log("sajhaj",prePaidDiscount)
        if(productPrice < minThreshold){
            devliveryFees =  deliveryFeesConfig.deliveryFee;
            totalAmount = totalAmount + deliveryFeesConfig.deliveryFee
        }
        let extraDiscount = prePaidDiscount > 0 ? parseFloat(((totalAmount * prePaidDiscount)/100).toFixed(2)) : 0;
        console.log("hvahah",extraDiscount)
        totalAmount = totalAmount - extraDiscount
        const applePaySupportednetworks = "visa, mastercard, amex";
        let request = {
          merchantCapabilities: ['supports3DS'],
          supportedNetworks: applePaySupportednetworks.split(", "),
          countryCode: selectedCountry.code || "",
          currencyCode:  selectedCountry.currency || "",
          total: { label: "For " + productName, amount: totalAmount },
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
              {
                  "label": "Shipping",
                  "amount": devliveryFees
              },
              {
                "label": "Additional Discount",
                "amount": extraDiscount
              }
          ],
        };
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
                handelAddToCart({isIndividualProduct:true});
                placeApplePayOrderFlow({applePayData:applePayData,token:getCheckoutToken.token})

               
              }
          }
        }
    }

    
    const pricingSectionVariables = {
        currency: currency,
        name: name,
        numberOfProductReview: numberOfProductReview,
        title: title,
        variants: variants,
        setselectedVarients: setselectedVarients,
        selectedVarients: selectedVarients,
        retailPrice: retailPrice,
        finalPrice: finalPrice,
        discount: discount,
        handelAddToCart: handelAddToCart,
        handelBuyNow: handelBuyNow,
        handelShareOption: handelShareOption,
        setNoOfProduct: setNoOfProduct,
        handelViewCart: handelViewCart,
        onHandleApplePay:onHandleApplePay,
        noOfProduct: noOfProduct,
        mininmumDeliveryThreshold:mininmumDeliveryThreshold,
        normalInventory:normalInventory,
        productId:id,
        selectedVariantQuantity:selectedVariantQuantity 
    };
    console.log("pricingSectionVariables",pricingSectionVariables)

    const handelRoute = (type) => {
        if (type === "home") {
            router.push('/')
        } else if (type === "cat") {

        }else if (type === "product") {

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
        console.log("getCartItems",getCartItems)
        console.log("selectedVarients",selectedVarients)
        console.log("saveAddressResp",saveAddressResp)
        const {billingAddress={} , shippingAddress={} } = saveAddressResp || {}
        const deliveryFeesConfig = countryList.find((data) => data.code == selectedCountry.code) || {}
        const cartItemsData = getCartItems && getCartItems['products'];
        const userName = name || "";
        console.log("cartItemsData",cartItemsData)
        console.log("id",id)
        const finalSelectedItems = cartItemsData.filter((data)=>data.id == id);
        console.log("finalSelectedItems",finalSelectedItems)
        const cartItemIdForIndividualProduct = finalSelectedItems && finalSelectedItems[0]['cartItemId'] || ""
        const cartItemPayload = await createPayloadForCartItems(finalSelectedItems);

        const description = `${userName + ",MULTIPLE_ITEM," + ""}`;
        const userId = getCartItems['customer'] || userData['id'] || null;
        const productPrice = parseInt(finalPrice) * parseInt(noOfProduct);
        const minThreshold = deliveryFeesConfig.minThreshold || 0;
        let totalAmount = productPrice
        let devliveryFees = 0
        const productName = name;
        if(productPrice < minThreshold){
            devliveryFees =  deliveryFeesConfig.deliveryFee;
            totalAmount = totalAmount + deliveryFeesConfig.deliveryFee
        }
        const taxAmount = await calculateVatPercentage(productPrice);
        const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";
        let extraDiscount = prePaidDiscount > 0 ? parseFloat(((totalAmount * prePaidDiscount)/100).toFixed(2)) : 0;
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
            "finalAmount": totalAmount,
            "totalAmount": totalAmount,
            "currency": selectedCountry.currency || "",
            "orderSource": "WEBSITE",
            "orderCategory": "CART",
            "couponApplied":  false,
            "couponCode":  "",
            "discount": 0,
            "paymentType": "Regular",
            "taxAmount": taxAmount,
            "shippingAmount": 0,
            "deliveryCharges":devliveryFees,
            "cartItems": cartItemPayload,
            "prepaidDiscountAmount":extraDiscount
          }

          payload['token'] = token;
          payload['paymentMode'] = "APPLE_PAY";
        //   trackData['Payment Type'] = 'Apple pay' || ''
        //   clevertapEvent.onCleverTapEvent("kuwa_payments_proceed_to_pay", trackData);
        console.log("payloadpayload",payload) 
            const placeOrderResp  =  await fetch('/api/apple-pay-get-buy-now', {
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
                const deletePayload = {cartItemId:cartItemIdForIndividualProduct}
                const deleteCartItemResp = await fetch('/api/delete-cart-item', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(deletePayload)
                  })
                  try {
                    const deleteCartItemData = await deleteCartItemResp.json();
                    console.log("deleteCartItemDatadeleteCartItemData",deleteCartItemData)
                    router.push(`/payment/success?orderId=${placeOrder.order_id}&isIndividualProduct=true`)
                  } catch (error) {
                  }
            }
    }

    try{
        const tabbyMinLimit = 10;
        const tabbyMaxLimit = 2000;
        const isShowTabby = (finalPrice > tabbyMinLimit) && (finalPrice < tabbyMaxLimit)
        if(isShowTabby){
            new TabbyPromo({
                selector: '#tabbyDetail', // required, content of tabby Promo Snippet will be placed in element with that selector.
                currency: currency, // 'SAR, AED, KWD, BHD'
                price: finalPrice, // required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
                lang: 'en', // 'ar'
                source: 'product', // Optional, snippet placement; `product` for product page and `cart` for cart page.
              // required, store Public Key which identifies your account when communicating with tabby.
              });
        }
       
    }catch(error){
       console.log("Error occurs while fetching tabby",error)
    }
    console.log(productData,"productDataproductData")
    return (
        <div className={style.productPricingContainerOuter}>
            <div className={style.routeSection}>
                <span onClick={() => handelRoute("home")}>Home</span> / 
                {/* <span onClick={() => handelRoute("cat")} ></span> / */}
                <span onClick={() => handelRoute("product")}> {name}</span>
            </div>
            <div className={style.productPricingContainer}>
                <ProductImageSection allImages={allImages} dealTag={dealTag} dealIconUrl={dealIconUrl} isDealActive={isDealActive} isTimerActive={isTimerActive} currentTimerStatus={currentTimerStatus} isVariantCurrenTimeStatus={isVariantCurrenTimeStatus} isVariantDealActive={isVariantDealActive} isVariantTimeActive={isVariantTimeActive} variantdealId={variantdealId} seleVariantIcon={seleVariantIcon} selectedVariantTag={selectedVariantTag} normalInventory={normalInventory} selectedVariantQuantity={selectedVariantQuantity}  />
                <ProductPricingSection pricingSectionVariables={pricingSectionVariables} isAddedToCart={isAddedToCart} onChangeItemQty={onChangeItemQty} onResetViewCartState= {onChangePackOf}  isDealActive={isDealActive} isTimerActive={isTimerActive} currentTimerStatus={currentTimerStatus}  isVariantCurrenTimeStatus={isVariantCurrenTimeStatus} isVariantDealActive={isVariantDealActive} isVariantTimeActive={isVariantTimeActive} variantdealId={variantdealId} />
            </div>
            {frequentlyBoughtTogether && <div className={style.FrequntlyBoughtTogetherBox}>
                <FrequntlyBoughtTogether currency={currency} productData={frequentlyBoughtTogether} />
            </div>}
            <Loader isShow={isLoading} />
        </div>
    )
}

export default ProductDeatil