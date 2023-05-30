"use client"
import React, { useState } from "react";
import { useCountryList } from "@/context/countryList";
import styles from './country-list.module.scss';






const CountryList = ({onSelectCountry={}}) => {
    const countryList = useCountryList();
    return(

        <div className={styles.countryWrapper}>
                <div className={styles.backDrop} onClick={()=>onclose()}></div>
                <div className={styles.countryContainer}>
                    <img className={styles.closeIcon} src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_country.png" alt="close"/>
                    <div className={styles.countryTitle}>Select Country</div>
                    <div className={styles.countryListItem}>
                        {
                            countryList.map((data,index)=>{
                                return(
                                    <>
                                
                                    <div className={styles.listItem}>    
                                        <img className={styles.flagIcon} src="https://d2co62zyg9wi44.cloudfront.net/media/country_United%20Arab%20Emirates_1/Flag_UAE_-_Square.png" alt="flag"/>
                                        <div className={styles.item} onClick={()=>onSelectCountry(data)}>{data.name}</div>
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


