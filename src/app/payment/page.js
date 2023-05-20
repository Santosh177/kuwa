
import PageHeader from "@/components/PageHeader/PageHeader";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import PaymentFooterBtn from "./components/PaymentFooterBtn/PaymentFooterBtn";
import styles from './pages.module.scss';

export default function Payment() {



    console.log("ht")
  
      return (
        <div className={styles.orderSummary}>
          <PageHeader/>

          {/* <PaymentMethod /> */}
         
          {/* <div className={styles.priceDetails}>
            <div className={styles.headerTxt}>Price Details</div>
            <PriceDetails />
          </div> */}
          <PaymentFooterBtn />
        </div>
      )
    }
    