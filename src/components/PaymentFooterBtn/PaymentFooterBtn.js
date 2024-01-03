
import styles from './payment-footer-btn.module.scss';

export default function PatmentFooterBtn({btnName="",totalPrice="",onProceed={},showViewDetails}) {


  
      return (
        <div className={styles.paymentFooterbtn} >
            <div className={styles.paymentFooterBtnContainer}>
                <div className={styles.paymentInfo}>
                    <div className={styles.txt}>Total : <span className={styles.price}>{(totalPrice != undefined)?totalPrice:""}</span></div>
                    <div className={styles.subTxt} onClick={()=>showViewDetails()}>View price details</div>
                </div>
                <div className={styles.btn} onClick={()=>onProceed()}>{btnName}</div>
            </div>
        </div>
      )
    }
    