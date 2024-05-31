'use Client';

import React,{useState} from 'react'
// import { useAddressData } from "@/context/address";
import styles from './delivery-address.module.scss'
import { useLanguage } from '@/context/languageDetails';

const DeliveryAddress = ({shippingAddress}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


    const {firstName="",
     lastName="" , 
     mobNumber="" ,
      apartment="",
       address="",
       country="",city="",postalCode=""} = shippingAddress || {}
    const userName = firstName + " " +lastName;
    const addressTxt1 = apartment+ " " +address 
    const addressTxt2 = city+ " " + (postalCode ? ` ${postalCode}` : "") + " " +country;
  return (
    <div className={styles.deliveryAddress}> 
            <div className={styles.actionItem}>
                <div className={styles.headerTxt}>{isArabic ? "عنوان التوصيل" : "Delivery address"}</div>
            </div>
            <div className={styles.name}>{userName}</div>
            <div className={styles.txt}>{addressTxt1}</div>
            <div className={styles.txt}>{addressTxt2}</div>

            <div className={styles.txt}>Phone no : {mobNumber}</div>
        </div>
   
  )
}

export default DeliveryAddress