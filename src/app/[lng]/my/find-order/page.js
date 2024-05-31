'use client';
import React, { useState } from 'react';
import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import FindMyOrder from './FindMyOrder/FindMyOrder';
import FindMyOrderInfo from './FindMyOrderInfo/FindMyOrderInfo';
import OrderDetails from '../Component/OrderView/OrderDetails/OrderDetails';
import styles from './page.module.scss';


export default function MyOrders({}) {
  const [showOrderInfo, setShowOrderInfo] = useState(true);



  

  return (
    <>
      <PageHeader headerName="Find My Order" />
      <FindMyOrder setShowOrderInfo={setShowOrderInfo}/>
      
     {showOrderInfo && <><div className={styles.headerTxt}>OrderDetails</div>
      <FindMyOrderInfo /></>}
      {/* <OrderDetails /> */}
      
    </>

  )
}
