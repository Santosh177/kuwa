import { useRouter } from 'next/navigation';
import styles from './product-card.module.scss';
import { useLanguage } from '@/context/languageDetails';
import { saveSearchData } from '@/services';



const ProductCard = ({ cardData={}, searchQuery="" , addToCart = {}, style = {} }) => {
    const router = useRouter();
    const { productName =0, finalPrice =0, retailPrice = "", currency = "", image = "", id = "", seoUrl = "",dealId="",isDealActive="",isTimerActive="",tag="",tagIconUrl="",productNameArabic="" } = cardData || {}
    console.log("shbhhaa",cardData)
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    let discount = parseFloat(retailPrice-finalPrice).toFixed(2);

    const handleRedirect = () =>{
        const payloadForSaveData = {
            "source":"website",
            "search_key":searchQuery,
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
        saveSearchData(payloadForSaveData)
    }
    return (
        <div id="search-container" className={styles.productCardItem} onClick={() => {handleRedirect()}}>
              {
            (tag || tagIconUrl) && 
            <div className={styles.tagContainer}>
            <div className={styles.tagSection}>
                  <div className={styles.tagDiv}>
                      {tagIconUrl && <img src={tagIconUrl} alt='tag-icon'></img>}
                    {tag && <div className={styles.tagTxt}>{tag}</div>}
                        </div>
                        </div>
                    </div>}
            <div id="search-container" className={styles.productCardWrapper}>
          
                <div id="search-container" className={styles.productImgWrapper}>
                    <div id="search-container" className={styles.productImgContainer}>
                        <img id="search-container" className={styles.productImg} src={image} alt='product-name' />
                    </div>
                </div>
                <div id="search-container" className={styles.productName}>{isArabic ? productNameArabic : productName}</div>
                {<div id="search-container" className={styles.discountTag} style={(discount > 0) ? { opacity: 1 } : { opacity: 0 }}><span>Save</span> {currency} {discount}</div>}
                {(discount > 0) ? <div className={styles.price}>{currency} {finalPrice}  <span className={[styles.price, styles.retailPrice].join(" ")}>{currency} {retailPrice}</span></div> : <div className={styles.price}>{currency} {finalPrice} </div>}
            </div>
        </div>
    )



}


export default ProductCard;

