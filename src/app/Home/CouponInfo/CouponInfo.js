'use client'
import React,{useEffect, useState} from 'react';
import { useRouter} from 'next/navigation';
import styles from './CouponInfo.module.scss'
import { useCountry } from '@/context/contryDetails';

export default function CouponInfo({couponBannerData})  {
  const router = useRouter();
  // const [couponBanner, setCouponBanner] = useState({});
  const { selectedCountry = {} } = useCountry();
  // useEffect(()=>{
  //   getCouponData();
  // },[])

  // const getCouponData = async() =>{
  //   const getCouponResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/cms/coupon-banner?country=${selectedCountry.id}`, {
  //     method: 'GET',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     }
  //   })
  //   const couponRespData = await getCouponResp.json();
  //   if(couponRespData && couponRespData.length > 0 ){
  //     setCouponBannerData(couponRespData[0])
  //     if (setCouponBannerData){
  //       setCouponBannerData(couponRespData[0]);
  //     }
  //   }
  
  // }

  
  return (
    <div className={styles.coupon} onClick={()=>window.location.href = couponBannerData.redirectionLink} id='coupon-container'>
    <p>{couponBannerData === undefined ? null : couponBannerData.bannerText}</p>
    {
      couponBannerData === undefined ? null : <button >{couponBannerData === undefined ? null : couponBannerData.buttonText} </button>
    }
 </div>
  )
}







