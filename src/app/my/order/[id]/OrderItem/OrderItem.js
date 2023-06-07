import styles from './order-item.module.scss';


export default  function OrderItem({product={},orderId="",currency=""}) {


    console.log("product",product)

    const price = (product.price * product.quantity)

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
                    <div className={styles.orderPrice}>{currency} {price}</div>
                </div>
            </div>
        </div>
  )
}
