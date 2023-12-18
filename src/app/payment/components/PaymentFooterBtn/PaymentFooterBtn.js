
import { useEffect } from 'react';
import styles from './payment-footer-btn.module.scss';

export default function PatmentFooterBtn({btnName="",totalPrice="",onProceed={}, isEnable = false}) {


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
                    <div className={styles.subTxt}>View price details</div>
                </div>
                <div className={styles.paymentBtn}>
                  <div className={styles.applePayBtn}>
                    <div>Pay with</div>
                    <img className={styles.appleLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/image+122.png' alt='apple-pay'/>
                  </div>
                  <div className={[styles.btn,(isEnable)?styles.btn_active:""].join(" ")} onClick={()=>onProceed()}>{btnName}</div>
                </div>
             
            </div>
        </div>
      )
    }
    