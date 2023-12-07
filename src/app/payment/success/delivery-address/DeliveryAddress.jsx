'use Client';

import React,{useState} from 'react'
import { useAddressData } from "@/context/address";
import styles from './delivery-address.module.scss'

const DeliveryAddress = ({useAddressData}) => {
    const { selectedAddress ={}} = useAddressData();
    console.log("selectedAddress")
    const { firstName="", lastName="" , mobNumber="" , apartment="", address="",country=""} = selectedAddress || {};
    const userName = firstName + " " +lastName;
    const addressTxt = apartment+ " " +address + " " +country;
  return (
    <div className={styles.deliveryAddress}> 
            <div className={styles.actionItem}>
                <div className={styles.headerTxt}>Shipping address</div>
                {/* <div className={styles.changeAction}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                    <div className={styles.changeTxt} onClick={()=>router.push('/address/select-address')}>Change</div>
                </div> */}
            </div>
            <div className={styles.name}>{userName}</div>
            <div className={styles.txt}>{addressTxt}</div>
            <div className={styles.txt}>Phone no : {mobNumber}</div>
        </div>
  )
}

export default DeliveryAddress