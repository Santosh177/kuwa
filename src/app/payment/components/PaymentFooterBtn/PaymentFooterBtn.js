'use client';
import styles from './payment-footer-btn.module.scss';

export default function PatmentFooterBtn({onProceed={}}) {



  
      return (
        <div className={styles.paymentFooterbtn}>
            <div className={styles.paymentFooterBtnContainer} >
                <div>
                    <div className={styles.txt}>Total : <span className={styles.price}>AED 350</span></div>
                    <div className={styles.subTxt}>View price details</div>
                </div>
                <div className={styles.btn} onClick={()=>onProceed()}>Proceed to pay</div>
            </div>
        </div>
      )
    }
    