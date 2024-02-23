"use client"
import React, { useRef, useState } from "react"
import style from './relatedProduct.module.scss'
import ProductCard from "@/components/ProductCard/ProductCard"
import Loader from "@/components/Loader/Loader"
import { addToCart } from "@/services"
import useCleverTapEvents from "@/hooks/useCleverTapEvents"


const RelatedProducts = ({ productData = {} }) => {
    const { relatedProduct = [] } = productData || {};
    console.log("relatedProduct",relatedProduct)
    const [isLodaing, setIsLoading] = useState(false);
    const leftArrow = useRef(null);
    const clevertapEvent = useCleverTapEvents();
    let trackData={}
    const onAddToCart = async (data) => {
        try {
            setIsLoading(true)
            const res = await addToCart(data);
            setIsLoading(false)
            clevertapEvent.onCleverTapEvent("kuwa_add_to_cart",trackData);  
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
                        <div className={style.leftArrow} onClick={()=>handelArrow(-220)}>
                            <img src="https://d25uasl7utydze.cloudfront.net/kuwa/right%20arrow.png" alt="" />
                        </div>
                        <div ref={leftArrow} className={style.allProducts}>
                            {relatedProduct.map((item, index) => {
                                const { id = '', image = '', name = '', price = {}, seoUrl = '', title = '' } = item || {};
                                const {dealId,isTimeActive,isDealActive,currentTimeStatus='',dealInventory='',dealIconUrl='',dealTag='',dealDiscountPrice='',dealFinalPrice='',dealListPrice=''}= item || {}
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
                                    seoUrl:seoUrl || "",
                                    dealId:dealId || "",
                                    isTimeActive: isTimeActive,
                                    isDealActive:isDealActive,
                                    currentTimeStatus:currentTimeStatus,
                                    dealInventory:dealInventory,
                                    tagIconUrl:dealIconUrl,
                                    tag:dealTag,
                                    dealDiscountPrice:dealDiscountPrice,
                                    dealFinalPrice:dealFinalPrice,
                                    dealListPrice:dealListPrice
                                }
                                trackData = {
                                    "product Name": name,
                                    "quantity": 1,
                                    "product Id": id,
                                }
                                let addToCartPayload = {};
                                if(dealId && isDealActive && isTimerActive,currentTimeStatus=="in-between"){
                                     addToCartPayload= {"product":id,"quantity":1,"dealId":dealId}
                                }
                                else{
                                    addToCartPayload = {"product":id, "quantity":1}
                                }
                                return (
                                    <ProductCard key={index} cardData={cardData} addToCart={() => onAddToCart(addToCartPayload)} />
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