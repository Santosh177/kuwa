import React from 'react'
import styles from './add-reviews-success-popup.module.scss'
import { useLanguage } from '@/context/languageDetails'

const AddReviewsSuccessPopup = () => {
    const {listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage} = useLanguage();
  return (
    <div className={styles.ReviewsOverlay}>
    <div className={styles.ReviewsSuccessPopup}>
        <div className={styles.content}>
      
         <div className={styles.rightArrowImg}><img src='https://d25uasl7utydze.cloudfront.net/assets/check_uncheck.svg'></img></div>
         <div className={styles.title}>{isArabic ? "" : "Review submitted - Thank you!"}</div>
            <div className={styles.txt}>{isArabic ? "": "We are processing your review. This might take several days, so we appreciate your patience. We will email you when this is complete."}</div>
            <div className={styles.btn} onClick={()=> window.location.href = '/'}>{isArabic ? " حسنًا" : "Back to homepage"}</div>
        </div>

    </div>

    </div>
  )
}

export default AddReviewsSuccessPopup