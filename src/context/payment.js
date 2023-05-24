"use client";

import React, { useContext, useEffect, useState } from 'react'




export const PaymentPageContext = React.createContext({})


export const PaymentPageProvider = ({ children,cartItemsResp }) => {
   
  const cartItems  = cartItemsResp && cartItemsResp['products'] || [];
  const [ couponCodeData , setCouponCodeData] = useState({})

  console.log("cartItemsRespcartItemsResp",cartItems)


  
  
  return <PaymentPageContext.Provider value={{cartItems,couponCodeData,setCouponCodeData}}>{children}</PaymentPageContext.Provider>
}



export const usePaymentPageData = () => {
    const context = useContext(PaymentPageContext);
    if (!context) {
      throw new Error("Called useSurvey before setting SurveyProvider context");
    }
    return context;
};