'use client';
import React from 'react'
import styles from "./explore-category.module.scss"
import { useLanguage } from '@/context/languageDetails';

const ExploreCategory = ({exploreCategory}) => {
    console.log("exploreCategory",exploreCategory)
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
  return (
    <>
    
    {/* {exploreCategory && exploreCategory.length>0 && 
    <div className={styles.categoryHeader}>Explore <span>Categories</span></div>} */}
    {/* <div className={styles.categoryContent}> */}
   {exploreCategory && exploreCategory .length > 0 &&  <div className={styles.categoryContainer} >
      <div className={styles.categorySection}>
        {
          exploreCategory.map((data,index)=>{
            return(
                // <div className={styles.categorySection}>
                <div className={styles.category} onClick={()=>window.location.href =`/collections?category=${isArabic ? encodeURIComponent(data.healthGoalArabic):encodeURIComponent(data.healthGoal)}}`}>
                    <div className={styles.categoryImg}>
                        <img src={data.icon}></img>
                    </div>
                    <div className={styles.categoryName}>{isArabic ? data.healthGoalArabic : data.healthGoal}</div>
                </div>
                // </div>
            )
           
          })  
        }
        </div>

    </div>}
    {/* </div> */}
    
    </>
   
  )
}

export default ExploreCategory