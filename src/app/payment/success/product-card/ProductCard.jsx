import React from 'react';
import styles from './product-card.module.scss'

const ProductCard = ({data, currency,index}) => {
    const { productImage="" , productName="",productPriceAmount="", productPriceSpecialAmount="",discountType="", id="",productQuantity } = data || {};
    return(
        <div className={styles.cartItemCard}>
           
            <div className={styles.cartItemInfo}>
                <div className={styles.index + " " + "."}>{index+1}</div>
                <img src={productImage}></img>
                <div className={styles.item}>
                <div className={styles.itemName}>{productName}</div>
                <div className={styles.quantity}>qty: {productQuantity || ""}</div>
                </div>
                 </div>
               <div className={styles.priceContainer}>
                    <div className={styles.finalPrice}>{currency + " " + productPriceSpecialAmount}</div>
                    {<div className={styles.retailPrice}>{currency + " " + productPriceAmount}</div>}
               
                </div>
            </div>

           
     
    )
}

export default ProductCard