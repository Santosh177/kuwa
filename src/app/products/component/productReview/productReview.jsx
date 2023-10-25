"use client"
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import React, { useEffect, useState } from "react";
import style from "./ProductReview.module.scss"

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
    const { reviews = [] } = productData || {}
    const [currentQueue, setCurrentQueue] = useState([]);
    useEffect(() => {
        setCurrentQueue(splitAndPush(reviews, currentQueue))
    }, [])
    const handelOnCLick = () => {
        setCurrentQueue(splitAndPush(reviews, currentQueue))
    }
    const totalReviews  = productData && productData.reviews && productData.reviews.length || 0;
    const isShowMore = (reviews && reviews.length > 3 && currentQueue.length < totalReviews );
    if (currentQueue && currentQueue.length > 0) {
        return (
            <div className={style.reviewsContainerOuter}>
                <div className={style.review}>Customer Review</div>
                <div className={style.reviewsContainer}>
                    {
                        currentQueue.map((item, index) => {
                            return (
                                <div className={style.cards}>
                                    <ReviewCard item={item} key={index} />
                                </div>
                            )
                        })
                    }
                </div>
                {isShowMore && <div className={style.seeMore} onClick={() => handelOnCLick()}>
                    <span>See More</span>
                    <img src="https://d25uasl7utydze.cloudfront.net/kuwa/arrow-down.svg" alt="arrow Down" />
                </div>}
            </div>
        )
    } else {
        return <></>
    }
}

export default ProductReview