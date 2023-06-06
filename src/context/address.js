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


 useEffect(()=>{
    if(selectedAddress && selectedAddress.id){
      localStorage.setItem("addressId",JSON.stringify(selectedAddress.id))
    }

 },[selectedAddress])


  useEffect(()=>{
      getAddress();
  },[])

  const getAddress = async() => {
    const getAddressResp  =  await fetch('/api/get-address', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0} 
    })
    const addressData = await getAddressResp.json();
    const addressList = addressData && addressData['shippingAddress'] && addressData['shippingAddress'];
    if(addressList && addressList.length > 0){
      setListOfAddress(addressList);
    }
  }

  
  
  return <AddressContext.Provider value={{...data,setSelectedAddress,setListOfAddress}}>{children}</AddressContext.Provider>
}



export const useAddressData = () => {
    const context = useContext(AddressContext);
    if (!context) {
      throw new Error("Called useSurvey before setting SurveyProvider context");
    }
    return context;
};