'use client'
import { useRouter,usePathname } from 'next/navigation';
import OrderItem from '../OrderItem/OrderItem';
import OrderDeliveryStatus from '../OrderDeliveryStatus/OrderDeliveryStatus';
import OrderAddress from '../OrderAddress/OrderAddress';
import PriceDetails from '@/components/PriceDetails/PriceDetails';
import styles from './order-details.module.scss'

export default function OrderDetails({data}) {

  const router = useRouter()


  const {address={} , product={}, orderId="" , price={} } = data || {};
  

  
  const priceDetailsData = {
    cartItemCount : product['quantity'],
    subTotal:(price['price'] * product['quantity']),
    totalAmount: price['total'],
    savedAmount:(price['total']- price['deliveryFee']),
    discountAmount:(price['discount']),
    currency:"",
    deliveryFees:price['deliveryFee']
  }


  console.log("http://localhost:3000/my/order/2801")
  return (
    <div className={styles.orderDetails}>
        <div className={styles.orderDetailsLeftContainer}>
            <OrderItem  product={product} orderId={orderId}/>
            <OrderDeliveryStatus />
            <OrderAddress address={address} />
        </div>
        <div className={styles.orderDetailsRightContainer}>
            <PriceDetails data={priceDetailsData} />
            <div className={styles.needHelpTxt}>Need help ? <span>Contact Us</span></div>
            <div className={styles.cancelOrderBtn} onClick={()=>router.push('/my/order/cancellation-request')}>Cancel my order</div>
        </div>
      
        
    </div>

  )
}
