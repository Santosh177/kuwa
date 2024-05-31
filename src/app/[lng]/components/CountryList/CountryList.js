"use client"
import React, { useState } from "react";
import { useCountryList } from "@/context/countryList";
import styles from './country-list.module.scss';
import { useLanguage } from "@/context/languageDetails";






const CountryList = ({onSelectCountry={},onclose={}}) => {
    const countryList = useCountryList();
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return(

        <div className={styles.countryWrapper}>
                <div className={styles.backDrop} onClick={()=>onclose()}></div>
                <div className={styles.countryContainer}>
                    <img className={styles.closeIcon} src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_country.png" alt="close" onClick={()=>onclose()}/>
                    <div className={styles.countryTitle}>{isArabic ? "" : "Select Country"}</div>
                    <div className={styles.countryListItem}>
                        {
                            countryList.map((data,index)=>{
                                return(
                                    <>
                                    <div className={styles.listItem} onClick={()=>onSelectCountry(data)} key={index}>    
                                        <img className={styles.flagIcon} src={data.flagIcon} alt="flag"/>
                                        <div className={styles.item} onClick={()=>onSelectCountry(data)}>{isArabic ? data.shortNameArabic : data.shortName}</div>
                                    </div>
                                    <div className={styles.horizontalLine}></div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
        </div>
    )
}

export default CountryList; 


