'use client'
import React,{useEffect, useState} from 'react';
import { useRouter} from 'next/navigation';
import styles from './CouponInfo.module.scss'
import { useCountry } from '@/context/contryDetails';
import { useLanguage } from '@/context/languageDetails';

export default function CouponInfo({couponBannerData})  {
  const router = useRouter();
  // const [couponBanner, setCouponBanner] = useState({});
  const { selectedCountry = {} } = useCountry();
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


  return (
    <div className={styles.coupon} onClick={()=>window.location.href = couponBannerData.redirectionLink} id='coupon-container'>
    <p>{couponBannerData === undefined ? null : (isArabic ? couponBannerData.bannerTextArabic:  couponBannerData.bannerText)}</p>
    {
      couponBannerData === undefined ? null : <button  className={`${styles.couponBtn} ${isArabic ? styles['couponBtn-ar'] : styles['couponBtn-en']}`} >{couponBannerData === undefined ? null : (isArabic ? couponBannerData.buttonTextArabic :  couponBannerData.buttonText)} </button>
    }
 </div>
  )
}







