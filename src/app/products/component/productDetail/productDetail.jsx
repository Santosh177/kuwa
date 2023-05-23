"use client"

import React from "react";
import ProductImageSection from "./subComponents/productImageSection";
// import ProductAddOnSection from "./subComponents/productAddOnSection";
import ProductPricingSection from "./subComponents/productPricingSection";
import style from "./ProductDetail.module.scss"
const ProductDeatil = ({ productData = {} }) => {
    const { benefits = "", currency = "", description = "", id = "", images = [], ingredients = "", name = "", numberOfProductReview = "", price = null, quantity = 0, title = "", variants = [] } = productData || {}
    return (
        <>
            <div className={style.productPricingContainer}>
                <ProductImageSection images={images} />
                <ProductPricingSection productData={productData} />
            </div>
        </>
    )
}

export default ProductDeatil