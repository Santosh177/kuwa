"use client";
import React, { useState, useRef, useEffect } from "react";
import style from "./ReviewCard.module.scss";
import { useLanguage } from "@/context/languageDetails";

const ReviewCard = ({ item }) => {
  const { customerName = "", userLocation = "", rating = "", headLine = "", reviewBody = "" } = item;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const reviewBodyRef = useRef(null);

  const { listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage = {} } = useLanguage(); 

  useEffect(() => {
    if (reviewBodyRef.current) {
      setIsTruncated(reviewBodyRef.current.scrollHeight > reviewBodyRef.current.clientHeight);
    }
  }, [reviewBody]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={style.reviewCardContainer}>
        <div className={style.customer}>
          <div className={style.customerName}>
            {customerName} <span>{userLocation}</span>
          </div>
          <div className={style.ratingDiv}>
            <div className={style.verified}>
              <img src="https://d25uasl7utydze.cloudfront.net/assets/tick_new.svg" alt="security" />
              <span>{isArabic ? "موثق" : "Verified"}</span>
            </div>
            <div className={style.rating}>
              <img src="https://d25uasl7utydze.cloudfront.net/kuwa/stars.png" alt="star" />
              <span>{parseFloat(rating).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={style.bottomContainer}>
          <h2 className={style.heading}>{headLine}</h2>
          <p
            className={`${style.reviewBody} ${isExpanded ? style.expanded : style.collapsed}`}
            ref={reviewBodyRef}
          >
            {reviewBody}
            {!isExpanded && isTruncated && (
              <span className={style.seeMore} onClick={toggleExpand}>
                ... {isArabic ? "شاهد المزيد" : "See more"}
              </span>
            )}
          </p>
          {isExpanded && (
            <button className={style.toggleButton} onClick={toggleExpand}>
             {isArabic ? "شاهد أقل" : "See less"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
