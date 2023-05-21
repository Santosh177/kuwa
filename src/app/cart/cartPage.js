
'use client';
import React, { useEffect, useState } from "react"
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails } from "@/utils";
import styles from './cart-page.module.scss';


export default  function Cart({cartData}) {

    const [ data , setData ] = useState(cartData);
    const [ cartItems , setCartItems ] = useState([]);
    const [ priceDetails , setCartDetails ] = useState({});

    // useEffect(()=>{
    //     if(data && Object.keys(data).length > 0 ){
    //         setCartItems(data)
    //     }
    // },[data])


    useEffect(()=>{
        if(data && Object.keys(data).length > 0 ){
                // setCartItems(data)
                if(data['products']){
                    getData();
                }
                
        }
    },[data]);


    const getData = async() => {
        const getCartItem = await getCartItemDetails(data['products']);
        console.log("getCartItemgetCartItem",getCartItem)
        setCartItems(getCartItem)
    }

  
    
      
      
      
      const priceDetails2 = {
        cartItemCount: 2,
        subTotal: 300,
        totalAmount: 300,
        savedAmount: 50,
        discountAmount:40,
        currency:'AED'
      }

      console.log("cartItemscartItems",cartItems)
        
  
      return (
        <>
          <div className={styles.cartPage}>
            <div className={styles.cartItemsContainer}>
              <div className={[styles.headerTxt,styles.cartHeaderTxt].join(" ")}> Cart Items </div>
              {
                cartItems.map((data, index)=>{
                  return(
                    <CartItemCard data={data} />
                  )
                })
              }
            </div>
            <div className={styles.priceDetailsContainer}>
              <div className={styles.headerTxt}>Price Details</div>
              <div className={styles.priceInfo}>
                <PriceDetails data={priceDetails2} />
              </div>
              <CompanyInfo />
            </div>
          </div>
          <PaymentFooterBtn btnName="Proceed to checkout" totalPrice="AED 350" />
        </>
      )
    }
    