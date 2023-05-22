
'use client';
import React, { useEffect, useState } from "react"
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetailsInfo from "@/components/PriceDetails/PriceDetails";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails } from "@/utils";
import styles from './cart-page.module.scss';


export default  function Cart({cartData}) {

    const [ data , setData ] = useState(cartData);
    const [ cartItems , setCartItems ] = useState([]);
    const [ priceDetails , setPriceDetails ] = useState({});


    console.log("cartData",cartData)

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
      

      
     
        
    console.log("priceDetails.totalAmount",priceDetails.totalAmount)
  
      return (
        <>
          <div className={styles.cartPage}>
            <div className={styles.cartItemsContainer}>
              <div className={[styles.headerTxt,styles.cartHeaderTxt].join(" ")}> Cart Items </div>
              {
                cartItems.map((data, index)=>{
                  return(
                    <CartItemCard data={data} key={index} onUpdateItem={onUpdateItem} />
                  )
                })
              }
            </div>
            <div className={styles.priceDetailsContainer}>
              <div className={styles.headerTxt}>Price Details</div>
              <div className={styles.priceInfo}>
                <PriceDetailsInfo data={priceDetails} />
              </div>
              <CompanyInfo />
            </div>
          </div>
          <PaymentFooterBtn btnName="Proceed to checkout" totalPrice={priceDetails.totalAmount} />
        </>
      )
    }
    