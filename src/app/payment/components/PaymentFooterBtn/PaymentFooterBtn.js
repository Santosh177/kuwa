
import { useEffect } from 'react';
import styles from './payment-footer-btn.module.scss';
import { usePaymentPageData } from '@/context/payment';

export default function PatmentFooterBtn({paymentMethodConfig={},onPayment={}, btnName="",totalPrice="",onProceed={}, isEnable = false,showViewDetails}) {
  const isApplePay =  paymentMethodConfig['applePay']['isEnable'];
  useEffect(()=>{
    try {
      if(window && window.fcWidget){
        window.fcWidget.hide()
      }
    } catch (error) {
      
    }
    
  },[])

  
      return (
        <div className={styles.paymentFooterbtn} >
            <div className={styles.paymentFooterBtnContainer}>
                <div className={styles.paymentInfo}>
                    <div className={styles.txt}>Total : <span className={styles.price}>{totalPrice}</span></div>
                   <div className={styles.subTxt} onClick={()=>showViewDetails()}>View price details</div> 
                </div>
                <div className={styles.paymentBtn}>
                 {isApplePay && <div className={styles.applePayBtn} onClick={()=>{onProceed("APPLE_PAY")}}>
                    <div>Pay with</div>
                    <img className={styles.appleLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/image+122.png' alt='apple-pay'/>
                  </div>}
                  <div className={[styles.btn,(isEnable)?styles.btn_active:""].join(" ")} onClick={()=>onProceed()}>{btnName}</div>
                </div>
             
            </div>
        </div>
      )
    }
    