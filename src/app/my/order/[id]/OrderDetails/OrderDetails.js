import OrderItem from '../OrderItem/OrderItem';
import OrderDeliveryStatus from '../OrderDeliveryStatus/OrderDeliveryStatus';
import OrderAddress from '../OrderAddress/OrderAddress';
import PriceDetails from '@/components/PriceDetails/PriceDetails';
import styles from './order-details.module.scss'

export default async function OrderDetails({data}) {


  const {address={} , product={}, orderId="" , price={} } = data || {}




  const { cartItemCount="", subTotal="" , totalAmount="", savedAmount="", discountAmount="" , currency="",deliveryFees=0} = data || {}

  const priceDetailsData = {
    cartItemCount : "",
    subTotal:"",
    totalAmount: "",
    savedAmount:"",
    discountAmount:"",
    currency:"",
    deliveryFees:0
  }

  return (
    <div className={styles.orderDetails}>
        <div className={styles.orderDetailsLeftContainer}>
            <OrderItem  product={product} orderId={orderId}/>
            <OrderDeliveryStatus />
            <OrderAddress address={address} />
        </div>
        <div className={styles.orderDetailsRightContainer}>
            <PriceDetails />
            <div className={styles.needHelpTxt}>Need help ? <span>Contact Us</span></div>
            <div className={styles.cancelOrderBtn}>Cancel my order</div>
        </div>
      
        
    </div>

  )
}
