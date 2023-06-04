
import styles from './payment-footer-btn.module.scss';

export default function PatmentFooterBtn({btnName="",totalPrice="",onProceed={}, isEnable = false}) {


  
      return (
        <div className={styles.paymentFooterbtn} >
            <div className={styles.paymentFooterBtnContainer}>
                <div className={styles.paymentInfo}>
                    <div className={styles.txt}>Total : <span className={styles.price}>{totalPrice}</span></div>
                    <div className={styles.subTxt}>View price details</div>
                </div>
                <div className={[styles.btn,(isEnable)?styles.btn_active:""].join(" ")} onClick={()=>onProceed()}>{btnName}</div>
            </div>
        </div>
      )
    }
    