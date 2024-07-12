'use client'
import React, { useState,useEffect } from 'react';
import  styles from './reviews-and-ratings.module.scss';
import { useParams,useSearchParams  } from 'next/navigation';
import { useLanguage } from '@/context/languageDetails';
import { useAuth } from '@/context/userDetail';
import AddReviewsSuccessPopup from '../../components/AddReviewsSuccessPopup/AddReviewsSuccessPopup';
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import { mixPanelTrackEvent } from '../../page';
import { useCountry } from '@/context/contryDetails';



const StarRating = ({ id, label, rating, setRating }) => {

    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
      setRating(id, value);
    };
  
    const handleMouseOver = (value) => {
      setHoverRating(value);
    };
  
    const handleMouseOut = () => {
      setHoverRating(0);
    };
 
  return (
    <div className={styles.ratingCategory}>
      <label className={styles.label} htmlFor={id}>{label}<span className={styles.asterisk}> *</span> </label>
      <div
        id={id}
        className={styles.starRating}
      >
          {[1, 2, 3, 4, 5].map((value) => (
            <div 
            key={value}
            className={`${styles.star} ${value <= (hoverRating || rating) ? styles.selected : ''}`}
            onClick={() => handleClick(value)}
            onMouseOver={() => handleMouseOver(value)}
            onMouseOut={handleMouseOut}
          >
            <img
              src={
                value <= (hoverRating || rating)
                  ? 'https://d25uasl7utydze.cloudfront.net/assets/star-filled.svg'
                  : 'https://d25uasl7utydze.cloudfront.net/assets/bright_star.svg'
              }
              alt="star"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewForm = () => {
  const [ratings, setRatings] = useState({
    qualityOfSupplements: 0,
    effectiveness: 0,
    easeOfUse: 0,
    valueForMoney: 0,
    deliveryExperience: 0,
  });

  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isShowSuccessPopup ,setIsShowSuccessPopup] = useState(false)

  const {isLogin=false, userData={}} = useAuth();
  const {listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
  const clevertapEvent = useCleverTapEvents();
  const { selectedCountry={} } = useCountry();
  const userId = userData.id || ""
  const userEmail = userData.emailAddress || "" 
  const countryName = selectedCountry.name || ""
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') || "";
  const productName = searchParams.get('productName') || "";
  const imagesString = searchParams.get('images');
  const images = imagesString ? JSON.parse(decodeURIComponent(imagesString)) : [];
  const imageUrl = images.length > 0 ? images[0].imageUrl || "" : "";


  useEffect(() => {
    const isComplete =
        reviewTitle.trim() &&
        reviewBody.trim() &&
        Object.values(ratings).every(rating => rating > 0);
    setIsFormComplete(isComplete);
}, [reviewTitle, reviewBody, ratings]);


  const handleRatingChange = (id, value) => {
    setRatings({
      ...ratings,
      [id]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!reviewTitle.trim()) {
        newErrors.reviewTitle = isArabic ? "العنوان مطلوب" : 'Title is required';
    }
    if(reviewTitle && reviewTitle.length > 120){
      newErrors.reviewTitle = isArabic ? "" : 'Title should be below 120 characters';
    }
    if (!reviewBody.trim()) {
        newErrors.reviewBody = isArabic ? "نص التقييم مطلوب" :  'Review body is required';
    }
    if(reviewBody && reviewBody.length > 300){
      newErrors.reviewBody = isArabic? "" : 'Review body should be below 300 characters';
    }
    Object.keys(ratings).forEach(key => {
        if (ratings[key] === 0) {
            newErrors.rating =isArabic ? "كل تقييم مطلوب" :  'Each Rating is required';
        }
    });

    return newErrors;
};

  const handleSubmitReview = async() =>{
    const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const trackData={
          "customer_email":userEmail,
          "product_id":productId,
          "product_name":productName,
          "country":countryName
        }
   const payload = {
     "reviewTitle":reviewTitle,
     "reviewBody":reviewBody,
     "rating":ratings,
     "productId":productId,
     "userId":userId,
   }
   try{
      const reviews = await fetch('/api/add-reviews',{
        method:'POST',
        body:JSON.stringify(payload),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const reviewsData = await reviews.json();
      clevertapEvent.onCleverTapEvent("write_a_review_web", trackData); 
        mixPanelTrackEvent("write_a_review_web", trackData,userId)
      console.log("reviewsData",reviewsData)
        setIsShowSuccessPopup(true)
   }
   catch(error){
    console.log(error)
    setIsShowSuccessPopup(true)
   }
  }

  return (
    <>
    <div>
    <div className={styles.reviewContainer}>
        <div className={styles.reviewContent}>
      <div className={styles.productInfo}>
        <div className={styles.image}><img src={imageUrl}/></div>
        <div className={styles.name}>{productName}</div>
        </div>
      <div >

        <div className={styles.ratingSection}>
          <StarRating
            id="qualityOfSupplements"
            label={isArabic ? "جودة المكملات الغذائية" : "Quality of Supplements "}
            rating={ratings.qualityOfSupplements}
            setRating={handleRatingChange}
          />
              
          <StarRating
            id="effectiveness"
            label={isArabic ? "الفعالية" : "Effectiveness"}
            rating={ratings.effectiveness}
            setRating={handleRatingChange}
          />
         
          <StarRating
            id="easeOfUse"
            label={isArabic ? "سهولة الاستخدام" :"Ease of Use "}
            rating={ratings.easeOfUse}
            setRating={handleRatingChange}
          />
         

          <StarRating
            id="valueForMoney"
            label={isArabic ? "القيمة مقابل المال" : "Value for Money"}
            rating={ratings.valueForMoney}
            setRating={handleRatingChange}
          />
       
          <StarRating
            id="deliveryExperience"
            label={ isArabic ? "تجربة التوصيل" : "Delivery Experience"}
            rating={ratings.deliveryExperience}
            setRating={handleRatingChange}
          />
        </div>
        {errors.rating && <span className={styles.error}>{errors.rating}</span>}
        <div className={styles.reviewInput}>
          <label className={styles.reviewTitle} htmlFor="review-title">{isArabic ? "عنوان التقييم" : "Title your review"}<span className={styles.asterisk}> *</span> </label>
          <input
            type="text"
            id="review-title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder={isArabic ? "ما هو الشيء الأكثر أهمية الذي يجب معرفته؟" : "What's most important to know?"}
            required
          />
          {errors.reviewTitle && <span className={styles.error}>{errors.reviewTitle}</span>}
        </div>
        <div className={styles.reviewInput}>
          <label className={styles.reviewBody} htmlFor="review-body">{isArabic ? "اكتب تقييمك" : "Write your review"} <span className={styles.asterisk}> *</span> </label>
          <textarea
            id="review-body"
            value={reviewBody}
            onChange={(e) => setReviewBody(e.target.value)}
            placeholder= {isArabic ? "ما الذي يعجبك أو لا يعجبك؟" : "What you like or dislike?"}
            required
          ></textarea>
           {errors.reviewBody && <span className={styles.error}>{errors.reviewBody}</span>}
        </div>
     
      </div>
      
    </div>
    </div>

<div className={styles.footer}>
    <div className={styles.btn} style={{backgroundColor: isFormComplete ? "#247A81" :""}} onClick={handleSubmitReview}>{isArabic ? "إرسال" : "Submit"}</div>
   </div>
   <div className={styles.AddReviewsSuccessPopup}>
   {isShowSuccessPopup && <AddReviewsSuccessPopup/>}
   </div>
   </div>
</>
  );
};

export default ReviewForm;

