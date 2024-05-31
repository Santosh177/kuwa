'use client';
import { useState } from 'react';
import { usePaymentPageData } from '@/context/payment';
import { createCouponPayload } from '@/utils';
import Loader from '@/app/[lng]/components/Loader/Loader';
import styles from './coupon-code.module.scss';
import { useLanguage } from '@/context/languageDetails';

const Input = ({onInputChange={},type="text",fieldName="",value="",placeHolder="",isError="",errorMsg="",isDisabled="",style={}}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
  
  return(
      <div className={styles.inputWrapper} style={{...style}}>
          <div className={styles.inputContainer}>
              <input className={`${styles.inputCouponCode} ${isArabic ? styles['inputCouponCode-ar'] : styles['inputCouponCode-en']}`} type={type} id={fieldName} name={fieldName}  value={value} onChange={(e)=>onInputChange(e,fieldName)}  disabled={isDisabled}/>
              <label className={styles.placeholderText}>
                {value?"":  <div className={`${styles.text} ${isArabic ? styles['text-ar'] : styles['text-en']}`}>{placeHolder}</div>}
              </label>
          </div>
       {isError && <span className={styles.errorMsg}>{errorMsg}</span>}
       </div>
     
  )
}




export default function CouponCode() {
     const {cartItems=[], setCouponCodeData , couponCodeData} = usePaymentPageData();
     const [couponCode , setCouponCode] = useState("");
     const [isLoading , setIsLoading] = useState(false);
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    
     const onCouponApply = async() => {
      if(!(Object.keys(couponCodeData).length>0) || couponCodeData.discount ==0 ){
        setIsLoading(true)
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
          setIsLoading(false)
          if(couponApiResp && couponApiResp.discount && couponApiResp.discount > 0){
            setCouponCodeData(couponApiResp);
          }else{
            setCouponCodeData(couponApiResp);
          }
        }
     }

      return (
        <>
        <div className={styles.couponCodeWrapper}>
            <div className={styles.headerTxt}>{isArabic ? "كود الخصم أو بطاقة الهدية" : "Discount Code or Gift Card"}</div>
            <div className={styles.couponCodeContainer}>
                <div style={{width:'100%',position:'relative'}}>
                  <Input  type="text" fieldName="couponCode" placeHolder={isArabic ? "أدخل كود القسيمة" : "Enter coupon code"} value={couponCode} onInputChange={(e)=>{setCouponCode(e.target.value)}}  isDisabled={(couponCodeData.reason== "Applied Successfully" )}/>
                  {couponCode ? <img onClick={()=>{setCouponCodeData("");setCouponCode("")}} className={`${styles.removeIcon} ${isArabic ? styles['removeIcon-ar'] : styles['removeIcon-en']}`} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon.png' alt='close'/>:<img className={`${styles.removeInActiveIcon} ${isArabic ? styles['removeInActiveIcon-ar'] : styles['removeInActiveIcon-en']}`} src="https://d25uasl7utydze.cloudfront.net/assets/cross_icon%20(1).svg"/>}
                </div>
                <div className={styles.applyBtn} onClick={onCouponApply}> {isArabic ? "تطبيق" : "Apply"}</div>
            </div>
           {<div className={styles.couponMsg} style={{color:((couponCodeData.reason== "Applied Successfully" )?'green':'red')}}>{isArabic ? couponCodeData.couponAppliedAr : couponCodeData.couponApplied || ""}</div>}
        </div>
        <Loader isShow={isLoading} />
        </>
      )
    }
    