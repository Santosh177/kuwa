"use client"
import React, { useEffect, useState } from "react";
import styles from './ProductPricingSection.module.scss'
import IncrimentBar from "@/components/IncrimnetBar/incrimentBar";
import Varients from "./productVarients";
const ProductPricingSection = ({ pricingSectionVariables, isAddedToCart=false, onChangeItemQty={} ,onResetViewCartState={} }) => {
    const { currency = "", name = "", numberOfProductReview = "", title = "", variants = [], setselectedVarients ={}, selectedVarients = "", retailPrice = 0, finalPrice = 0, discount = 0, handelAddToCart={}, handelBuyNow ={}, handelShareOption = {}, setNoOfProduct = {}, noOfProduct = 0 , handelViewCart={}} = pricingSectionVariables;

    useEffect(()=>{
        if(window && window.TamaraProductWidget){
            window.TamaraProductWidget.render()
        }
    },[window.TamaraProductWidget,finalPrice,currency])

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
                data-payment-type="installment"
                data-disable-installment="false"
                data-disable-paylater="false"
                data-installment-minimum-amount="99"
                data-installment-maximum-amount="3000"
                data-installment-available-amount="99"
                data-pay-later-max-amount="0"
                />
        </div>
    )
}

export default ProductPricingSection