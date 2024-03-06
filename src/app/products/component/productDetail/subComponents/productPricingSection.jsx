"use client"
import React, { useEffect, useState } from "react";
import styles from './ProductPricingSection.module.scss'
import IncrimentBar from "@/components/IncrimnetBar/incrimentBar";
import Varients from "./productVarients";
import { getTamaraPaymentTypes } from '@/services';
import { useCountryList } from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
const ProductPricingSection = ({ pricingSectionVariables, isAddedToCart=false, onChangeItemQty={} ,onResetViewCartState={} ,isDealActive,isTimerActive,currentTimerStatus,isVariantCurrenTimeStatus,isVariantDealActive,isVariantTimeActive,variantdealId,avgRating="",totalRating="" }) => {
    const { currency = "", name = "", numberOfProductReview = "", title = "", variants = [], setselectedVarients ={}, selectedVarients = "", retailPrice = 0, finalPrice = 0, discount = 0,onHandleApplePay={}, handelAddToCart={}, handelBuyNow ={}, handelShareOption = {}, setNoOfProduct = {}, noOfProduct = 0 , handelViewCart={},mininmumDeliveryThreshold} = pricingSectionVariables;
    console.log("pricingSectionVariables",pricingSectionVariables)
    console.log("dbhjahva",variantdealId,isVariantDealActive,isVariantTimeActive,isVariantCurrenTimeStatus)
    const countryList = useCountryList();
    const { selectedCountry={} } = useCountry();
    const clevertapEvent = useCleverTapEvents();
    const [tamaraConfig, setTamaraConfig] = useState({});
    const deliveryFeesConfig = countryList.find((data) => data.code == "BH" || data.code == "BH") || {};
    const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";
    useEffect(()=>{
        getTamaraConfig()
    },[])

    const getTamaraConfig = async() => {
        const selectedCountryCode = selectedCountry && selectedCountry.code || "BH"
        const tamaraPaymentConfig = await getTamaraPaymentTypes(selectedCountryCode);
        if(tamaraPaymentConfig && Object.keys(tamaraPaymentConfig).length > 0){
            setTamaraConfig(tamaraPaymentConfig)
        }
        
    }

    useEffect(()=>{
        if(window && window.TamaraProductWidget && Object.keys(tamaraConfig).length > 0 ){
            window.TamaraProductWidget.render()
        }
    },[(typeof window !== "undefined") && window && window.TamaraProductWidget,finalPrice,currency,tamaraConfig])


    const onApplePay = () => {
        const productPrice = parseInt(finalPrice) * parseInt(noOfProduct);
        const minThreshold = deliveryFeesConfig.minThreshold || 0;
        let totalAmount = productPrice
        let devliveryFees = 0
        const productName = name;
        if(productPrice < minThreshold){
            devliveryFees =  deliveryFeesConfig.deliveryFee;
            totalAmount = totalAmount + deliveryFeesConfig.deliveryFee
        }
        let appleSession;
        const applePaySupportednetworks = "visa, mastercard, amex";
        let request = {
          merchantCapabilities: ['supports3DS'],
          supportedNetworks: applePaySupportednetworks.split(", "),
          countryCode: "AE" || "",
          currencyCode:  "AED" || "",
          total: { label: "For " + productName, amount: totalAmount },
          "shippingType": "shipping",
          "requiredBillingContactFields": [
              "postalAddress",
              "name",
              "phone",
              "email"
          ],
          "requiredShippingContactFields": [
              "postalAddress",
              "name",
              "phone",
              "email"
          ],
          "lineItems": [
              {
                  "label": "Shipping",
                  "amount": devliveryFees
              }
          ],
        };
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
                placeApplePayOrderFlow(applePayData)

               
              }
          }
        }
    }

    const placeApplePayOrderFlow = async(applePayData) =>{
        console.log("applePayData",applePayData)
        const isLogin = false;
        const { givenName="", familyName = "" , phoneNumber="",emailAddress="" } =  applePayData && applePayData.payment && applePayData.payment.shippingContact || {}
        if(isLogin){

        }else{
            const nonSignupUserPayload = {"email":emailAddress,"firstName":givenName,"lastName":familyName,"mobileNumber":phoneNumber};
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
              if(signupRespData && signupRespData.status_code == 200){
                onAddAddress(applePayData)
              }
        }
    }

    const onAddAddress = async(applePayData) =>{
        const { givenName="", familyName = "" , phoneNumber="",emailAddress="" ,addressLines=[],subLocality="",locality="",postalCode="",country=""} =  applePayData && applePayData.payment && applePayData.payment.shippingContact || {}
        clevertapEvent.onCleverTapEvent("kuwa_add_address_save_and_proceed",{});
        const address = addressLines.toLocaleString()+" "+subLocality + " " +locality+ " " + postalCode;
        const apartment = locality;
        const shippingAddressPayload =  {"country":country,"address":address,"apartment":apartment,"stateProvince":"","firstName":givenName,"lastName":familyName,"mobNumber":phoneNumber,"email":emailAddress,"sameAddressForBilling":true,"billingAddress":true,"isActive":true,"isDefaultAddress":true}
        const billingAddressPayload ={"country":country,"address":address,"apartment":apartment,"stateProvince":"","firstName":givenName,"lastName":familyName,"mobNumber":phoneNumber,"email":emailAddress,"shippingAddress":true,"isActive":true,"isDefaultAddress":true}
        const addressPayload = {
            shippingAddress:shippingAddressPayload,
            billingAddress: billingAddressPayload
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
            const saveAddress = await res.json()
            console.log("SAVEEE",saveAddress)
            // onPayment()
          } else {
            console.log("ERROR")
          }
        } catch (error) {
          console.error('An unexpected error happened occurred:', error)
        }
      }

    // const onPayment = ()=>{
    //     let payload = {
    //         "cartId":getCartItems['id'] || "",
    //         "orderType": "one-time",
    //         "userId": userId || "",
    //         "billingAddressId":selectedAddress && selectedAddress.asoBillingAddress || "",
    //         "shippingAddressId":selectedAddress && selectedAddress.id || "",
    //         "addressId": selectedAddress && selectedAddress.id || "",
    //         "countryCode": selectedCountry.code || "",
    //         "countryId": selectedCountry.id || "",
    //         "description": description,
    //         "finalAmount": priceDetails['totalAmount'],
    //         "totalAmount": priceDetails['finalPayloadTotalAmount'],
    //         "currency": selectedCountry.currency || "",
    //         "orderSource": "WEBSITE",
    //         "orderCategory": "CART",
    //         "couponApplied": isCouponApplied || false,
    //         "couponCode": couponCodeData['coupon'] || "",
    //         "discount": priceDetails['discountAmount'],
    //         "paymentType": "Regular",
    //         "taxAmount": taxAmount,
    //         "shippingAmount": 0,
    //         "deliveryCharges":priceDetails['deliveryFees'],
    //         "cartItems": cartItemPayload
    //       }
    // }

    const tamaraMinAmount = tamaraConfig && Object.keys(tamaraConfig).length> 0 ? tamaraConfig&&tamaraConfig[0] && tamaraConfig[0].min_limit && tamaraConfig[0].min_limit.amount:0
    const tamaraMaxAmount = tamaraConfig && Object.keys(tamaraConfig).length> 0 ? tamaraConfig&&tamaraConfig[0] && tamaraConfig[0].max_limit && tamaraConfig[0].max_limit.amount:0
    
    const getStarImage = (index) => {
      const rating = avgRating - index;
      if (rating >= 0.75) {
          return "https://d25uasl7utydze.cloudfront.net/assets/star-filled.svg"; 
      } else if (rating >= 0.25) {
          return "https://d25uasl7utydze.cloudfront.net/assets/star-halft.svg"; 
      } else {
          return "https://d25uasl7utydze.cloudfront.net/assets/star.svg"; 
      }
  };

    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        const starImage = getStarImage(i);
        stars.push(
          <div className={styles.reviewStar} key={i}>
            <img src={starImage} alt="star" />
          </div>
        );
      }
      return stars;
    };

    return (
        <div className={styles.pricingSectionContainer}>
            <div className={styles.title}>{title}</div>
            {/* {numberOfProductReview && <div className={styles.reviewContainer}>
                <div className={styles.imageReview}><img src="" alt="" /></div>
                {numberOfProductReview && <div className={styles.numberOfReview}>({numberOfProductReview})</div>}
            </div>} */}
           {avgRating && totalRating && <div className={styles.ratingSection}>
              <div className={styles.avgRating}>{renderStars()}</div>
              <div className={styles.totalNumberRating}>{`(${totalRating}  ratings)`}</div>
            </div>}
            <div className={styles.pricingConatiner}>
              {
              (isDealActive && isTimerActive
               &&
              currentTimerStatus=="in-between"
              ) ||
              
              (isVariantDealActive && isVariantTimeActive 
                && isVariantCurrenTimeStatus == "in-between")
              ? 
              <div className={styles.price}>{"Only at" + " " +currency + ". " + finalPrice * noOfProduct}</div>:
                <div className={styles.price}>{currency + ". " + finalPrice * noOfProduct}</div>}
                <div className={styles.incriment}>
                    <IncrimentBar noOfProduct={noOfProduct} setNoOfProduct={setNoOfProduct} onResetViewCartState={onResetViewCartState} />
                </div>
            </div>
            {variants.length>0 ? <div className={styles.packOf}>Pack of</div>:""}  
            <Varients currency={currency} variants={variants} setselectedVarients={setselectedVarients} selectedVarients={selectedVarients} onResetViewCartState={onResetViewCartState}/>
            <div className={styles.freeShippingSection}>
              <div className={styles.freeShippingDiv}>
                <div className={styles.truckImg}><img src="https://d25uasl7utydze.cloudfront.net/assets/truck.svg"></img></div>
                <div className={styles.text}>Free Delivery above <span>{currency + " " +mininmumDeliveryThreshold}</span></div>
                
                </div>
                </div>
            <div className={styles.addToCartContainer}>
               {
                isAddedToCart?<div className={styles.addToCart} onClick={() => handelViewCart()} ><span>View Cart</span></div>:
                <div className={styles.addToCart} onClick={() => handelAddToCart()} ><span>Add to Cart</span></div>
               }
                <div className={styles.buyNow} onClick={() => handelBuyNow()} ><span>Buy Now</span></div>
            </div>
            
           { window && window.ApplePaySession && <div style={{marginTop:'24px',cursor:'pointer'}} onClick={()=>onHandleApplePay()}>
               <img style={{width:'100%'}} src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/default.png" alt="apple-pay"></img>
            </div>}
            { window && window.ApplePaySession && prePaidDiscount > 0 && <div className={styles.prepaidDiscount}>Extra {prePaidDiscount}% Off</div>}
            {/* <div className={styles.shareConatiner}>
                <div className={styles.Share} >Share:</div>
                <div className={styles.shareLogo}>
                    <img onClick={() => handelShareOption("WhatsApp")} src="https://d25uasl7utydze.cloudfront.net/kuwa/whatsapp.svg" alt="whatsapp" />
                    <img onClick={() => handelShareOption("FaceBook")} src="https://d25uasl7utydze.cloudfront.net/kuwa/facebook%20(1).svg" alt="facebook" />
                </div>
            </div> */}
             <div id="tabbyDetail" className={styles.tabbyDetailMain}></div>
             <div
                className="tamara-product-widget"
                data-lang="en"
                data-price={finalPrice}
                data-currency={currency}
                data-number-of-installments="3"
                data-payment-type="installment"
                data-disable-installment="false"
                data-disable-paylater="false"
                data-installment-minimum-amount= {tamaraMinAmount}
                data-installment-maximum-amount= {tamaraMaxAmount}
                data-installment-available-amount={tamaraMinAmount}
                />
                               
        </div>
    )
}

export default ProductPricingSection