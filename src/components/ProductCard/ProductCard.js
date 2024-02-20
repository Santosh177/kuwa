import { useRouter } from 'next/navigation';
import styles from './product-card.module.scss';



const ProductCard = ({cardData,addToCart={},style={},isDealActive=false}) => {
    console.log("dealCardData",cardData)
    const router = useRouter();
    const { productName="", finalPrice="" , retailPrice="", currency="", discount="", image="",productImage="",dealId="" ,productId="", variantId="" ,seoUrl="" ,dealListPrice="",dealDiscountPrice="",dealFinalPrice="", tag="",tagIconUrl="",dealInventory=""} = cardData || {}

    console.log("savhahv",isDealActive)
    return(
        <div className={styles.productCardItem} onClick={()=>window.location.href=`/products/`+seoUrl}>
            <div className={styles.productCardWrapper} style={{...style}}>
            {tag && tagIconUrl && <div className={styles.tagSection}>
                        <img src={tagIconUrl} alt='tag-icon'></img>
                        <div className={styles.tagTxt}>{tag}</div>
                    </div>}
                <div className={styles.productImgWrapper}>
            
                    <div className={styles.productImgContainer}>
                        <img className={styles.productImg} src={image||productImage} alt='product-name' />
                    </div>
                   
                </div>
                <div className={styles.textContent}>
                 {dealInventory &&  
                   <div className={styles.dealInentory}>{dealInventory+ " " + "left in stock"}</div>
                   }
                <div className={styles.productName}>{productName}</div>
                {isDealActive ? (
        <>
          <div className={styles.discountTag} style={{ opacity: dealDiscountPrice > 0 ? 1 : 0 }}>
            <span>Save</span> {currency} {dealDiscountPrice}
          </div>
          {dealDiscountPrice > 0 ? (
            <div className={styles.price}>
             <span>Only at</span> {currency} {dealFinalPrice}{' '}
              <span className={[styles.price, styles.retailPrice].join(' ')}>{currency} {dealListPrice}</span>
            </div>
          ) : (
            <div className={styles.price}><span>Only at</span> {currency} {dealFinalPrice} </div>
          )}
        </>
      ) : (
        <>
          <div className={styles.discountTag} style={{ opacity: discount > 0 ? 1 : 0 }}>
            <span>Save</span> {currency} {discount}
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
                <div className={styles.btn} onClick={(e)=>
                    {
                        e.stopPropagation()
                        addToCart()}}>Add to cart</div>
            </div>
            </div>
        </div>
    )



}


export default ProductCard;

  