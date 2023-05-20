import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import DeliveryAddress from "./DeliveryAddress/DeliveryAddress";
import CartItemCard from "@/components/CartItemCard/CartItemCard";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PatmentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import styles from './pages.module.scss';

export default function AllProduct() {



    console.log("ht")
  
      return (
        <>
          <PageHeader headerName="Order Summary"/>
          <PageStepTracker stepCount={2} />
         
          <div className={styles.orderSummary}>
            <div className={styles.addressAndProductDetails}> 
              <div className={[styles.headerTxt,styles.addressTxt].join(" ")}>Address & product details</div>
              <DeliveryAddress />
              <CartItemCard />
              <CartItemCard />
            </div>
            <div className={styles.priceDetails}>
              <div className={styles.headerTxt}>Price Details</div>
              <div className={styles.priceDetailsContainer}>
                <PriceDetails />
              </div>
            </div>
          </div>
          <PatmentFooterBtn btnName="Proceed to next"  totalPrice="AED  350"/>
        </>
      )
    }
    