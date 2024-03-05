
import styles from './cart-item-card.module.scss';






const CartItemCard = ({data,onUpdateItem={},onDeleteItem={},paymentPage,index,outOfStockPopUp}) => {

    console.log("CartItemCardCartItemCard",data)
    const { image="" , qty="" , productName="",retailPrice="", finalPrice="",discountType="",discountAmount="",currency="", id="", variants,dealId="",normalInventory=""} = data || {};
console.log("cartItemCard",data)
    return(
        <div >
         {paymentPage == true ? 
        <div>
          {/* { normalInventory > 0 && */}
            <div className={styles.PaymentcartItemCard}>

            <div className={styles.PaymentcartItemInfo}>
                <div className={styles.Paymentindex + " " + "."}>{index+1}</div>
                <img src={ variants===null ? image : variants.variants.image}></img>
                <div className={styles.paymentItem}>
                <div className={styles.PaymentitemName}>{productName}</div>
                <div className={styles.quantity}>qty: {qty}</div>
                </div>
                 </div>
               <div className={styles.PaymentpriceContainer}>
                    <div className={styles.PaymentfinalPrice}>{currency + " " + finalPrice}</div>
                    {discountAmount>0 &&<div className={styles.PaymentretailPrice}>{currency + " " + retailPrice}</div>}

                </div>
                </div>
{/* } */}
            </div>
            
            :
            <>
            <div className={styles.cartItemCard}>
            <div className={styles.cartItemContainer}>
                <img src={variants=== null || variants == undefined  ? image : variants?.variants?.image}></img>
                {normalInventory<=0 ? 
                 <div className={styles.outOfStockTxt}>Out of stock</div>
                  : 
                  <div className={styles.quantityContainer}>
                    <div className={styles.quantityBtn} onClick={()=>(qty > 1) && onUpdateItem({product:id,quantity:qty-1,dealId:dealId})}>-</div>
                    <span>{qty}</span>
                    <div className={styles.quantityBtn} onClick={()=>onUpdateItem({product:id,quantity:qty+1,dealId:dealId})}>+</div>
                    </div>
                }
            </div>
            <div className={styles.cartItemInfo}>
            <div className={styles.itemName} style={outOfStockPopUp ? {fontSize: "12px"} : {}}>{productName}</div>
                <div className={styles.discountTag} style={(discountAmount > 0)?{opacity:1}:{opacity:0}}>
                    <div className={styles.discountText}>Save</div>
                    <div className={styles.discountPrice}>{currency + " " + discountAmount}</div>
                </div>
               <div className={styles.priceContainer}>
                    <div className={styles.finalPrice}>{currency + " " + finalPrice}</div>
                    {discountAmount > 0 &&<div className={styles.retailPrice}>{currency + " " + retailPrice}</div>}
                </div>
            </div>
        {outOfStockPopUp ? <div></div> :    <img className={styles.deleteIcon} onClick={()=>onDeleteItem()} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/delete.png' alt='delete-icon'/>}
            </div>
    </>
}
        </div>
    )



}


export default CartItemCard;

  