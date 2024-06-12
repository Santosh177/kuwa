import React from 'react'
import styles from './cartPageProductCard.module.scss'
import { useCountry } from '@/context/contryDetails'
import { useLanguage } from '@/context/languageDetails'
import { useAuth } from '@/context/userDetail'

const CartPageProductCard = ({cardData = {}, handleAddtoProduct={},handleNotifyMe,handleNonLogin}) => {
    const {listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    const {selectedCountry = {}} = useCountry();
    const {isLogin = false, userData = {}} = useAuth();
    // const currency = selectedCountry.currency;
    const { productId ="",
        productName ="",
        productNameArabic="",
        productAvailableQuantity="",
        productListPrice="",
        productFinalPrice="",
        productDiscount="",
       variantId="",
        dealId="",
        dealTag="",
       dealTagArabic="",
        dealIconUrl="",
       dealInventory="",
       currency="",
      productImage

        } = cardData
        
    const btnName = productAvailableQuantity > 0 ? ( isArabic ? "أضف إلى السلة" : "Add to cart") : (isArabic ? "اعلمني " : "Notify me")


  return (
    <>
    <div className={styles.cartPageProductCard}>
   { (dealTag || dealIconUrl) &&
              <div className={styles.tagSection}>
                <div className={styles.tagDiv}>
                {dealIconUrl &&   <img src={dealIconUrl} alt='tag-icon'></img>}
                {dealTag &&   <div className={styles.tagTxt}>{isArabic ? dealTagArabic: dealTag}</div>}
                    </div>
                    </div>}
                 {productAvailableQuantity <= 0 && <div className={styles.outOfStockTxt}>{isArabic ? "غير متوفر" :"Out of stock"}</div>}

                <div className={styles.productImage}><img src={productImage}/></div>
                <div className={styles.productInfo}>
                    <div className={styles.dealInventory}>{dealInventory ? (dealInventory+ " " + (isArabic ? "المتبقي في المخزون" : "left in stock")) : ""}</div>
                    <div className={styles.cartProductName}>{isArabic ? productNameArabic : productName} </div>
                    <div className={styles.productPriceInfo}>
                        <div className={styles.discount} style={{ opacity: productDiscount > 0 ? 1 : 0 }}><span>{ isArabic ?  "حفظ" :  "Save"}</span> { currency + " " + productDiscount}</div>
                        <div className={styles.finalPrice}>{currency + " " + productFinalPrice}
                        <span className={styles.retailPrice}>{currency + " " + productListPrice}</span></div>
                    </div>
                </div>
                <div className={styles.btn}
                 style={{ 
                    backgroundColor: btnName === (isArabic ? "اعلمني " : "Notify me") ? "#fff" : "", 
                    color: btnName === (isArabic ? "اعلمني " : "Notify me")  ? "#247A81" : "",
                    border: btnName === (isArabic ? "اعلمني " : "Notify me")  ? "2px solid #247A81" : "" 
                  }}
                  onClick={(e)=>
                    {
                        e.stopPropagation()
                        if(productAvailableQuantity> 0){
                            handleAddtoProduct();
                        }
                        else{
                            if(isLogin){
                                handleNotifyMe();
                            }
                            else{
                              handleNonLogin();
                            }
                           
                        }
                        }}>{btnName}</div>
                    </div>
                </>    
  )
}

export default CartPageProductCard