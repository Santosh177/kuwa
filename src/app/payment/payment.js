'use client';
import CouponCode from "./components/CouponCode/CouponCode";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import PaymentFooterBtn from "./components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails } from "@/utils";
import styles from './payment.module.scss';
import { useState , useEffect} from "react";

export default function Payment({cartData}) {

  console.log("data",cartData)
  const [data, setData] = useState(cartData);
  const [cartItems , setCartItems] = useState([]);
  const [ priceDetails , setPriceDetails] = useState({});


  useEffect(()=>{
    if(data && Object.keys(data).length > 0 ){
            if(data['products']){
                getData();
            }
            
    }
},[data]);


const getData = async() => {
    const getCartItem = await getCartItemDetails(data['products']);
    setCartItems(getCartItem)
}

useEffect(()=>{
  if(cartItems && cartItems.length > 0){
    getPriceDetails()

  }

},[cartItems]);

const getPriceDetails = () => {
  const { total=0, subtotal=0, currency = "Dhs" } = data || {};
  const priceDetails2 = {
    cartItemCount: cartItems && cartItems.length,
    subTotal: subtotal,
    totalAmount: total,
    savedAmount: total - subtotal,
    discountAmount:total - subtotal,
    currency:currency
  }
  setPriceDetails(priceDetails2)
}



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
                <PriceDetails data={priceDetails}/>
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
                <PriceDetails data={priceDetails} />
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
    