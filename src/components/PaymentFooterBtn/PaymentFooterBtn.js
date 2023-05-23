
import styles from './payment-footer-btn.module.scss';

export default function PatmentFooterBtn({btnName="",totalPrice="",onProceed={}}) {


  
      return (
        <div className={styles.paymentFooterbtn} >
            <div className={styles.paymentFooterBtnContainer}>
                <div className={styles.paymentInfo}>
                    <div className={styles.txt}>Total : <span className={styles.price}>{totalPrice}</span></div>
                    <div className={styles.subTxt}>View price details</div>
                </div>
                <div className={styles.btn} onClick={()=>onProceed()}>{btnName}</div>
            </div>
        </div>
      )
    }
    