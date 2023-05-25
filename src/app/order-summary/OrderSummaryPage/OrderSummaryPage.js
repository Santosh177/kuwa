'use client';
import { useRouter } from 'next/navigation';
import { useCountryList } from '@/context/countryList';
import DeliveryAddress from "../DeliveryAddress/DeliveryAddress";
import CartItemCard from "@/components/CartItemCard/CartItemCard";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { useAddressData } from "@/context/address";
import styles from './order-summary-page.module.scss';
import {getCartItemDetails} from "@/utils";
import { useEffect, useState } from "react";


export default function OrderSummaryPage({cartData}) {
  const router = useRouter();
  const countryList = useCountryList();
  const deliveryFeesConfig = countryList.find((data) => data.code == "AE" || data.code == "AF")
  const { listOfAddress=[], selectedAddress ={},setSelectedAddress={},setListOfAddress={}} = useAddressData();
  const [ data , setData ] = useState(cartData);
    const [ cartItems , setCartItems ] = useState([]);
    const [ priceDetails , setPriceDetails ] = useState({});


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
    calculatePriceDetails()

  }

},[cartItems]);

const calculatePriceDetails = () => {
  const { total=0, subtotal=0, currency = "" } = data || {};
  const minThreshold = deliveryFeesConfig.minThreshold || 0;
  let  finalAmount = total;
  if(total < minThreshold){
    finalAmount = total + deliveryFeesConfig.deliveryFee
  }
   
  const priceDetailsData = {
    cartItemCount: cartItems && cartItems.length,
    subTotal: subtotal,
    totalAmount: finalAmount,
    savedAmount: total - subtotal,
    discountAmount:total - subtotal,
    currency:currency,
    deliveryFees: (total < minThreshold) ? deliveryFeesConfig.deliveryFee : 0
  }
  setPriceDetails(priceDetailsData)
}

 
const onUpdateItem = async(data) => {
  console.log("datadata",data)
  const updateItemResp  =  await fetch('/api/update-cart-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + "didToken",
      },
      body:JSON.stringify(data)
  })
  const cartItem = await updateItemResp.json();
  if(cartItem && cartItem.data){
    console.log("cartItem.datacartItem.data",cartItem.data)
    setData(cartItem.data)
  }

    // console.log("updateItemResp",datas);
    

}
 
const onProceed = () => {
    router.push('/payment');
 
}
  
      return (
        <>
          <div className={styles.orderSummary}>
            <div className={styles.addressAndProductDetails}> 
              <div className={[styles.headerTxt,styles.addressTxt].join(" ")}>Address & product details</div>
              <DeliveryAddress />

              {
                cartItems.map((data,index)=>{
                  return(
                    <CartItemCard data={data} key={index} onUpdateItem={onUpdateItem} />
                  )
                })
              }
              
            </div>
            <div className={styles.priceDetails}>
              <div className={styles.headerTxt}>Price Details</div>
              <div className={styles.priceDetailsContainer}>
                <PriceDetails data={priceDetails} />
              </div>
            </div>
          </div>
          <PaymentFooterBtn btnName="Proceed to next"  totalPrice={priceDetails.currency+" "+priceDetails.totalAmount} onProceed={onProceed} />
        </>
      )
    }
    