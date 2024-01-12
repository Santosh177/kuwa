'use Client';

import React,{useState} from 'react'
// import { useAddressData } from "@/context/address";
import styles from './delivery-address.module.scss'

const DeliveryAddress = ({shippingAddress}) => {

    const {firstName="",
     lastName="" , 
     mobNumber="" ,
      apartment="",
       address="",
       country=""} = shippingAddress || {}
    const userName = firstName + " " +lastName;
    const addressTxt = apartment+ " " +address + " " +country;
  return (
    <div className={styles.deliveryAddress}> 
            <div className={styles.actionItem}>
                <div className={styles.headerTxt}>Delivery address</div>
            </div>
            <div className={styles.name}>{userName}</div>
            <div className={styles.txt}>{addressTxt}</div>
            <div className={styles.txt}>Phone no : {mobNumber}</div>
        </div>
   
  )
}

export default DeliveryAddress