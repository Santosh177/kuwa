
import { useEffect } from 'react';
import styles from './payment-footer-btn.module.scss';
import { usePaymentPageData } from '@/context/payment';
import { useLanguage } from '@/context/languageDetails';

export default function PatmentFooterBtn({paymentMethodConfig={},onPayment={}, btnName="",totalPrice="",onProceed={}, isEnable = false,showViewDetails,prePaidDiscount="",extraDiscount,selectedPaymentMethod,setExtraDiscount,currency,codCharge,data,customFee}) {
const {discountAmount="",subTotal=""} = data || {}
const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const isApplePay =  paymentMethodConfig['applePay']['isEnable'];
  const { setSelectedPaymentMethod} = usePaymentPageData();
  useEffect(()=>{
    try {
      if(window && window.fcWidget){
        window.fcWidget.hide()
      }
    } catch (error) {
      
    }
    
  },[])
 
  
  useEffect(()=>{
    if(prePaidDiscount && (selectedPaymentMethod == "TAP" || selectedPaymentMethod == "TABBY" || selectedPaymentMethod == "CHECKOUT_CARD" || selectedPaymentMethod == "TAMARA" || selectedPaymentMethod == "APPLE_PAY" )){
      if(discountAmount<0){
      setExtraDiscount && setExtraDiscount(parseFloat((((subTotal) * prePaidDiscount) / 100).toFixed(2)))
      codCharge=0;
      }
      else{
        setExtraDiscount && setExtraDiscount(parseFloat((((subTotal-discountAmount) * prePaidDiscount)/100).toFixed(2)));
      }
    }
    else{
      setExtraDiscount && setExtraDiscount(0)
    }
   
},[prePaidDiscount,selectedPaymentMethod,discountAmount])
  const finalTotalAmount = (extraDiscount ? totalPrice - extraDiscount : ((codCharge > 0 && selectedPaymentMethod=="COD") ? totalPrice + codCharge : totalPrice))+ customFee
  
      return (
        <div className={styles.paymentFooterbtn} >
            <div className={styles.paymentFooterBtnContainer}>
                <div className={styles.paymentInfo}>
                    <div className={styles.txt}>{isArabic ? "المجموع" :"Total"} : <span className={styles.price}>{currency + " " +parseFloat(finalTotalAmount).toFixed(2)}</span></div>
                   <div className={styles.subTxt} onClick={()=>showViewDetails()}>View price details</div> 
                </div>
                <div className={styles.paymentBtn}>
                 {isApplePay && <div className={styles.applePayBtn} onClick={()=>{setSelectedPaymentMethod('APPLE_PAY');onProceed("APPLE_PAY")}}>
                    <div>Pay with</div>
                    <img className={styles.appleLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/image+122.png' alt='apple-pay'/>
                    { isApplePay && prePaidDiscount > 0 && <span className={styles.prepaidDiscount}>Extra {prePaidDiscount}% Off</span>}
                  </div>
                  }
                   
               
                  <div className={[styles.btn,(isEnable)?styles.btn_active:""].join(" ")} onClick={()=>onProceed()}>{btnName}</div>
                </div>
             
            </div>
        </div>
      )
    }
    
