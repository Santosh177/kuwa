
import DeliveryAddress from "./DeliveryAddress/DeliveryAddress";
import CartItemCard from "@/components/CartItemCard/CartItemCard";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import styles from './pages.module.scss';

export default function AllProduct() {



    console.log("ht")
  
      return (
        <div className={styles.orderSummary}>
          <div className={styles.addressAndProductDetails}> 
            <div className={styles.headerTxt}>Address & product details</div>
            <DeliveryAddress />
            <CartItemCard />
            <CartItemCard />
          </div>
          <div className={styles.priceDetails}>
            <div className={styles.headerTxt}>Price Details</div>
            <PriceDetails />
          </div>
        </div>
      )
    }
    