import { useRouter } from 'next/navigation';
import styles from './product-card.module.scss';
import { useState } from 'react';
import { useLanguage } from '@/context/languageDetails';

import { useAuth } from '@/context/userDetail';
import { saveSearchData } from '@/services';
const ProductCard = ({cardData,addToCart={},style={},handleNotifyMe,handleNonLogin={},searchKey}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


    const { isLogin=false ,userData = {}} = useAuth();
    const router = useRouter();
    const { productName="", finalPrice="" , retailPrice="", currency="", discount="", image="",productImage="",dealId="" ,productId="", variantId="" ,seoUrl="" ,dealListPrice="",dealDiscountPrice="",dealFinalPrice="", tag="",tagIconUrl="",dealInventory="",isDealActive="",isTimerActive="",currentTimerStatus="",normalInventory="",id="" } = cardData || {}
    const {productNameArabic="",tagArabic=""} = cardData || {}
    // console.log("productCard+++++",cardData)
    const btnName = normalInventory > 0 ? ( isArabic ? "أضف إلى السلة" : "Add to cart") : (isArabic ? "اعلمني " : "Notify me")
   
    const handleRedirect = () =>{
      const payloadForSaveData = {
        "source":"website",
        "search_key":searchKey,
        "category":null,
        "sort_by":"relevance",
        "inStock":false,
   "noOfSearchResult":0,
   "productId":id,
   "productName":productName,
   "productFinalPrice":finalPrice,
   "productIdList":[],
   "productNameList":[]
        }
    window.location.href = `/products/${seoUrl}`
    if(searchKey){
      saveSearchData(payloadForSaveData)

    }
}


    return(
        <>
        <div className={styles.productCardItem} onClick={()=>handleRedirect()}>

            <div className={styles.productCardWrapper} style={{...style}}>
            {dealId && isDealActive
             && 
              isTimerActive && currentTimerStatus=="in-between" &&
              (tagIconUrl || tag) &&
              <div className={styles.tagSection}>
                <div className={styles.tagDiv}>
                {tagIconUrl &&   <img src={tagIconUrl} alt='tag-icon'></img>}
                {tag &&   <div className={styles.tagTxt}>{isArabic ? tagArabic: tag}</div>}
                    </div>
                    </div>}
                 {normalInventory <= 0 && <div className={styles.outOfStockTxt}>{isArabic ? "غير متوفر" :"Out of stock"}</div>}
                <div className={styles.productImgWrapper}>
            
                    <div className={styles.productImgContainer}>
                        <img className={styles.productImg} src={image||productImage} alt='product-name' />
                    </div>
                   
                </div>
                <div className={styles.textContent}>

                <div className={styles.dealInventory}>{ dealId && isDealActive && isTimerActive && currentTimerStatus=="in-between" && dealInventory ? (dealInventory+ " " + isArabic ? "المتبقي في المخزون" : "left in stock"): ""}</div>
                   
                <div className={styles.productName}>{isArabic ? productNameArabic: productName}</div>
                {dealId && isDealActive && isTimerActive
                 && currentTimerStatus=="in-between"
                  ? (
        <>
          <div className={styles.discountTag} style={{ opacity: dealDiscountPrice > 0 ? 1 : 0 }}>
            <span>{isArabic ? " حفظ" : "Save"}</span> {currency} {dealDiscountPrice}
          </div>
          {dealDiscountPrice > 0 ? (
            <div  className={styles.price}>
             <span>{isArabic ? " حصرياً في" : "Only at"}</span> {currency} {dealFinalPrice}{' '}
              <span className={[styles.price, styles.retailPrice].join(' ')}>{currency} {dealListPrice}</span>
            </div>
          ) : (
            <div className={styles.price}><span>{isArabic ? " حصرياً في" :"Only at"}</span> {currency} {dealFinalPrice} </div>
          )}
        </>
      ) : (
        <>
          <div className={styles.discountTag} style={{ opacity: discount > 0 ? 1 : 0 }}>
            <span>{isArabic ? " حفظ" :"Save"}</span> {currency} {discount}
          </div>
          {discount > 0 ? (
            <div className={styles.price}>
              {currency} {finalPrice}{' '}
              <span className={[styles.price, styles.retailPrice].join(' ')}>{currency} {retailPrice}</span>
            </div>
          ) : (
            <div className={styles.price}>{currency} {finalPrice} </div>
          )}
        </>
      )}
                <div className={styles.btn} 
                 style={{ 
                  backgroundColor: btnName === (isArabic ? "اعلمني " : "Notify me") ? "#fff" : "", 
                  color: btnName === (isArabic ? "اعلمني " : "Notify me")  ? "#247A81" : "",
                  border: btnName === (isArabic ? "اعلمني " : "Notify me")  ? "2px solid #247A81" : "" 
                }}
                onClick={(e)=>
                    {
                        e.stopPropagation()
                        if(normalInventory> 0){
                            addToCart();
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
            </div>
        </div>
        
        </>
    )



}


export default ProductCard;

  