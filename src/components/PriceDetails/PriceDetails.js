
import styles from './price-details.module.scss';


const AmountSavedInfo = () => {
    return(
        <div className={styles.amountSavedInfo}>You saved : AED 50</div>
    )
}

const PriceDetails = ({}) => {

    return(
       <div className={styles.priceDetailsWrapper}>
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Price (2 items)</div>
                <div className={styles.rowItemRightText}>AED 378</div>
            </div>
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Discount</div>
                <div  className={[styles.rowItemLeftText,styles.discountAmount].join(" ")}>- AED 378</div>
            </div>
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Delivery Fee</div>
                <div className={[styles.rowItemRightText,styles.freeDeliveryTxt].join(" ")}>Free Delivery</div>
            </div>
            <AmountSavedInfo />
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.totalAmountTxt].join(" ")}>Total Amount</div>
                <div className={[styles.rowItemRightText,styles.totalAmountPrice].join(" ")}>AED 378</div>
            </div>
       </div>
    )


}


export default PriceDetails;

  