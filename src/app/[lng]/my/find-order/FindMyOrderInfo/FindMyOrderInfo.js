'use client';
import { useState } from 'react';
import styles from './find-myorder-info.module.scss';
import { useLanguage } from '@/context/languageDetails';

export default  function FindMyOrderInfo({}) {

  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


  return (
    <>
        <div className={styles.findMyOrderInfo}>
            <img className={styles.findMyOrderIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/find_my_order.png' alt='find-my-order'/>
            <div className={styles.orderDesc}>{isArabic ? "تفاصيل طلبك ستظهر هنا. أدخل رقم الطلب لتتبع طلبك" : "Your order details will appear here. Enter Order ID and track your Order"}</div>
        </div>
    </>
  )
}
