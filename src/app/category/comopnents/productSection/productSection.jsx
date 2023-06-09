'use client'

import React from "react"
import style from "./productSection.module.scss"
import ProductCard from "@/components/ProductCard/ProductCard"
const ProductSection = ({ resposneValue = [] }) => {
    console.log(resposneValue, "resposneValue")
    if (resposneValue && resposneValue.length > 0) {
        return (
            <div className={style.productSectionContainer}>
                <div className={style.allProduct}>
                    {resposneValue.map((item, index) => {
                        const { id = '', image = '', name = '', price = {}, seoUrl = '', title = '' } = item || {};
                        const { finalPrice = '', retailPrice = '', currency = '', discount = '', discountType = '' } = price || {}
                        const cardData = {
                            productName: name,
                            finalPrice: finalPrice,
                            retailPrice: retailPrice,
                            currency: currency,
                            discount: discount,
                            discountType: discountType,
                            image: image || "",
                            id: id || ""
                        }
                        return (
                            <div className={style.product}>
                                <ProductCard key={index} cardData={cardData} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return <></>
    }
}
export default ProductSection