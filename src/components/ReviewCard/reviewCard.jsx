"use client"
import React from "react";
import style from "./ReviewCard.module.scss"

const ReviewCard = ({item}) => {
  
    const { reviewBody = "", headLine = "", customerName = "", id = "" } = item || {}
    const numberOfStar = [];
    return (
        <div className={style.reviewCardConatiner}>
            <div className={style.reviewStarConatiner}>
                {numberOfStar.map((item, i) => {
                    return (<div className={style.reviewStar} key={i}><img key={i} src="https://d25uasl7utydze.cloudfront.net/kuwa/stars.svg" alt="star" /></div>)
                })}
            </div>
            <div className={style.reviewBody}>{reviewBody}</div>
            <div className={style.bottomContainer}>
                <div className={style.customer}>
                    <div className={style.customerName}>{customerName}</div>
                    <div className={style.verfied}>
                        <img src="https://d25uasl7utydze.cloudfront.net/kuwa/security.svg" alt="security" />
                        <span>Verified Customer</span>
                    </div>
                </div>
                {/* <div className={style.like}><img src="https://d25uasl7utydze.cloudfront.net/kuwa/heart.svg" alt="heart" /><span>Like ({numberOfHeart})</span></div> */}
            </div>
        </div>
    )
}

export default ReviewCard