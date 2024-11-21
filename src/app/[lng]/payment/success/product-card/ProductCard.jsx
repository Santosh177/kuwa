import React from 'react';
import styles from './product-card.module.scss'
import { useLanguage } from '@/context/languageDetails';

const ProductCard = ({data, currency,index}) => {
    const { productImage="" , productName="",productPriceAmount="", productPriceSpecialAmount="",discountType="", id="",productQuantity ,productNameArabic} = data || {};
    const saveprice = (productPriceAmount)- (productPriceSpecialAmount) || 0
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return(
        <div className={styles.cartItemCard}>
           
            <div className={styles.cartItemInfo}>
                <div className={styles.index + " " + "."}>{index+1}</div>
                <img src={productImage || 'https://d25uasl7utydze.cloudfront.net/assets/no_image.png'}></img>
                <div className={`${styles.item} ${isArabic ? styles['item-ar'] : styles['item-en']}` }>
                <div className={`${styles.itemName} ${isArabic ? styles['itemName-ar'] : styles['itemName-en']}` }>{isArabic ? productNameArabic : productName}</div>
                <div className={styles.quantity}>qty: {productQuantity || ""}</div>
                </div>
                 </div>
               <div className={`${styles.priceContainer} ${isArabic ? styles['priceContainer-ar'] : styles['priceContainer-en']}` }>
                    <div className={styles.finalPrice}>{currency + " " + productPriceSpecialAmount}</div>
                    {saveprice > 0 && <div className={styles.retailPrice}>{currency + " " + productPriceAmount}</div>}
               
                </div>
            </div>

           
     
    )
}

export default ProductCard