'use Client';
import React from 'react';
import styles from './account-details.module.scss';
import Input from "@/components/Input/Input";

const AccountDetails = () => {
  return (
    <div className={styles.accountContainer}>
    <div className={styles.headerTxt}>Complete creating an account</div>
    <div className={styles.container}>
        <div className={styles.icon}>
       
           <img src="https://d25uasl7utydze.cloudfront.net/assets/fast.svg"/> 
           <span>Faster Checkouts</span>
        </div>
        <div className={styles.icon}>
           
           <img src="https://d25uasl7utydze.cloudfront.net/assets/truck%20(1).svg"/> 
           <span>Order Tracking</span>
        </div>
        <div className={styles.icon}>
            
           <img src="https://d25uasl7utydze.cloudfront.net/assets/offer.svg"/> 
           <span>Exclusive Offers</span>
        </div>

    </div>
    <div className={styles.personalDetails}>
        <div className={styles.inputEmail}>
      <Input type="email" fieldName="email" placeHolder="Email ID (ex. abc@gmail.com)*"/>
      </div>
      <div className={styles.inputPassword}>
        <Input type='password' placeHolder='Create Password'/>
        <Input type='password' placeHolder='Confirm Password'/>
      </div>
   
    <div className={styles.btn}>Create Account</div>     
    </div>    

    </div>
  )
}

export default AccountDetails