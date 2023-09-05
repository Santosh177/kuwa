"use client"
import React, { useEffect, useState } from "react";
import styles from './ProductPricingSection.module.scss'
import IncrimentBar from "@/components/IncrimnetBar/incrimentBar";
import Varients from "./productVarients";
const ProductPricingSection = ({ pricingSectionVariables, isAddedToCart = false, onChangeItemQty = {}, onResetViewCartState = {} }) => {
  const { currency = "", name = "", numberOfProductReview = "", title = "", variants = [], setselectedVarients = {}, selectedVarients = "", retailPrice = 0, finalPrice = 0, discount = 0, handelAddToCart = {}, handelBuyNow = {}, handelShareOption = {}, setNoOfProduct = {}, noOfProduct = 0, handelViewCart = {} } = pricingSectionVariables;
  console.log("pricingSectionVariables", pricingSectionVariables)

  const TamaraInfoWidget = ({ tamaraConfig = {} }) => {
    const {
      price = "",
      currency = "",
      minAmount = "",
      countryCode = "",
      maxAmount = "",
    } = tamaraConfig || {};
    try{
       window.TamaraWidget.render();

    }catch(error){

    }
    console.log("price", price)
    return (
      <>
        <div

          id="tamara-product-widget"
          className="tamara-product-widget"
          data-lang={"en"}
          data-price={price}
          data-currency={currency}
          data-inject-template="true"
          data-number-of-installments="3"
          data-disable-installment="false"
          data-installment-minimum-amount={99}
          data-installment-maximum-amount={2500}
          data-installment-available-amount="99"
          data-country-code={"AE"}
          data-payment-type="installment"
        />
      </>
    );
  }

  useEffect(()=>{
    try{
      window.TamaraWidget.render();
    }catch(error){
  
    }
  })
  // useEffect(() => {
    // if (window.TamaraWidget.render()) window.TamaraWidget.render();
    // window.TamaraWidget.render()
  // }, [])
    // useEffect(() => {

    // new window.TabbyProductPageSnippetCCI({
    //   selector: '#tabbyDetail',
    //   lang:    'en', // 'ar'
    //   currency: currency, // 'SAR, AED, KWD, BHD'
    //   price: finalPrice,
    // });

    // }, []);
  //   if(TabbyPromo){
      // new TabbyPromo({
      //     selector: '#tabbyDetail', // required, content of tabby Promo Snippet will be placed in element with that selector.
      //     currency: currency, // 'SAR, AED, KWD, BHD'
      //     price: finalPrice, // required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
      //     lang: 'en', // 'ar'
      //     source: 'product', // Optional, snippet placement; `product` for product page and `cart` for cart page.
      //   // required, store Public Key which identifies your account when communicating with tabby.
      //   });
  // }
  // 
  return (
    <>
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
        {<div className={styles.packOf}>Pack of</div>}
        <Varients currency={currency} variants={variants} setselectedVarients={setselectedVarients} selectedVarients={selectedVarients} onResetViewCartState={onResetViewCartState} />
        <div className={styles.addToCartContainer}>
          {
            isAddedToCart ? <div className={styles.addToCart} onClick={() => handelViewCart()} ><span>View Cart</span></div> :
              <div className={styles.addToCart} onClick={() => handelAddToCart()} ><span>Add to Cart</span></div>
          }
          <div className={styles.buyNow} onClick={() => handelBuyNow()} ><span>Buy Now</span></div>
        </div>
        {/* <div className={styles.shareConatiner}>
                <div className={styles.Share} >Share:</div>
                <div className={styles.shareLogo}>
                    <img onClick={() => handelShareOption("WhatsApp")} src="https://d25uasl7utydze.cloudfront.net/kuwa/whatsapp.svg" alt="whatsapp" />
                    <img onClick={() => handelShareOption("FaceBook")} src="https://d25uasl7utydze.cloudfront.net/kuwa/facebook%20(1).svg" alt="facebook" />
                </div>
            </div> */} 
        <div id="tamara-widget-main" style={{margin:"24px 0px"}}>
          <TamaraInfoWidget tamaraConfig={{ "price": finalPrice, "currency": currency }} />
        </div>
        <div className="taddy">
        <div id="tabbyDetail"></div>
        </div>
      </div>
    </>
  )
}

export default ProductPricingSection