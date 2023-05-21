'use client';
import styles from './coupon-code.module.scss';
const Input = ({onInputChange={},type="text",fieldName="",value="",placeHolder="",isError="",errorMsg="",isDisabled="",style={}}) => {
  return(
      <div className={styles.inputWrapper} style={...style}>
          <div className={styles.inputContainer}>
              <input type={type} id={fieldName} name={fieldName} autocomplete="off" value={value} onChange={(e)=>onInputChange(e,fieldName)}  disabled={isDisabled}/>
              <label className={styles.placeholderText}>
                  <div className={styles.text}>{placeHolder}</div>
              </label>
          </div>
       {isError && <span className={styles.errorMsg}>{errorMsg}</span>}
       </div>
     
  )
}
export default function CouponCode() {



  
      return (
        <div className={styles.couponCodeWrapper}>
            <div>Discount code or Gift card</div>
            <div className={styles.couponCodeContainer}>
                <Input type="text" fieldName="couponCode" placeHolder="Enter coupon code" style={{width:'49%'}}  />
                <div className={styles.applyBtn}> Apply</div>
            </div>
        </div>
      )
    }
    