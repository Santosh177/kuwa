"use client"
import React, { useEffect, useState } from "react";
import styles from './ProductPricingSection.module.scss'
import IncrimentBar from "@/components/IncrimnetBar/incrimentBar";
import Varients from "./productVarients";
const ProductPricingSection = ({ pricingSectionVariables }) => {
    const { currency = "", name = "", numberOfProductReview = "", title = "", variants = [], setselectedVarients ={}, selectedVarients = "", retailPrice = 0, finalPrice = 0, discount = 0, handelAddToCart={}, handelBuyNow ={}, handelShareOption = {}, setNoOfProduct = {}, noOfProduct = 0 } = pricingSectionVariables
    return (
        <div className={styles.pricingSectionContainer}>
            <div className={styles.title}>{title}</div>
            <div className={styles.reviewContainer}>
                <div className={styles.imageReview}><img src="" alt="" /></div>
                {numberOfProductReview && <div className={styles.numberOfReview}>({numberOfProductReview})</div>}
            </div>
            <div className={styles.pricingConatiner}>
                <div className={styles.price}>{currency + ". " + finalPrice}</div>
                <div className={styles.incriment}>
                    <IncrimentBar noOfProduct={noOfProduct} setNoOfProduct={setNoOfProduct} />
                </div>
            </div>
            {variants && variants.lenght > 0 ? <div className={styles.packOf}>Pack of</div> :<></>}
            <Varients currency={currency} variants={variants} setselectedVarients={setselectedVarients} selectedVarients={selectedVarients} />
            <div className={styles.addToCartContainer}>
                <div className={styles.addToCart} onClick={() => handelAddToCart()} ><span>Add to Cart</span></div>
                <div className={styles.buyNow} onClick={() => handelBuyNow()} ><span>Buy Now</span></div>
            </div>
            <div className={styles.shareConatiner}>
                <div className={styles.Share} >Share:</div>
                <div className={styles.shareLogo}>
                    <img onClick={() => handelShareOption("WhatsApp")} src="https://d25uasl7utydze.cloudfront.net/kuwa/whatsapp.svg" alt="whatsapp" />
                    <img onClick={() => handelShareOption("FaceBook")} src="https://d25uasl7utydze.cloudfront.net/kuwa/facebook%20(1).svg" alt="facebook" />
                </div>
            </div>
        </div>
    )
}

export default ProductPricingSection