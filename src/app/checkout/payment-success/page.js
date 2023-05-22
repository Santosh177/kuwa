
import styles from './price-details.module.scss';


const AmountSavedInfo = ({savedAmount=0,currency=""}) => {
    return(
        <div className={styles.amountSavedInfo}>You saved : {currency +" " + savedAmount}</div>
    )
}

const PriceDetails = ({data}) => {

    const { cartItemCount="", subTotal="" , totalAmount="", savedAmount="", discountAmount="" , currency=""} = data || {}


    return(
       <div className={styles.priceDetailsWrapper}>
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Price ({cartItemCount} items)</div>
                <div className={styles.rowItemRightText}>{ currency +" " + subTotal }</div>
            </div>
            {discountAmount > 0 &&<div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Discount</div>
                <div  className={[styles.rowItemLeftText,styles.discountAmount].join(" ")}>- {currency + " "+ discountAmount} </div>
            </div>}
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Delivery Fee</div>
                <div className={[styles.rowItemRightText,styles.freeDeliveryTxt].join(" ")}>Free Delivery</div>
            </div>
            {savedAmount> 0 &&  <AmountSavedInfo savedAmount={savedAmount}/>}
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.totalAmountTxt].join(" ")}>Total Amount</div>
                <div className={[styles.rowItemRightText,styles.totalAmountPrice].join(" ")}>{currency + " " + totalAmount}</div>
            </div>
       </div>
    )


}


export default PriceDetails;

  