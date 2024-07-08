
import React from 'react'
import style from './product-rating.module.scss'
import { useLanguage } from '@/context/languageDetails'
import { useAuth } from '@/context/userDetail'

const ProductRating = ({rating,productId,images,title}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    const {isLogin=false, userData={}} = useAuth();
  
    const {
        overAllRating="",
        totalRatingCount = "",
        deliveryExperience = "",
        easeOfUse = "",
        effectiveness = "",
        qualityOfSupplements = "",
        valueForMoney = ""
      } = rating || {}
      console.log("ratingSection",rating)
      const ratingsData = [
            { label: isArabic ? "جودة المكملات الغذائية" : 'Quality of Supplements', rating: qualityOfSupplements },
            { label: isArabic ? "الفعالية" : 'Effectiveness', rating: effectiveness},
            { label: isArabic ? "سهولة الاستخدام" : 'Ease of Use', rating: easeOfUse },
            { label: isArabic ? "القيمة مقابل المال" : 'Value for Money', rating: valueForMoney },
            { label: isArabic ? "تجربة التوصيل" : 'Delivery Experience', rating: deliveryExperience },
          ];
        
      const getStarImage = (index) => {
            const rating = overAllRating - index;
            if (rating >= 0.75) {
                return "https://d25uasl7utydze.cloudfront.net/assets/star-filled.svg"; 
            } else if (rating >= 0.25) {
                return "https://d25uasl7utydze.cloudfront.net/assets/star-halft.svg"; 
            } else {
                return "https://d25uasl7utydze.cloudfront.net/assets/star.svg"; 
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
      
      const writeReview = () =>{

        const encodedImages = encodeURIComponent(JSON.stringify(images));
        window.location.href = isLogin ?( `/reviews-ratings?productId=${productId}&productName=${title}&images=${encodedImages}` ) : '/login?review=true' 
      }
      
      let isShowRating = true;
      isShowRating = !Object.entries(rating).every(([key, value]) => isNaN(value) || value === 0);

      

  return (
    <div className={style.ratingContainer}>

       {Object.keys(rating).length >0 && isShowRating && <div className={style.header}>
        <div className={style.Title}>{isArabic ? "التقييمات والمراجعات" : "Reviews and ratings"}</div>
        <div className={style.totalRatingDiv}>
        <div className={style.totalRating}>{overAllRating}</div>
        <div className={style.starImage}>
        {renderStars()}
        </div>
        </div>
        <div className={style.totalRatingCount}>
        {isArabic ? `بناءً على ${totalRatingCount} تقييم` : `Based on ${totalRatingCount} ratings`}
        </div>
        </div>}
        {Object.keys(rating).length >0 && ratingsData && ratingsData.length > 0 && isShowRating && ratingsData.map((data,index)=>(
            <div key={index} className={style.ratingRow}>
                <div className={style.ratingHeading}>
            <div className={style.ratingLabel}>{data.label}</div>
            <div className={style.ratingValue}>{data.rating}</div>
            </div>
            <div className={style.ratingBarContainer}>
              <div
                className={style.ratingBar}
                style={{ width: `${(data.rating / 5) * 100}%` }}
              ></div>

            </div>
          </div>
        ))}

        <div className={style.btnDiv} onClick={writeReview}>
            <div className={style.btn}>
                <img src="https://d25uasl7utydze.cloudfront.net/assets/writing.svg"/>
                <span>{isArabic ? "اكتب تقييمك" : "Write a review"}</span>
            </div>
        </div>
    </div>
  )
}

export default ProductRating