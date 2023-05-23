"use client"
import React, { useState } from "react";
import styles from './ProductPricingSection.module.scss'
import IncrimentBar from "@/components/IncrimnetBar/incrimentBar";
const ProductPricingSection= ({productData}) =>{
    const {benefits="",currency="Dhs",description="",id="",name="",numberOfProductReview="832",price="60",quantity=0,title="AADAR Endure Capsule For Premature Ejaculation (60 Capsules)"} = {}  
    const [noOfProduct,setNoOfProduct] = useState(1)
    const payload = {
        "product": id,
        "quantity": noOfProduct
    }
    const handelAddToCart = (payload) => {
        console.log(payload);
        setNoOfProduct(1)
    }
    const handelBuyNow = (payload) => {
        console.log(payload)
        setNoOfProduct(1)
    }
    return(
        <div className={styles.pricingSectionContainer}>
            <div className={styles.title}>{title}</div>
            <div className={styles.reviewContainer}>
                <div className={styles.imageReview}><img src="" alt="" /></div>
                <div className={styles.numberOfReview}>({numberOfProductReview})</div>
            </div>
            <div className={styles.pricingConatiner}>
                <div className={styles.price}>{currency + ". " + price}</div>
                <div className={styles.incriment}>
                    <IncrimentBar noOfProduct={noOfProduct} setNoOfProduct={setNoOfProduct} />
                </div>
            </div>
            <div className={styles.addToCartContainer}>
                <div className={styles.addToCart} onClick={()=>handelAddToCart(payload)} ><span>Add to Cart</span></div>
                <div className={styles.buyNow} onClick={()=>handelBuyNow(payload)} ><span>Buy Now</span></div>
            </div>
            <div className={styles.shareConatiner}>
                <div className={styles.Share} >Share:</div>
                <div className={styles.shareLogo}>
                    <img src="https://d25uasl7utydze.cloudfront.net/kuwa/facebook.svg" alt="facebook" />
                    <img src="https://d25uasl7utydze.cloudfront.net/kuwa/linkedin.svg" alt="linkedin" />
                    <img src="https://d25uasl7utydze.cloudfront.net/kuwa/mail.svg" alt="mail" />
                    <img src="https://d25uasl7utydze.cloudfront.net/kuwa/twitter.svg" alt="twitter" />
                </div>
            </div>
        </div>
    )
}

export default ProductPricingSection