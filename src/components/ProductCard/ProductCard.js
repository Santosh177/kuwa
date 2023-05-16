
import styles from './product-card.module.scss';



const ProductCard = ({number,image}) => {

    return(
        <div className={styles.productCardItem}>
            <div className={styles.productCardWrapper}>
                <div className={styles.productImgWrapper}>
                    <div className={styles.productImgContainer}>
                        <img className={styles.productImg} src={(image)?image:"https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png"}alt='product-name' />
                    </div>
                </div>
                <div className={styles.productName}>Korean Marine Collagen Peptides, 200 Gms</div>
                <div className={styles.discountTag}><span>Save</span> Dhs 40</div>
                <div className={styles.price}>Dhs 139 <span className={[styles.price,styles.retailPrice].join(" ")}>Dhs 179</span></div>
                <div className={styles.btn}>Add to cart</div>
            </div>
        </div>
    )



}


export default ProductCard;

  