'use client';
import DeliveryAddress from "../DeliveryAddress/DeliveryAddress";
import CartItemCard from "@/components/CartItemCard/CartItemCard";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PatmentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { useAddressData } from "@/context/address";
import styles from './order-summary-page.module.scss';

export default function OrderSummaryPage({addressData}) {

  console.log("addressDataaddressData",addressData)

  const { selectedAddress ={},} = useAddressData();

  console.log("Dasdsa",selectedAddress)


  
      return (
        <>
          <div className={styles.orderSummary}>
            <div className={styles.addressAndProductDetails}> 
              <div className={[styles.headerTxt,styles.addressTxt].join(" ")}>Address & product details</div>
              <DeliveryAddress />
              <CartItemCard onUpdateItem={()=>{}}/>
              <CartItemCard onUpdateItem={()=>{}}/>
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
    