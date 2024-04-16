import { useRouter } from 'next/navigation';
import styles from './product-deal-card.module.scss'


import { useAuth } from '@/context/userDetail';
const ProductDealCard = ({cardData,addToCart={},style={},handleNotifyMe,handleNonLogin}) => {
  const { isLogin=false ,userData = {}} = useAuth();
  const router = useRouter();
    const { productName="", finalPrice="" , retailPrice="", currency="", discount="", image="",productImage="",dealId="" ,productId="", variantId="" ,seoUrl="" ,dealListPrice="",dealDiscountPrice="",dealFinalPrice="", tag="",tagIconUrl="",dealInventory="",isDealActive="",isTimerActive="", currentTimerStatus="",normalInventory} = cardData || {}
    // console.log("cardData++++",cardData)
    const btnName = normalInventory > 0 ? "Add to cart" : "Notify me"

    return(
        <div className={styles.productCardItem} onClick={()=>window.location.href=`/products/`+seoUrl}>
            <div className={styles.productCardWrapper} style={{...style}}>
            {dealId && isDealActive
             && 
              isTimerActive && currentTimerStatus=="in-between" &&
              (tagIconUrl || tag) &&
               <div className={styles.tagSection}>
                <div className={styles.tagDiv}>
                {tagIconUrl && <img src={tagIconUrl} ></img>}
                  {tag &&  <div className={styles.tagTxt}>{tag}</div>}
                    </div>
                    </div>}
                {normalInventory <= 0 && <div className={styles.outOfStockTxt}>Out of stock</div>}
                <div className={styles.productImgWrapper}>
            
                    <div className={styles.productImgContainer}>
                        <img className={styles.productImg} src={image||productImage} alt='product-name' />
                    </div>
                   
                </div>
                <div className={styles.textContent}>
                  
                   <div className={styles.dealInventory}>{dealId && isDealActive && isTimerActive && currentTimerStatus=="in-between" && dealInventory? (dealInventory+ " " + "left in stock"): ""}</div>
                   
                <div className={styles.productName}>{productName}</div>
    {dealId && isDealActive && isTimerActive
    && currentTimerStatus=="in-between"
                  ? (
        <>
          <div className={styles.discountTag} style={{ opacity: dealDiscountPrice > 0 ? 1 : 0 }}>
            <span>Save</span> {currency} {dealDiscountPrice}
          </div>
          {dealDiscountPrice > 0 ? (
            <div  className={styles.price}>
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
               <div className={styles.btn} 
                style={{ 
                  backgroundColor: btnName === "Notify me" ? "#fff" : "", 
                  color: btnName === "Notify me" ? "#247A81" : "",
                  border: btnName === "Notify me" ? "2px solid #247A81" : "" 
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
    )



}


export default ProductDealCard;

  