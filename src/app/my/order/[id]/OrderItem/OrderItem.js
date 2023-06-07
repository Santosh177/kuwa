import styles from './order-item.module.scss';


export default async function OrderItem({product={},orderId=""}) {


    console.log("product",product)

  return (
        <div className={styles.orderItemWrapper}>
            <div className={styles.orderId}>Order ID : #{orderId}</div>
            <div className={styles.orderItem}>
                <div className={styles.orderItemImg}>
                    <img src={product.image} alt='product-img'/>
                </div>
                <div className={styles.orderItemInfoContainer}>
                    <div className={styles.orderItemInfo}>
                        <div className={styles.orderItemName}>{product.name}</div>
                        <div className={styles.qty}>QTY : <span>{product.quantity}</span></div>
                    </div>
                    <div className={styles.orderPrice}>AED {product.price}</div>
                </div>
            </div>
        </div>
  )
}
