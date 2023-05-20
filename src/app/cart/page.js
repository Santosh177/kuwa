import PageHeader from "@/components/PageHeader/PageHeader";
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "../payment/components/PaymentFooterBtn/PaymentFooterBtn";
import styles from './page.module.scss';

export default function Cart() {



  
      return (
        <>
          <PageHeader headerName="My Cart" />
          <div className={styles.cartPage}>
            <div className={styles.cartItemsContainer}>
              <div className={styles.headerTxt}> Cart Items </div>
              <CartItemCard />
              <CartItemCard />
            </div>
            <div className={styles.priceDetailsContainer}>
              <div className={styles.headerTxt}>Price Details</div>
              <div className={styles.priceInfo}>
                <PriceDetails />
              </div>
              <CompanyInfo />
            </div>
          </div>
          <PaymentFooterBtn />
        </>
      )
    }
    