import React from 'react';
import styles from './product-card.module.scss'

const ProductCard = ({data, currency,index}) => {
    const { productImage="" , productName="",productPriceAmount="", productPriceSpecialAmount="",discountType="", id="" } = data || {};
    return(
        <div className={styles.cartItemCard}>
           
            <div className={styles.cartItemInfo}>
                <div className={styles.index + " " + "."}>{index+1}</div>
                <img src={productImage}></img>
                <div className={styles.itemName}>{productName}</div>
                 </div>
               <div className={styles.priceContainer}>
                    <div className={styles.finalPrice}>{currency + " " + productPriceAmount}</div>
                    {<div className={styles.retailPrice}>{currency + " " + productPriceSpecialAmount}</div>}
               
                </div>
            </div>

           
     
    )
}

export default ProductCard