import { useRouter } from 'next/navigation';
import styles from './product-card.module.scss';



const ProductCard = ({ cardData={}, addToCart = {}, style = {} }) => {
    const router = useRouter();
    const { productName =0, finalPrice =0, retailPrice = "", currency = "", image = "", id = "", seoUrl = "",dealId="",isDealActive="",isTimerActive="",tag="",tagIconUrl="" } = cardData || {}
    console.log("shbhhaa",cardData)
    let discount=retailPrice-finalPrice;
    return (
        <div id="search-container" className={styles.productCardItem} onClick={() => { window.location.href = `/products/` + seoUrl}}>
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
                <div id="search-container" className={styles.productName}>{productName}</div>
                {<div id="search-container" className={styles.discountTag} style={(discount > 0) ? { opacity: 1 } : { opacity: 0 }}><span>Save</span> {currency} {discount}</div>}
                {(discount > 0) ? <div className={styles.price}>{currency} {finalPrice}  <span className={[styles.price, styles.retailPrice].join(" ")}>{currency} {retailPrice}</span></div> : <div className={styles.price}>{currency} {finalPrice} </div>}
            </div>
        </div>
    )



}


export default ProductCard;

