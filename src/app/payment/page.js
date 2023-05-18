
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import styles from './pages.module.scss';

export default function Payment() {



    console.log("ht")
  
      return (
        <div className={styles.orderSummary}>
         
          <div className={styles.priceDetails}>
            <div className={styles.headerTxt}>Price Details</div>
            <PriceDetails />
          </div>
        </div>
      )
    }
    