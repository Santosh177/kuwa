import OrderItem from '../OrderItem/OrderItem'
import OrderAddress from '../OrderAddress/OrderAddress';
import PriceDetails from '@/components/PriceDetails/PriceDetails';
import styles from './order-details.module.scss'

export default async function OrderDetails({}) {



  return (
    <div className={styles.orderDetails}>
        <OrderItem />
        <OrderAddress />
        <PriceDetails />
        <div className={styles.needHelpTxt}>Need help ? <span>Contact Us</span></div>
        <div className={styles.cancelOrderBtn}>Cancel my order</div>
        
    </div>

  )
}
