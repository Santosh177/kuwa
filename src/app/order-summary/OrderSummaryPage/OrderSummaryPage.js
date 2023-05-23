'use client';
import DeliveryAddress from "../DeliveryAddress/DeliveryAddress";
import CartItemCard from "@/components/CartItemCard/CartItemCard";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PatmentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { useAddressData } from "@/context/address";
import styles from './order-summary-page.module.scss';
import {getCartItemDetails} from "@/utils";
import { useEffect, useState } from "react";


export default function OrderSummaryPage({cartData}) {

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
                <PriceDetails />
              </div>
            </div>
          </div>
          <PatmentFooterBtn btnName="Proceed to next"  totalPrice="AED  350"/>
        </>
      )
    }
    