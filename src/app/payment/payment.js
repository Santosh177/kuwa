import CouponCode from "./components/CouponCode/CouponCode";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import PaymentFooterBtn from "./components/PaymentFooterBtn/PaymentFooterBtn";
import styles from './payment.module.scss';

export default function Payment() {



    console.log("ht")
  
      return (
        <>
          <div className={styles.orderSummary}>
              <div className={styles.couponCode}>
                <CouponCode />
              </div>
              <div className={styles.paymentMethod}>
                <PaymentMethod />
              </div>
              <div className={styles.priceDetails}>
                <div className={styles.headerTxt}>Price Details</div>
                <PriceDetails />
              </div>
              <PaymentFooterBtn />
          </div>
          <div className={styles.orderSummaryDesktop}>
              <div className={styles.paymentLeftContainer}>
                <div className={styles.couponCode}>
                  <CouponCode />
                </div>
                <div className={styles.priceDetails}>
                <div className={styles.headerTxt}>Price Details</div>
                <PriceDetails />
              </div>
              </div>
              <div className={styles.paymentMethod}>
                <PaymentMethod />
              </div>
            
              <PaymentFooterBtn />
          </div>
        </>
      )
    }
    