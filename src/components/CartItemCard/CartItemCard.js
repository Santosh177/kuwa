
import styles from './cart-item-card.module.scss';



const CartItemCard = ({number,image}) => {

    return(
        <div className={styles.cartItemCard}>
            <div className={styles.cartItemContainer}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png'></img>
                <div className={styles.quantityContainer} id="incriment-box">
                    <div className={styles.quantityBtn} >-</div>
                    <span>{1}</span>
                    <div className={styles.quantityBtn}>+</div>
                </div>
            </div>
            <div className={styles.cartItemInfo}>
                <div className={styles.itemName}>Korean Marine Collagen Peptides, 200 Gms</div>
                <div className={styles.discountTag}>
                    <div className={styles.discountText}>Save</div>
                    <div className={styles.discountPrice}>Dhs 40</div>
                </div>
                <div className={styles.priceContainer}>
                    <div className={styles.finalPrice}>Dhs 139</div>
                    <div className={styles.retailPrice}>Dhs 179</div>
                </div>
            </div>
           
        </div>
    )



}


export default CartItemCard;

  