import styles from './order-item.module.scss';


export default async function OrderItem({}) {



  return (
        <div className={styles.orderItemWrapper}>
            <div className={styles.orderId}>Order ID : #5433</div>
            <div className={styles.orderItem}>
                <div className={styles.orderItemImg}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/image+74+(1).png' alt='product-img'/>
                </div>
                <div className={styles.orderItemInfoContainer}>
                    <div className={styles.orderItemInfo}>
                        <div className={styles.orderItemName}>Korean Marine Collagen Peptides, 200 Gms</div>
                        <div className={styles.qty}>QTY :<span> 1</span></div>
                    </div>
                    <div className={styles.orderPrice}>AED 350</div>
                </div>
            </div>
        </div>
  )
}
