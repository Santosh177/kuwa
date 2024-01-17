

import OrderItem from '../OrderItem/OrderItem';
import styles from './order-item-list.module.scss';





export default function OrderItemList({ data, index=0}) {

  const orderItemData = { 
    orderId:data.orderId,
    productId:data.productId,
    productName: data.orderProductName,
    productImg: data.productId ? data.productImage : data.variantImage,
    orderStatus: data.orderProductStatus,
    orderProductId:data.orderProductId,
    expDelivery: data.expectedDelivery,
    rating: data.avgRating
  }


    return (
      <div className={styles.orderItemList}>
        <OrderItem data={orderItemData} index={index} />
        
      </div>
  
    )
  }
  