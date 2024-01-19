import React from 'react';
import styles from './prepaid-extra-discount.module.scss'

const PrepaidExtraDiscount = ({prePaidDiscount}) => {
  return (
    <div className={styles.extraDiscountSection}>
        <div className={styles.dicountInfo}>Extra {prePaidDiscount}% OFF</div>
        <div className={styles.prePaidOptions}>
            <div className={styles.imageSection}>
                <div className={styles.imageDiv}><img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/visa.png"></img></div>
                <div className={styles.imageDiv}><img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/mastercard.png"></img></div>
                <div className={styles.imageDiv}><img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tabby.png"></img></div>
            </div>
            <div className={styles.txt}>Valid on card payments, tabby, apple pay</div>
        </div>
    </div>
  )
}

export default PrepaidExtraDiscount