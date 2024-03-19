'use client'
import React,{useEffect, useState} from 'react';
import { useRouter} from 'next/navigation';
import styles from './CouponInfo.module.scss'
import { useCountry } from '@/context/contryDetails';

export default function CouponInfo({setCouponBannerData})  {
  const router = useRouter();
  const [couponBanner, setCouponBanner] = useState({});
  const { selectedCountry = {} } = useCountry();
  useEffect(()=>{
    getCouponData();
  },[])

  const getCouponData = async() =>{
    const getCouponResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/cms/coupon-banner?country=${selectedCountry.id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    const couponRespData = await getCouponResp.json();
    if(couponRespData && couponRespData.length > 0 ){
      setCouponBanner(couponRespData[0])
      if (setCouponBannerData){
        setCouponBannerData(couponRespData[0]);
      }
    }
  
  }

  
  return (
    <div className={styles.coupon} onClick={()=>window.location.href = couponBanner.redirectionLink} id='coupon-container'>
    <p>{couponBanner === undefined ? null : couponBanner.bannerText}</p>
    {
      couponBanner === undefined ? null : <button >{couponBanner === undefined ? null : couponBanner.buttonText} </button>
    }
 </div>
  )
}







