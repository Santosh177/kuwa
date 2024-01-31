
import { useEffect } from 'react';
import styles from './price-details.module.scss';


const AmountSavedInfo = ({savedAmount=0,currency=""}) => {
    return(
        <div className={styles.amountSavedInfo}>You saved : {currency +" " + savedAmount}</div>
    )
}

const PriceDetails = ({data,isHidePriceDetails=false,selectedPaymentMethod,prePaidDiscount,extraDiscount,setExtraDiscount,myPrePaidDiscount}) => {
    console.log("setExtraDiscount",setExtraDiscount)
    const { cartItemCount="", subTotal="" , totalAmount="", savedAmount="", discountAmount="" , currency="",deliveryFees=0,prepaidDiscountAmount=0} = data || {}
    console.log("typeuug",typeof(Number((((totalAmount) * prePaidDiscount)/100).toFixed(2))))
    useEffect(()=>{
        if(prePaidDiscount && (selectedPaymentMethod == "TAP" || selectedPaymentMethod == "TABBY" || selectedPaymentMethod == "CHECKOUT_CARD" || selectedPaymentMethod == "TAMARA" || selectedPaymentMethod == "APPLE_PAY" ) ){
            setExtraDiscount && setExtraDiscount(parseFloat((((totalAmount) * prePaidDiscount)/100).toFixed(2)))
        }
        else{
           setExtraDiscount && setExtraDiscount(0)
        }
    },[selectedPaymentMethod,totalAmount])
    const FinalTotalAmount = extraDiscount > 0 ? totalAmount-extraDiscount : totalAmount  

    console.log("FinalTotalAmount",FinalTotalAmount)
    return(
        <div className={styles.header}>
            <div classname={styles.headerTxt} >Price Details</div>
       <div className={styles.priceDetailsWrapper}>
       
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Price ({cartItemCount} items)</div>
                <div className={styles.rowItemRightText}>{ currency +" " + subTotal }</div>
            </div>
           {!isHidePriceDetails && <>
            {discountAmount > 0 &&<div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Discount</div>
                <div  className={[styles.rowItemRightText,styles.discountAmount].join(" ")}>- {currency + " "+ discountAmount} </div>
            </div>}
            {(selectedPaymentMethod == "TAP" || selectedPaymentMethod == "TABBY" || selectedPaymentMethod == "CHECKOUT_CARD" || selectedPaymentMethod == "TAMARA" || selectedPaymentMethod == "APPLE_PAY" ) &&
               <div className={styles.rowItemContainer}>
               <div  className={`${styles.rowItemLeftText} ${styles.extraPayment}`}>{prePaidDiscount}% Extra Off on paying online applied</div>
               <div  className={[styles.rowItemRightText,styles.extradiscountAmount].join(" ")}>- {currency + " "+ extraDiscount} </div>
           </div>
            }
            {prepaidDiscountAmount>0 &&
            <div className={styles.rowItemContainer}>
            <div  className={`${styles.rowItemLeftText} ${styles.extraPayment}`}>{myPrePaidDiscount}% Extra Off on paying online applied</div>
            <div  className={[styles.rowItemRightText,styles.extradiscountAmount].join(" ")}>- {currency + " "+ parseFloat(prepaidDiscountAmount).toFixed(2)} </div>
        </div>}
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Delivery Fee</div>
                <div className={[styles.rowItemRightText,styles.freeDeliveryTxt].join(" ")}>{(deliveryFees>0)?"+ "+currency + " "+ deliveryFees:"Free"}</div>
            </div>
            {discountAmount> 0 &&  <AmountSavedInfo savedAmount={discountAmount} currency={currency}/>}
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.totalAmountTxt].join(" ")}>Total Amount</div>
                <div className={[styles.rowItemRightText,styles.totalAmountPrice].join(" ")}>{currency + " " + FinalTotalAmount}</div>
            </div>
            </>}
           
       </div>
       </div>
    )


}


export default PriceDetails;

  