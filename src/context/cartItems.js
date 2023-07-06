"use client";

import React, { useContext, useEffect, useState } from 'react';
import { getCartItem} from '@/services';


export const CartItemContext = React.createContext({})


export const CartItemProvider = ({ children, countryCode }) => {
   
  const [ cartItemsData , setCartItemData] = useState([]);
  const [ cartItemCount , setCartItemCount] = useState({});




  useEffect(()=>{
      getCartItems();
  },[])

  useEffect(()=>{
    if(cartItemsData){
      if(cartItemsData && cartItemsData.quantity){
        setCartItemCount(cartItemsData.quantity)
      }
    }
  },[cartItemsData])

  const getCartItems = async() => {
    try {
      const getCartItems = await getCartItem();
      const cartItems  = getCartItems && getCartItems['products'] || [];
      setCartItemData(getCartItems)
      if(getCartItems && getCartItems.quantity){
        setCartItemCount(getCartItems.quantity)
      }
     
    } catch (error) {
      setCartItemData([])
      setCartItemCount(0)
    }
  


  }

  
  
  return <CartItemContext.Provider value={{cartItemCount,setCartItemData,setCartItemCount}}>{children}</CartItemContext.Provider>
}



export const useCartItems = () => {
    const context = useContext(CartItemContext);
    if (!context) {
      throw new Error("Called useSurvey before setting SurveyProvider context");
    }
    return context;
};