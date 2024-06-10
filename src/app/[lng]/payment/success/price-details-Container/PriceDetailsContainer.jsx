'use client'
import React,{useState} from 'react';
import styles from './price-details-container.module.scss'
import { useCountry } from '@/context/contryDetails';
import { useLanguage } from '@/context/languageDetails';

const AmountSavedInfo = ({savedAmount=0,currency=""}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return(
        <div className={styles.amountSavedInfo}>{isArabic ? "لقد وفرت" : "You saved"} : {currency +" " + savedAmount}</div>
    )
}
const CustumDutyInfo = ({setIsShowCustumDutyInfoPopup})=>{
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    return(
    <div className={styles.custumDutyInfoPopupContainer}>
        <div className={styles.custumDutyInfoPopupSection}>
        <div className={styles.title}>{isArabic ? "الرسوم، الضرائب، والمصاريف" : "Duty, Taxes, & Fees"}</div>
        <div className={styles.subTxt}>{isArabic ? "البضائع المستوردة خاضعة لرسوم البيان التي تفرضها الهيئة الحكومية المحلية في قطر. مع خدمة DDP (الرسوم المدفوعة عند التسليم)، لن تحتاج إلى دفع أي رسوم أو ضرائب إضافية عند الاستلام." : "Imported goods are subject to Bayan fee which is levied by the local government agency in Qatar. With DDP (Delivered Duties Paid), you do not have to pay any additional duty/tax at the time of delivery."}</div>
        <div className={styles.footer} onClick={(()=>setIsShowCustumDutyInfoPopup(false))}>{isArabic ? "إغلاق" : "Close"}</div>
        </div>
    </div>
    )
    
    }

const PriceDetailsContainer = ({orderDetailsData}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    const { cartItemCount="",
    allProductsPrice="",
    couponType="",
    coupon="",
    couponPercentage="",
    paymentType="",
    orderProducts=[],
     finalAmount="",
     savedAmount="",
     discount="" ,
     currency="",
    deliveryFee=0,
    prepaidDiscountAmount = "",
codCharge=0,
customFee } = orderDetailsData
    const { selectedCountry={} } = useCountry();
    const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || ""
    const discountAmount = parseFloat(discount).toFixed(2);
    const totalQuantity = orderProducts.reduce((sum, data) => {
        return sum + data.productQuantity;
    }, 0);
    const [isShowCustumDutyInfoPopup,setIsShowCustumDutyInfoPopup] = useState(false)
    return(
        <>
        <div className={styles.header}>
            <div classname={styles.headerTxt} >{isArabic ? "تفاصيل الأسعار" : "Price Details"}</div>
       <div className={styles.priceDetailsWrapper}>
       
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "السعر" : "Price"} ({totalQuantity} {isArabic ? "عناصر" : "items"})</div>
                <div className={styles.rowItemRightText}>{ currency +" " + parseFloat(allProductsPrice).toFixed(2)}</div>
            </div>
           { <>
            {discount > 0 &&<div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ?  "خصم الكوبون" : "Coupon Discount"}</div>
                <div  className={[styles.rowItemLeftText,styles.discount].join(" ")}>
                    <div style={{display:"flex",gap:"5px",justifyContent:"flex-end"}}>
                        <div>- {currency}</div>
                        <div>{discountAmount}</div>
                    </div>
                  
                <div className={styles.couponCode}>({couponType=="Percentage"?coupon +" " + "-" + " " + (couponPercentage + ""+ "%"):(coupon +" " + "-" + " " + discountAmount + ""+" " + currency)})</div> </div>
            </div>}
            {prepaidDiscountAmount>0 && <div className={styles.rowItemContainer}>
               <div  className={`${styles.rowItemLeftText} ${styles.extraPayment}`}>{prePaidDiscount}{isArabic ? "خصم إضافي % عند الدفع أونلاين" :  "% Extra Off on paying online applied"}</div>
               <div  className={[styles.rowItemRightText,styles.extradiscountAmount].join(" ")}>- {currency + " "+ parseFloat(prepaidDiscountAmount).toFixed(2)} </div>
           </div>}
           {codCharge>0 && <div className={styles.rowItemContainer}>
               <div  className={`${styles.rowItemLeftText} ${styles.codChargeTxt}`}>{isArabic ? "رسوم الدفع عند الاستلام الإضافية" : "Additional COD Charges"}</div>
               <div  className={[styles.rowItemRightText,styles.codChargeAmount].join(" ")}>{currency + " "+ parseFloat(codCharge)} </div>
           </div>}
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "رسوم الشحن" : "Delivery Fee"}</div>
                <div className={[styles.rowItemRightText,styles.freeDeliveryTxt].join(" ")}>
                     {deliveryFee>0 ? (<span className={styles.price}>
                        <div style={{display:"flex",gap:"5px"}}>
                     <div>+{currency}</div>
                     <div>{deliveryFee}</div>
                     </div> 
                      </span>):(<span>{isArabic ? "مجاني" : "Free"}</span>)}
                      </div>
            </div>
           
          {customFee > 0 &&  <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>{isArabic ? "رسوم جمركية" :"Custom Duty"} <span style={{cursor:"pointer"}} onClick={()=>setIsShowCustumDutyInfoPopup(true)}><img src="https://d25uasl7utydze.cloudfront.net/assets/tool_tip.svg"></img></span></div>
                <div className={[styles.rowItemRightText].join(" ")}>{parseFloat(customFee).toFixed(2)}</div>
            </div>}
            {discount> 0 &&  <AmountSavedInfo savedAmount={discountAmount} currency={currency}/>}
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.totalAmountTxt].join(" ")}>{isArabic ? "المبلغ الإجمالي" : "Total Amount"}</div>
                <div className={[styles.rowItemRightText,styles.totalAmountPrice].join(" ")}>
                <div style={{display:"flex",gap:"5px"}}>
                    <div>{currency } </div>
                    <div> {parseFloat(finalAmount).toFixed(2)}</div>
                    </div> 
                     {/* {currency + " " + parseFloat(finalAmount).toFixed(2)} */}
                    </div>
            </div>
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.paymentTypeTxt].join(" ")}>{isArabic ? "طريقة الدفع" : "Payment Method"}</div>
                <div className={[styles.rowItemRightText,styles.paymentType].join(" ")}>{isArabic ? "باستخدام" : "Using"} {paymentType}</div>
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

export default PriceDetailsContainer
