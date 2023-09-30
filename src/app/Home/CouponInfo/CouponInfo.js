'use client'
import React,{useEffect, useState} from 'react';
import { useRouter} from 'next/navigation';
import styles from './CouponInfo.module.scss'

export default function  CouponInfo()  {
  const router = useRouter();
  const [couponBanner, setCouponBanner] = useState({});

  useEffect(()=>{
    getCouponData();
  },[])

  const getCouponData = async() =>{
    const getCouponResp = await fetch(`https://api.kuwa.bevaleo.dev/cms/coupon-banner`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
    })
    const couponRespData = await getCouponResp.json();
    if(couponRespData && couponRespData.length > 0 ){
      setCouponBanner(couponRespData[0])
    }
  
  }

  
  return (
    <div className={styles.coupon} onClick={()=>window.location.href = couponBanner.redirectionLink}>
    <p>{couponBanner === undefined ? null : couponBanner.bannerText}</p>
    {
      couponBanner === undefined ? null : <button >{couponBanner === undefined ? null : couponBanner.buttonText} </button>
    }
 </div>
  )
}







