import { useRouter } from 'next/navigation';
import styles from './product-card.module.scss';



const ProductCard = ({cardData,addToCart={},style={}}) => {
    const router = useRouter();
    const { productName="", finalPrice="" , retailPrice="", currency="", discount="", image="",id="" , seoUrl="" } = cardData || {}
    return(
        <div className={styles.productCardItem} onClick={()=>window.location.href=`/products/`+seoUrl}>
            <div className={styles.productCardWrapper} style={{...style}}>
                <div className={styles.productImgWrapper}>
                    <div className={styles.productImgContainer}>
                        <img className={styles.productImg} src={image} alt='product-name' />
                    </div>
                </div>
                <div className={styles.textContent}>
                <div className={styles.productName}>{productName}</div>
               {  <div className={styles.discountTag} style={(discount > 0)?{opacity:1}:{opacity:0}}><span>Save</span> {currency} {discount}</div>}
                {(discount > 0)?<div className={styles.price}>{currency} {finalPrice}  <span className={[styles.price,styles.retailPrice].join(" ")}>{currency} {retailPrice}</span></div>:<div className={styles.price}>{currency} {finalPrice} </div>}
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

  