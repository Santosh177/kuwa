"use client"
// import ReviewCard from "@/app/[lng]/components/ReviewCard/ReviewCard";
import ReviewCard from "@/app/[lng]/components/ReviewCard/reviewCard";
import React, { useEffect, useState } from "react";
import style from "./ProductReview.module.scss"
import { useLanguage } from "@/context/languageDetails";
import ProductRating from "../productRating/ProductRating";
import { useAuth } from "@/context/userDetail";

const splitAndPush = (intialProduct, currentQueue) => {
    let finalResult = []
    if (intialProduct && intialProduct.length > 0 && intialProduct.length >= currentQueue.length) {
        const intialIndex = currentQueue.length
        for (let i = intialIndex; i < intialIndex + 8; i++) {
            if(intialProduct[i]){
                finalResult.push(intialProduct[i])
            }
        }
    }
    
    return ([...currentQueue, ...finalResult])
}
const ProductReview = ({ productData }) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    const { reviews = [],id="",images=[],title,rating={} } = productData || {}
  
    const [currentQueue, setCurrentQueue] = useState([]);
    const {isLogin=false, userData={}} = useAuth();

    useEffect(() => {
        setCurrentQueue(splitAndPush(reviews, currentQueue))
    }, [])

    const handelOnCLick = () => {
        setCurrentQueue(splitAndPush(reviews, currentQueue))
    }
    const totalReviews  = productData  && reviews?.length || 0;
    const isShowMore = (reviews && reviews?.length > 8 && currentQueue.length < totalReviews );
    // if (currentQueue && currentQueue.length > 0) {
        return (
            <>
            <div className={style.reviewsSection} >
                <div className={style.ratingSection}>
                    <ProductRating rating = {rating} productId={id} images={images} title={title}/>
                </div>
                <div className={style.reviewsContainerOuter}>
                <div className={style.reviewsContainer}>
                    {
                        currentQueue?.map((item, index) => {
                            return (
                                <div className={style.cards}>
                                    <ReviewCard item={item} key={index} />
                                </div>
                            )
                        })
                    }
                </div>
                {isShowMore && <div className={style.seeMore} onClick={() => handelOnCLick()}>
                    <span>{isArabic ? "عرض المزيد" :"See More"}</span>
                    <img src="https://d25uasl7utydze.cloudfront.net/kuwa/arrow-down.svg" alt="arrow Down" />
                </div>}
            </div>
            </div>
            </>
        )
    // }
    // else{
    //     return <></>
    // }
}

export default ProductReview