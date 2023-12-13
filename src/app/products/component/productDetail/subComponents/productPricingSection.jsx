"use client"
import React, { useEffect, useState } from "react";
import styles from './ProductPricingSection.module.scss'
import IncrimentBar from "@/components/IncrimnetBar/incrimentBar";
import Varients from "./productVarients";
import { getTamaraPaymentTypes } from '@/services';
const ProductPricingSection = ({ pricingSectionVariables, isAddedToCart=false, onChangeItemQty={} ,onResetViewCartState={} }) => {
    const { currency = "", name = "", numberOfProductReview = "", title = "", variants = [], setselectedVarients ={}, selectedVarients = "", retailPrice = 0, finalPrice = 0, discount = 0, handelAddToCart={}, handelBuyNow ={}, handelShareOption = {}, setNoOfProduct = {}, noOfProduct = 0 , handelViewCart={}} = pricingSectionVariables;

    const [tamaraConfig, setTamaraConfig] = useState({});

    useEffect(()=>{
        getTamaraConfig()
    },[])

    const getTamaraConfig = async() => {
        const tamaraPaymentConfig = await getTamaraPaymentTypes();
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
     
        const applePaySupportednetworks = "visa, mastercard, amex";
        let request = {
          merchantCapabilities: ['supports3DS'],
          supportedNetworks: applePaySupportednetworks.split(", "),
          countryCode: "AE" || "",
          currencyCode:  "AED" || "",
          total: { label: "For " + "Multiple_Package", amount: 500 },
          "shippingType": "shipping",
          "requiredBillingContactFields": [
              "postalAddress",
              "name"
          ],
          "requiredShippingContactFields": [
              "postalAddress",
              "name",
              "phone",
              "email"
          ],
          "lineItems": [
              {
                  "label": "Sales Tax",
                  "amount": "0.00"
              },
              {
                  "label": "Shipping",
                  "amount": "0.00"
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
               
              }
          }
        }
    }

    const tamaraMinAmount = tamaraConfig && Object.keys(tamaraConfig).length> 0 ? tamaraConfig&&tamaraConfig[0] && tamaraConfig[0].min_limit && tamaraConfig[0].min_limit.amount:0
    const tamaraMaxAmount = tamaraConfig && Object.keys(tamaraConfig).length> 0 ? tamaraConfig&&tamaraConfig[0] && tamaraConfig[0].max_limit && tamaraConfig[0].max_limit.amount:0

    return (
        <div className={styles.pricingSectionContainer}>
            <div className={styles.title}>{title}</div>
            {numberOfProductReview && <div className={styles.reviewContainer}>
                <div className={styles.imageReview}><img src="" alt="" /></div>
                {numberOfProductReview && <div className={styles.numberOfReview}>({numberOfProductReview})</div>}
            </div>}
            <div className={styles.pricingConatiner}>
                <div className={styles.price}>{currency + ". " + finalPrice * noOfProduct}</div>
                <div className={styles.incriment}>
                    <IncrimentBar noOfProduct={noOfProduct} setNoOfProduct={setNoOfProduct} onResetViewCartState={onResetViewCartState} />
                </div>
            </div>
            {variants.length>0 ? <div className={styles.packOf}>Pack of</div>:""}  
            <Varients currency={currency} variants={variants} setselectedVarients={setselectedVarients} selectedVarients={selectedVarients} onResetViewCartState={onResetViewCartState}/>
            <div className={styles.addToCartContainer}>
               {
                isAddedToCart?<div className={styles.addToCart} onClick={() => handelViewCart()} ><span>View Cart</span></div>:
                <div className={styles.addToCart} onClick={() => handelAddToCart()} ><span>Add to Cart</span></div>
               }
                <div className={styles.buyNow} onClick={() => handelBuyNow()} ><span>Buy Now</span></div>
            </div>

            <div style={{marginTop:'24px',cursor:'pointer'}} onClick={()=>onApplePay()}>
               <img style={{width:'100%'}} src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/default.png" alt="apple-pay"></img>
            </div>
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