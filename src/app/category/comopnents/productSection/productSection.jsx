'use client'

import React,{useState} from "react"
import style from "./productSection.module.scss"
import ProductCard from "@/components/ProductCard/ProductCard"
import Loader from "@/components/Loader/Loader"
import { addToCart } from "@/services"


const ProductSection = ({ resposneValue = [] }) => {
    const [isLodaing, setIsLoading] = useState(false);
    const onAddToCart = async (data) => {
        try {
            setIsLoading(true)
            const res = await addToCart(data);
            setIsLoading(false)
            window.location.href = '/cart';
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
        }
    }
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
                            id: id || "",
                            seoUrl:seoUrl || ""
                        }
                        return (
                            <div className={style.product}>
                                <ProductCard style={{width:'unset'}} key={index} cardData={cardData} addToCart={() => onAddToCart({ product: id, quantity: 1 })} />
                            </div>
                        )
                    })}
                </div>
                <Loader isShow={isLodaing} />
            </div>
        )
    } else {
        return <></>
    }
}
export default ProductSection