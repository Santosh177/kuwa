
import OrderItem from './OrderItem';
import styles from './order-item-list.module.scss';





export default function OrderItemList({listOfMyOrder = [],currency, data={}, setPayloadData, payloadData = [] }) {



    const orderItemData = {
        orderId: data.orderId,
        productId: data.productId,
        orderProductId: data.orderProductId,
        productName: data.productName,
        productImg: data.productImage,
        orderStatus: data.orderStatus,
        // orderProductId: data.parentOrderId,
        expDelivery: (data && data.expDelivery && data.expDelivery) || "",
        rating: (data && data.rating && data.rating) || "",
        productPrice: data.productPriceSpecialAmount,
        quantity: data.productQuantity || 1,
    }

    return (
        <div className={styles.orderItemList}>
            <OrderItem
                data={orderItemData}
                setPayloadData={setPayloadData}
                payloadData={payloadData}
                currency={currency}
                listOfMyOrder={listOfMyOrder}
            />
        </div>

    )
}
