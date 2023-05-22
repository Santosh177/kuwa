
import styles from './cart-item-card.module.scss';






const CartItemCard = ({data,onUpdateItem={}}) => {

    console.log("CartItemCardCartItemCard",data)
    const { image="" , qty="" , productName="",retailPrice="", finalPrice="",discountType="",discountAmount="",currency="", id="" } = data || {};



    return(
        <div className={styles.cartItemCard}>
            <div className={styles.cartItemContainer}>
                <img src={image}></img>
                <div className={styles.quantityContainer}>
                    <div className={styles.quantityBtn} onClick={()=>(qty > 0) && onUpdateItem({product:id,quantity:qty-1})}>-</div>
                    <span>{qty}</span>
                    <div className={styles.quantityBtn} onClick={()=>onUpdateItem({product:id,quantity:qty+1})}>+</div>
                </div>
            </div>
            <div className={styles.cartItemInfo}>
                <div className={styles.itemName}>{productName}</div>
                { <div className={styles.discountTag} style={(discountAmount > 0)?{opacity:1}:{opacity:0}}>
                    <div className={styles.discountText}>Save</div>
                    <div className={styles.discountPrice}>{currency + " " + discountAmount}</div>
                </div>}
                <div className={styles.priceContainer}>
                    <div className={styles.finalPrice}>{currency + " " + finalPrice}</div>
                    <div className={styles.retailPrice}>{currency + " " + retailPrice}</div>
                </div>
            </div>
            <img className={styles.deleteIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/delete.png' alt='delete-icon'/>
           
        </div>
    )



}


export default CartItemCard;

  