'use client';
import { useState } from 'react';
import styles from './find-my-order.module.scss';

export default  function FindMyOrder({}) {

    const [ searchOrderId , setSearchOrderId ] = useState("")


    console.log("searchOrderIdsearchOrderId",searchOrderId)
  

  return (
    <>
    <div className={styles.findMyOrderWrapper}>
        <div className={styles.orderStatusTxt}>Order Status</div>
        <div className={styles.subTxt}>Enter your <span>'Order ID</span> to check the order status</div>
        <div className={styles.orderIdSearchContainer}>
            <div className={styles.orderIdInputContainer}>
                <input type='text' placeholder='Order ID' className={styles.orderIdInput} value={searchOrderId} onChange={(e)=>setSearchOrderId(e.target.value)} /> 
                {searchOrderId && <img onClick={()=>setSearchOrderId("")} className={styles.crossIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_find_my_order.png' alt='cross_icon'/>}
            </div>
            <div className={styles.findMyorderBtn}>Find my order</div>
        </div>
    </div>
    </>
  )
}
