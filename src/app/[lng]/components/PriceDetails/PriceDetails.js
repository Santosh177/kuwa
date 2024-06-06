
import { useEffect,useState } from 'react';
import styles from './price-details.module.scss';
import { useLanguage } from '@/context/languageDetails';


const AmountSavedInfo = ({savedAmount=0,currency=""}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return(
        <div className={styles.amountSavedInfo}>{isArabic ? "لقد وفرت" : "You saved"} : {currency +" " + savedAmount}</div>
    )
}

const CustumDutyInfo = ({setIsShowCustumDutyInfoPopup})=>{
return(
<div className={styles.custumDutyInfoPopupContainer}>
    <div className={styles.custumDutyInfoPopupSection}>
    <div className={styles.title}>{isArabic ? "الرسوم، الضرائب، والمصاريف" : "Duty, Taxes, & Fees"}</div>
    <div className={styles.subTxt}>{isArabic ? "البضائع المستوردة خاضعة لرسوم البيان التي تفرضها الهيئة الحكومية المحلية في قطر. مع خدمة DDP (الرسوم المدفوعة عند التسليم)، لن تحتاج إلى دفع أي رسوم أو ضرائب إضافية عند الاستلام." : "Imported goods are subject to Bayan fee which is levied by the local government agency in Qatar. With DDP (Delivered Duties Paid), you do not have to pay any additional duty/tax at the time of delivery"}.</div>
    <div className={styles.footer} onClick={(()=>setIsShowCustumDutyInfoPopup(false))}>{isArabic ? "إغلاق" : "Close"}</div>
    </div>
</div>
)

}

const PriceDetails = ({data,isHidePriceDetails=false,selectedPaymentMethod,prePaidDiscount,extraDiscount,setExtraDiscount,myPrePaidDiscount,codCharge,myCodCharge,customFee=0,myCustomFee}) => {
    const { cartItemCount="", subTotal="" , totalAmount="", savedAmount="", discountAmount="" , currency="",deliveryFees=0,prepaidDiscountAmount=0} = data || {}
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
 const [isShowCustumDutyInfoPopup,setIsShowCustumDutyInfoPopup] = useState(false)
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
    const FinalTotalAmount = (extraDiscount > 0 ? totalAmount-extraDiscount : ((codCharge > 0 && selectedPaymentMethod=="COD") ? totalAmount + codCharge : totalAmount )) + customFee  ;

    return(
        <>
        <div className={styles.header}>
            <div classname={styles.headerTxt} >{isArabic ? "تفاصيل الأسعار" : "Price Details"}</div>
       <div className={styles.priceDetailsWrapper}>
       
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "السعر" : "Price"} ({cartItemCount} {isArabic ? "عناصر" : "items"})</div>
                <div className={styles.rowItemRightText}>{ currency +" " + subTotal }</div>
            </div>
           {!isHidePriceDetails && <>
            {discountAmount > 0 &&<div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "خصم" : "Discount"}</div>
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

          {customFee > 0 &&  <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "رسوم جمركية" : "Custom Duty"} <span style={{cursor:"pointer"}} onClick={()=>setIsShowCustumDutyInfoPopup(true)}><img src="https://d25uasl7utydze.cloudfront.net/assets/tool_tip.svg"></img></span></div>
                <div className={[styles.rowItemRightText].join(" ")}>{parseFloat(customFee).toFixed(2)}</div>
            </div>}
            {myCustomFee > 0 &&  <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "رسوم جمركية" : "Custom Duty"} <span style={{cursor:"pointer"}} onClick={()=>setIsShowCustumDutyInfoPopup(true)}><img src="https://d25uasl7utydze.cloudfront.net/assets/tool_tip.svg"></img></span></div>
                <div className={[styles.rowItemRightText].join(" ")}>{parseFloat(myCustomFee).toFixed(2)}</div>
            </div>}
            {discountAmount> 0 &&  <AmountSavedInfo savedAmount={discountAmount} currency={currency}/>}
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.totalAmountTxt].join(" ")}>{isArabic ? "المبلغ الإجمالي" : "Total Amount"}</div>
                <div className={[styles.rowItemRightText,styles.totalAmountPrice].join(" ")}>{currency + " " + parseFloat(FinalTotalAmount).toFixed(2)}</div>
            </div>
            </>}
           
       </div>
       </div>
       {isShowCustumDutyInfoPopup &&  <div className={styles.custumDutyInfoPopup}>
      <CustumDutyInfo setIsShowCustumDutyInfoPopup={setIsShowCustumDutyInfoPopup}/>
      </div>}
       </>
    )


}


export default PriceDetails;

  
