
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import styles from './page.module.scss';

export default function AllProduct() {



    console.log("ht")
  
      return (
        <div className={styles.cartPage}>
          <div className={styles.cartItemsContainer}>
            <div className={styles.headerTxt}> Cart Items </div>
            <CartItemCard />
            <CartItemCard />
          </div>
          <div className={styles.priceDetailsContainer}>
            <div className={styles.headerTxt}>PriceDetails</div>
            <div className={styles.priceInfo}>
              <PriceDetails />
            </div>
            
          </div>
         
          
        </div>
      )
    }
    