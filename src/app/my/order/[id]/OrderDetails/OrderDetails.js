'use client'
import { useRouter,usePathname } from 'next/navigation';
import OrderItem from '../OrderItem/OrderItem';
import OrderDeliveryStatus from '../OrderDeliveryStatus/OrderDeliveryStatus';
import OrderAddress from '../OrderAddress/OrderAddress';
import PriceDetails from '@/components/PriceDetails/PriceDetails';
import styles from './order-details.module.scss'

export default function OrderDetails({data}) {

  const router = useRouter()

  console.log("datadata",data)

  const {address={} , product={}, orderId="" , price={} } = data || {};
  const orderStatus = product['status']
  

  
  const priceDetailsData = {
    cartItemCount : product['quantity'],
    subTotal:(price['price'] * product['quantity']),
    totalAmount: price['total'],
    savedAmount:(price['total']- price['deliveryFee']),
    discountAmount:(price['discount']),
    currency:price['currency'],
    deliveryFees:price['deliveryFee']
  }

  return (
    <div className={styles.orderDetails}>
        <div className={styles.orderDetailsLeftContainer}>
            <OrderItem  product={product} orderId={orderId} currency={price['currency']}/>
            <OrderDeliveryStatus  orderStatus={orderStatus}/>
            <OrderAddress address={address} />
        </div>
        <div className={styles.orderDetailsRightContainer}>
            <PriceDetails data={priceDetailsData} />
            <div className={styles.needHelpTxt} onClick={()=>router.push('/contact-us')}>Need help ? <span>Contact Us</span></div>
            {orderStatus ==="CREATED" && <div className={styles.cancelOrderBtn} onClick={()=>router.push(`/my/order/cancellation-request/${product.productId}`)}>Cancel my order</div>}
        </div>
      
        
    </div>

  )
}
