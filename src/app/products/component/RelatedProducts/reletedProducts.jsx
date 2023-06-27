"use client"
import React, { useRef, useState } from "react"
import style from './relatedProduct.module.scss'
import ProductCard from "@/components/ProductCard/ProductCard"
import Loader from "@/components/Loader/Loader"
import { addToCart } from "@/services"


const RelatedProducts = ({ productData = {} }) => {
    const { relatedProduct = [] } = productData || {};
    const [isLodaing, setIsLoading] = useState(false);
    const leftArrow = useRef(null);
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
    const handelArrow = (shift) =>{
        leftArrow.current.scrollLeft += shift;
    }
    if (relatedProduct && relatedProduct.length > 0) {
        return (
            <div className={style.relatedProductContiner}>
                <div className={style.relatedProduct}>
                    <div className={style.relatatedTxt}>Related Products</div>
                    <div className={style.productContainer}>
                        <div class={style.leftArrow} onClick={()=>handelArrow(-220)}>
                            <img src="https://d25uasl7utydze.cloudfront.net/kuwa/right%20arrow.png" alt="" />
                        </div>
                        <div ref={leftArrow} className={style.allProducts}>
                            {relatedProduct.map((item, index) => {
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
                                    <ProductCard key={index} cardData={cardData} addToCart={() => onAddToCart({ product: id, quantity: 1 })} />
                                )
                            })}
                        </div>
                        <div className={style.rightArrow} onClick={()=>handelArrow(220)} >
                            <img src="https://d25uasl7utydze.cloudfront.net/kuwa/left%20arrow.png" alt="left arrow" />
                        </div>
                    </div>
                </div>
                <Loader isShow={isLodaing} />
            </div>
        )
    } else {
        return <></>
    }
}

export default RelatedProducts