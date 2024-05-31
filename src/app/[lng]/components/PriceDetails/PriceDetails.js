
import { useEffect } from 'react';
import styles from './price-details.module.scss';
import { useLanguage } from '@/context/languageDetails';


const AmountSavedInfo = ({savedAmount=0,currency=""}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return(
        <div className={styles.amountSavedInfo}>{isArabic ? "لقد وفرت" : "You saved"} : {currency +" " + savedAmount}</div>
    )
}

const PriceDetails = ({data,isHidePriceDetails=false,selectedPaymentMethod,prePaidDiscount,extraDiscount,setExtraDiscount,myPrePaidDiscount,codCharge,myCodCharge}) => {
    const { cartItemCount="", subTotal="" , totalAmount="", savedAmount="", discountAmount="" , currency="",deliveryFees=0,prepaidDiscountAmount=0} = data || {}
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    useEffect(()=>{
        if(prePaidDiscount && (selectedPaymentMethod == "TAP" || selectedPaymentMethod == "TABBY" || selectedPaymentMethod == "CHECKOUT_CARD" || selectedPaymentMethod == "TAMARA" || selectedPaymentMethod == "APPLE_PAY" ) ){
            if(discountAmount<0){
                setExtraDiscount && setExtraDiscount(parseFloat((((subTotal) * prePaidDiscount)/100).toFixed(2)));
            codCharge=0;
            }
            else{
                setExtraDiscount && setExtraDiscount(parseFloat((((subTotal-discountAmount) * prePaidDiscount)/100).toFixed(2)));
            }
            
        }
        else{
           setExtraDiscount && setExtraDiscount(0);
           console.log("dbhah",codCharge)
        }
    },[selectedPaymentMethod,totalAmount,discountAmount]);
    console.log("selectedPaymentMethod",selectedPaymentMethod)
    const FinalTotalAmount = extraDiscount > 0 ? totalAmount-extraDiscount : ((codCharge > 0 && selectedPaymentMethod=="COD") ? totalAmount + codCharge : totalAmount )  ;

    return(
        <div className={styles.header}>
            <div classname={styles.headerTxt} >{isArabic ? "تفاصيل الأسعار" : "Price Details"}</div>
       <div className={styles.priceDetailsWrapper}>
       
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "السعر" : "Price"} ({cartItemCount} {isArabic ? "عناصر" : "items"})</div>
                <div className={styles.rowItemRightText}>{ currency +" " + subTotal }</div>
            </div>
           {!isHidePriceDetails && <>
            {discountAmount > 0 &&<div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Discount</div>
                <div  className={[styles.rowItemRightText,styles.discountAmount].join(" ")}>- {currency + " "+ discountAmount} </div>
            </div>}
            {(selectedPaymentMethod == "TAP" || selectedPaymentMethod == "TABBY" || selectedPaymentMethod == "CHECKOUT_CARD" || selectedPaymentMethod == "TAMARA" || selectedPaymentMethod == "APPLE_PAY" ) &&
               <div className={styles.rowItemContainer}>
               <div  className={`${styles.rowItemLeftText} ${styles.extraPayment}`}>{prePaidDiscount}{isArabic ? "خصم إضافي % عند الدفع أونلاين" : "% Extra Off on paying online applied"}</div>
               <div  className={[styles.rowItemRightText,styles.extradiscountAmount].join(" ")}>- {currency + " "+ extraDiscount} </div>
           </div>
            }
            {prepaidDiscountAmount>0 &&
            <div className={styles.rowItemContainer}>
            <div  className={`${styles.rowItemLeftText} ${styles.extraPayment}`}>{myPrePaidDiscount}{isArabic ? "خصم إضافي % عند الدفع أونلاين" : "% Extra Off on paying online applied"}</div>
            <div  className={[styles.rowItemRightText,styles.extradiscountAmount].join(" ")}>- {currency + " "+ parseFloat(prepaidDiscountAmount).toFixed(2)} </div>
        </div>}
        {(codCharge > 0 && selectedPaymentMethod == "COD" ) &&
            <div className={styles.rowItemContainer}>
            <div  className={`${styles.rowItemLeftText} ${styles.codChargeTxt}`}>{isArabic ? "رسوم الدفع عند الاستلام الإضافية" : "Additional COD Charges"}</div>
            <div  className={[styles.rowItemRightText,styles.codChargeAmount].join(" ")}>{ currency + " "+ parseFloat(codCharge)} </div>
        </div>}
        {myCodCharge > 0 && 
            <div className={styles.rowItemContainer}>
            <div  className={`${styles.rowItemLeftText} ${styles.codChargeTxt}`}>{isArabic ? "رسوم الدفع عند الاستلام الإضافية" : "Additional COD Charges"}</div>
            <div  className={[styles.rowItemRightText,styles.codChargeAmount].join(" ")}>{ currency + " "+ parseFloat(myCodCharge)} </div>
        </div>}

            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "رسوم الشحن" : "Delivery Fee"}</div>
                <div className={[styles.rowItemRightText,styles.freeDeliveryTxt].join(" ")}>{(deliveryFees>0)?"+ "+currency + " "+ deliveryFees:isArabic ? "مجاني" : "Free"}</div>
            </div>
            {discountAmount> 0 &&  <AmountSavedInfo savedAmount={discountAmount} currency={currency}/>}
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.totalAmountTxt].join(" ")}>{isArabic ? "المبلغ الإجمالي" : "Total Amount"}</div>
                <div className={[styles.rowItemRightText,styles.totalAmountPrice].join(" ")}>{currency + " " + parseFloat(FinalTotalAmount).toFixed(2)}</div>
            </div>
            </>}
           
       </div>
       </div>
    )


}


export default PriceDetails;

  