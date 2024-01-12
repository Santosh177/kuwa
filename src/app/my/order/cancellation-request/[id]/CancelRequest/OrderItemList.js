

import OrderItem from './OrderItem';
import styles from './order-item-list.module.scss';





export default function OrderItemList({ data }) {



    const orderItemData = {
        orderId: data.childOrderId,
        productId: data.productId,
        productName: data.name,
        productImg: data.image,
        orderStatus: data.status,
        orderProductId: data.parentOrderId,
        expDelivery: (data && data.expDelivery && data.expDelivery)||"",
        rating: (data && data.rating && data.rating)||"",
    }
    console.log("orderItemData", orderItemData)

    return (
        <div className={styles.orderItemList}>
            <OrderItem data={orderItemData} />

        </div>

    )
}
