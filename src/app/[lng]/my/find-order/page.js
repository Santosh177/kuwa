'use client';
import React, { useState } from 'react';
import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import FindMyOrder from './FindMyOrder/FindMyOrder';
import FindMyOrderInfo from './FindMyOrderInfo/FindMyOrderInfo';
import OrderDetails from '../Component/OrderView/OrderDetails/OrderDetails';
import styles from './page.module.scss';
import { useLanguage } from '@/context/languageDetails';


export default function MyOrders({}) {
  const [showOrderInfo, setShowOrderInfo] = useState(true); 

  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();




  

  return (
    <>
      <PageHeader headerName={isArabic ? "ابحث عن طلبي" : "Find My Order"} />
      <FindMyOrder setShowOrderInfo={setShowOrderInfo}/>
      
     {showOrderInfo && <><div className={styles.headerTxt}>{isArabic ? "تفاصيل الطلب" : "OrderDetails"}</div>
      <FindMyOrderInfo /></>}
      {/* <OrderDetails /> */}
      
    </>

  )
}
