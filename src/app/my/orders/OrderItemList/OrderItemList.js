

import OrderItem from '../OrderItem/OrderItem';
import styles from './order-item-list.module.scss';





export default function OrderItemList({data}) {



  const orderItemData = { 
    orderId:data.orderId,
    productName:data.productName,
    productImg:data.productImage,
    orderStatus:data.orderStatus,
    orderProductId:data.orderProductId,
    expDelivery:data.expDelivery
  }


    return (
      <div className={styles.orderItemList}>
        <OrderItem data={orderItemData} />
      </div>
  
    )
  }
  