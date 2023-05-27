"use client";

import React, { useContext, useEffect, useState } from 'react'


export const CartItemContext = React.createContext({})


export const CartItemProvider = ({ children, countryCode }) => {
   
  const [ cartItemsData , setCartItemData] = useState([]);
  const [ cartItemCount , setCartItemCount] = useState({});




  useEffect(()=>{
      getCartItems();
  },[])

  const getCartItems = async() => {
    const getCartItemResp  =  await fetch('/api/get-cart-item', {
      method: 'GET',
      next: { revalidate: 0} 
    })
    const getCartItems = await getCartItemResp.json();
    const cartItems  = getCartItems && getCartItems['products'] || [];
    setCartItemData(cartItems)
    setCartItemCount(cartItems.length)


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