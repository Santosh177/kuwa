"use client";

import React, { useContext, useEffect, useState } from 'react'


 const addressData = {
     listOfAddress: [],
     selectedAddress:{}
}

export const AddressContext = React.createContext({})


export const AddressProvider = ({ children, countryCode }) => {
   
  const [ listOfAddress , setListOfAddress] = useState([]);
  const [ selectedAddress , setSelectedAddress] = useState({});

  const data = {
    listOfAddress: listOfAddress,
    selectedAddress: selectedAddress
  }

  useEffect(()=>(
    getAddress()
  ),[])


  const getAddress = async() => {
    const getAddressResp  =  await fetch('/api/get-address', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const addressData = await getAddressResp.json();
    const addressList = addressData && addressData['billingAddresses'] && addressData['billingAddresses'];

    console.log("addressListaddressList",addressList)
    if(addressList && addressList.length > 0){
      setListOfAddress(addressList);
    }
    const defaultAddress = addressList.find((data) => data.isDefault);
    if(defaultAddress){
      setSelectedAddress(defaultAddress)
    }else{
      setSelectedAddress(addressList[0])
    }
  }

  
  
  return <AddressContext.Provider value={{...data,setSelectedAddress}}>{children}</AddressContext.Provider>
}



export const useAddressData = () => {
    const context = useContext(AddressContext);
    if (!context) {
      throw new Error("Called useSurvey before setting SurveyProvider context");
    }
    return context;
};