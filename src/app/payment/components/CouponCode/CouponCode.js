'use client';
import { useState } from 'react';
import { usePaymentPageData } from '@/context/payment';
import { createCouponPayload } from '@/utils';
import styles from './coupon-code.module.scss';

const Input = ({onInputChange={},type="text",fieldName="",value="",placeHolder="",isError="",errorMsg="",isDisabled="",style={}}) => {
  return(
      <div className={styles.inputWrapper} style={...style}>
          <div className={styles.inputContainer}>
              <input type={type} id={fieldName} name={fieldName}  value={value} onChange={(e)=>onInputChange(e,fieldName)}  disabled={isDisabled}/>
              <label className={styles.placeholderText}>
                  <div className={styles.text}>{placeHolder}</div>
              </label>
          </div>
       {isError && <span className={styles.errorMsg}>{errorMsg}</span>}
       </div>
     
  )
}




export default function CouponCode() {
     const {cartItems=[], setCouponCodeData , couponCodeData} = usePaymentPageData();
     const [couponCode , setCouponCode] = useState("");


     const onCouponApply = async() => {
      if(!(Object.keys(couponCodeData).length>0)){
        const data = await createCouponPayload(cartItems);
          const couponPayload = {
            "couponCode": couponCode,
            "products": data
        }
          const res = await fetch('/api/apply-coupon', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(couponPayload)
          })
          const couponApiResp = await res.json();
          if(couponApiResp && couponApiResp.discount && couponApiResp.discount > 0){
            setCouponCodeData(couponApiResp);
          }else{
            setCouponCodeData(couponApiResp);
          }
        }
     }

      return (
        <div className={styles.couponCodeWrapper}>
            <div className={styles.headerTxt}>Discount code or Gift card</div>
            <div className={styles.couponCodeContainer}>
                <div style={{width:'100%',position:'relative'}}>
                  <Input type="text" fieldName="couponCode" placeHolder="Enter coupon code" value={couponCode} onInputChange={(e)=>{setCouponCode(e.target.value)}}  isDisabled={(couponCodeData.reason== "Applied Successfully" )}/>
                  {Object.keys(couponCodeData).length>0 && <img onClick={()=>{setCouponCodeData("");setCouponCode("")}} className={styles.removeIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon.png' alt='close'/>}
                </div>
                <div className={styles.applyBtn} onClick={onCouponApply}> Apply</div>
            </div>
           {<div className={styles.couponMsg} style={{color:((couponCodeData.reason== "Applied Successfully" )?'green':'red')}}>{couponCodeData.couponApplied || ""}</div>}
        </div>
      )
    }
    