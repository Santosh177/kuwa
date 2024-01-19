
import styles from './price-details.module.scss';


const AmountSavedInfo = ({savedAmount=0,currency=""}) => {
    return(
        <div className={styles.amountSavedInfo}>You saved : {currency +" " + savedAmount}</div>
    )
}

const PriceDetails = ({data,isHidePriceDetails=false,selectedPaymentMethod,prePaidDiscount="",extraDiscount,setExtraDiscount}) => {

    const { cartItemCount="", subTotal="" , totalAmount="", savedAmount="", discountAmount="" , currency="",deliveryFees=0} = data || {}
    if(prePaidDiscount && selectedPaymentMethod){
        setExtraDiscount(((totalAmount * prePaidDiscount)/100).toFixed(2))
    }
    console.log("extraDiscount",extraDiscount)
    
    
    const FinalTotalAmount = extraDiscount ? totalAmount-extraDiscount : totalAmount  
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
                <div  className={[styles.rowItemLeftText,styles.discountAmount].join(" ")}>- {currency + " "+ discountAmount} </div>
            </div>}
            {(selectedPaymentMethod == "TAP" || selectedPaymentMethod == "TABBY" || selectedPaymentMethod == "CHECKOUT_CARD" || selectedPaymentMethod == "TAMARA" || selectedPaymentMethod == "APPLE_PAY" ) &&
               <div className={styles.rowItemContainer}>
               <div className={styles.rowItemLeftText}>5% Extra Off on paying online applied</div>
               <div  className={[styles.rowItemLeftText,styles.discountAmount].join(" ")}>- {currency + " "+ extraDiscount} </div>
           </div>
            }
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

  