'use client'
import React,{useState} from 'react';
import { useRouter} from 'next/navigation';
import styles from './CouponInfo.module.scss'

export default function  CouponInfo({bannerText,buttonText,redirectionLink})  {
  const router = useRouter();
  
  return (
    <div className={styles.coupon} onClick={()=>router.push(redirectionLink)}>
    <p>{bannerText}</p>
    <button >{buttonText} </button>
 </div>
  )
}







