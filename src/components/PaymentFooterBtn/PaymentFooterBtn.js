
import styles from './payment-footer-btn.module.scss';

export default function PatmentFooterBtn({isApplePaySession=false,btnName="",totalPrice="",onProceed={},onHandleApplePay={},showViewDetails, prePaidDiscount="",isAllOutOfStockProducts}) {

  
      return (
        <div className={styles.paymentFooterbtn} >
            <div className={styles.paymentFooterBtnContainer} style={(!isApplePaySession)?{justifyContent:'center'}:{}}>
                <div className={styles.paymentInfo}>
                {isAllOutOfStockProducts ? "" :     <div className={styles.txt}>Total : <span className={styles.price}>{(totalPrice != undefined)?totalPrice:""}</span></div>}
                    <div className={styles.subTxt} onClick={()=>showViewDetails()}>View price details</div>
                </div>
                <div className={styles.paymentBtnContainer}>
                  { isApplePaySession  &&
                   <div  className={styles.applePayContainer} style={{cursor:'pointer',height:'48px',}} onClick={()=>onHandleApplePay()}>
                    <img className={styles.applePayImg} style={{height:'100%'}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/default.png' alt='apple-pay' />
                  {prePaidDiscount > 0 && <span className={styles.prepaidDiscount}>Extra {prePaidDiscount}% Off</span>}
                  </div>}
                  { 
                
                   }
                  <div className={[styles.btn,(!isApplePaySession)?styles.btnTwo:""].join(" ")}   onClick={()=>onProceed()}>{btnName}</div>
                </div>
            </div>
        </div>
      )
    }
    