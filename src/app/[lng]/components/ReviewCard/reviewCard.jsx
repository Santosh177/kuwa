"use client"
import React from "react";
import style from "./ReviewCard.module.scss"
const ReviewCard = ({item}) => {
 
    const { reviewBody = "", headLine = "", customerName = "", id = "", rating= "",isActive } = item || {}
    const getStarImage = (index) => {
        if (index < rating) {
          return "https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/stars.png"; 
        } else {
          return "https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/dull_stars+1.png"; 
        }
      };
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          const starImage = getStarImage(i);
          stars.push(
            <div className={style.reviewStar} key={i}>
              <img src={starImage} alt="star" />
            </div>
          );
        }
        return stars;
      };
    
    return (
      <>
        <div className={style.reviewCardConatiner}>
        <h2 className={style.heading}>{headLine}</h2>
          <div className={style.reviewStarConatiner}>
            {renderStars()}
            </div>
         
            <p className={style.reviewBody}>{reviewBody}</p>
            <div className={style.bottomContainer}>
                <div className={style.customer}>
                    <div className={style.customerName}>{customerName}</div>
                    <div className={style.verfied}>
                        <img src="https://d25uasl7utydze.cloudfront.net/kuwa/security.svg" alt="security" />
                        <span>Verified Customer</span>
                    </div>
                </div>
               
            </div>
        </div>
    
    </>
    )
}

export default ReviewCard



