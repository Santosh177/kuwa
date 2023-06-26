'use client'
import React,{useState} from 'react';
import { useRouter} from 'next/navigation';
import styles from './CouponInfo.module.scss'

export default function  CouponInfo({couponBanner})  {
  // console.log("bbbbbbb",bannerText)
  const router = useRouter();
  
  return (
    <div className={styles.coupon} onClick={()=>router.push(couponBanner.redirectionLink)}>
    <p>{couponBanner === undefined ? null : couponBanner.bannerText}</p>
    <button >{couponBanner === undefined ? null : couponBanner.buttonText} </button>
 </div>
  )
}







