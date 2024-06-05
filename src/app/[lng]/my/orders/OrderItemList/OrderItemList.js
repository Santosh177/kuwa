
'use client';
import OrderItem from '../OrderItem/OrderItem';
import styles from './order-item-list.module.scss';
import { useRouter } from 'next/navigation';




export default function OrderItemList({ data, index}) {
  console.log("OrderItemList",OrderItemList)
  const router = useRouter();
  const orderItemData = { 
    orderId:data.orderId,
    productId:data.productId,
    productName: data.orderProductName,
    productImg: data.productId ? data.productImage : data.variantImage,
    orderStatus: data.orderProductStatus,
    orderProductId:data.orderProductId,
    expDelivery: data.expectedDelivery,
    rating: data.avgRating,
    productNameArabic:data.orderProductNameArabic
  }


    return (
      <div className={styles.orderItemList} 
        onClick={() => router.push(`/my/order/${data.orderId}`)}
      >
        <OrderItem data={orderItemData} index={index} />
      </div>
  
    )
  }
  