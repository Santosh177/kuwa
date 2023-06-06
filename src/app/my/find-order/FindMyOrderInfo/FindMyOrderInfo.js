'use client';
import { useState } from 'react';
import styles from './find-myorder-info.module.scss';

export default  function FindMyOrderInfo({}) {

  

  return (
    <>
        <div className={styles.findMyOrderInfo}>
            <img className={styles.findMyOrderIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/find_my_order.png' alt='find-my-order'/>
            <div className={styles.orderDesc}>Your order details will appear here. Enter Order ID and track your Order</div>
        </div>
    </>
  )
}
