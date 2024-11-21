import styles from './order-item.module.scss';
import { useLanguage } from '@/context/languageDetails';


export default  function OrderItem({product={},orderId="",currency=""}) {

    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  product={
      image: product.productImage,
      name: product.productName,
      quantity: product.productQuantity,
      price: product.productPriceSpecialAmount,
      productOrderStatus: product.orderStatus,
  }



  return (
        <div className={styles.orderItemWrapper}>
            {/* <div className={styles.orderId}>Order ID : #{orderId}</div> */}
            <div className={styles.orderItem}>
                <div className={styles.orderItemImg}>
                    <img src={product.image || 'https://d25uasl7utydze.cloudfront.net/assets/no_image.png'} alt='product-img'/>
                </div>
                <div className={styles.orderItemInfoContainer}>
                    <div className={styles.orderItemInfo}>
                        <div className={styles.orderItemName}>{product.name}</div>
                        <div className={styles.qty}>{isArabic ? "الكمية" : "QTY"} : <span>{product.quantity}</span></div>
                    </div>
                    <div className={styles.orderPrice}>{currency} {product.price}</div>
                  {product.productOrderStatus && product.productOrderStatus==="CANCELED" && <div className={styles.productOrderStatus}>{isArabic ? "حالة الطلب" : "Order Status"} : <span>{product.productOrderStatus}</span> </div>}
                </div>
            </div>
        </div>
  )
}
