'use client';
import { useState } from 'react';
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

     const [couponCode , setCouponCode] = useState("")



     console.log("couponCode",couponCode)

     const onCouponApply = () => {

     }
  
      return (
        <div className={styles.couponCodeWrapper}>
            <div className={styles.headerTxt}>Discount code or Gift card</div>
            <div className={styles.couponCodeContainer}>
                <div style={{width:'100%',position:'relative'}}>
                  <Input type="text" fieldName="couponCode" placeHolder="Enter coupon code" value={couponCode} onInputChange={(e,fieldName)=>{
console.log("e.taregt.value",e.target.value)
setCouponCode(e.target.value)
                  }
                      
                    }  />
                  <img onClick={()=>setCouponCode("")} className={styles.removeIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon.png' alt='close'/>
                </div>
                <div className={styles.applyBtn} onClick={onCouponApply}> Apply</div>
            </div>
            {/* <div className={styles.couponMsg}>Coupon Applied ! You get AED 30 OFF</div> */}
        </div>
      )
    }
    