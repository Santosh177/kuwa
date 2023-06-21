'use client'
import React,{useState} from 'react';
import { useRouter} from 'next/navigation';
import styles from './CouponInfo.module.scss'

export default function  CouponInfo({couponBanner})  {
  // console.log("bbbbbbb",bannerText)
  const router = useRouter();
  
  return (
    <div className={styles.coupon} onClick={()=>router.push(couponBanner.redirectionLink)}>
    <p>{couponBanner.bannerText}</p>
    <button >{couponBanner.buttonText} </button>
 </div>
  )
}







