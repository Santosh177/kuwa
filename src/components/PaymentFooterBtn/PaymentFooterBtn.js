
import styles from './payment-footer-btn.module.scss';

export default function PatmentFooterBtn({btnName="",totalPrice="",onProceed={},onHandleApplePay={}}) {


  
      return (
        <div className={styles.paymentFooterbtn} >
            <div className={styles.paymentFooterBtnContainer}>
                <div className={styles.paymentInfo}>
                    <div className={styles.txt}>Total : <span className={styles.price}>{(totalPrice != undefined)?totalPrice:""}</span></div>
                    <div className={styles.subTxt}>View price details</div>
                </div>
                <div style={{cursor:'pointer',height:'48px'}} onClick={()=>onHandleApplePay()}>
                  <img style={{height:'100%',width:'100%'}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/default.png' alt='apple-pay' />
                </div>
                <div className={styles.btn} onClick={()=>onProceed()}>{btnName}</div>
            </div>
        </div>
      )
    }
    