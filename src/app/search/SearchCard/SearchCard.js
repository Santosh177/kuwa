import styles from './searchCard.module.scss';




export default function SearchCard() {

    return (
        <div className={styles.searchCard}>
            <div className={styles.productContainer}>
                <div className={styles.productImage}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png'  alt='product-iamge'/>
                </div>
                <div className={styles.productName}>Korean Marine Collagen Peptides, 200 Gms</div>

            </div>
          
        </div>
    )
}