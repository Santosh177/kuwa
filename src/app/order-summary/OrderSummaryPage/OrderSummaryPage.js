'use client';
import DeliveryAddress from "../DeliveryAddress/DeliveryAddress";
import CartItemCard from "@/components/CartItemCard/CartItemCard";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PatmentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { useAddressData } from "@/context/address";
import styles from './order-summary-page.module.scss';
import { useEffect } from "react";


export default function OrderSummaryPage({addressData}) {

  const { listOfAddress=[], selectedAddress ={},setSelectedAddress={},setListOfAddress={}} = useAddressData();



  useEffect(()=>{
    if(selectedAddress && Object.keys(selectedAddress).length == 0){
          const defaultAddress = listOfAddress.find((data) => data.isDefault);
          if(defaultAddress){
            setSelectedAddress(defaultAddress)
          }else{
            setSelectedAddress(listOfAddress[0])
          }
    }
  },[listOfAddress])

 

 
  
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
    