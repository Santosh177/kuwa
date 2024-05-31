"use client"
// import ReviewCard from "@/app/[lng]/components/ReviewCard/ReviewCard";
import ReviewCard from "@/app/[lng]/components/ReviewCard/reviewCard";
import React, { useEffect, useState } from "react";
import style from "./ProductReview.module.scss"
import { useLanguage } from "@/context/languageDetails";

const splitAndPush = (intialProduct, currentQueue) => {
    let finalResult = []
    if (intialProduct && intialProduct.length > 0 && intialProduct.length >= currentQueue.length) {
        const intialIndex = currentQueue.length
        for (let i = intialIndex; i < intialIndex + 3; i++) {
            if(intialProduct[i]){
                finalResult.push(intialProduct[i])
            }
        }
    }
    
    return ([...currentQueue, ...finalResult])
}
const ProductReview = ({ productData }) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    const { reviews = [] } = productData || {}
    const activeReviews = reviews?.filter(data=>data.isActive == true)
    console.log("activeReviews",activeReviews)
    const [currentQueue, setCurrentQueue] = useState([]);
    useEffect(() => {
        setCurrentQueue(splitAndPush(activeReviews, currentQueue))
    }, [])
    console.log("currentQueue",currentQueue)
    const handelOnCLick = () => {
        setCurrentQueue(splitAndPush(activeReviews, currentQueue))
    }
    const totalReviews  = productData  && activeReviews?.length || 0;
    const isShowMore = (activeReviews && activeReviews?.length > 3 && currentQueue.length < totalReviews );
    if (currentQueue && currentQueue.length > 0) {
        return (
            <div className={style.reviewsContainerOuter}>
                <div className={style.review}>{isArabic ? "" : "Customer Review"}</div>
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
                    <span>{isArabic ? "" :"See More"}</span>
                    <img src="https://d25uasl7utydze.cloudfront.net/kuwa/arrow-down.svg" alt="arrow Down" />
                </div>}
            </div>
        )
    } else {
        return <></>
    }
}

export default ProductReview