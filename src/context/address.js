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
  console.log("manageSelectedAddress",selectedAddress)
    if(selectedAddress && selectedAddress.id){
      localStorage.setItem("addressId",JSON.stringify(selectedAddress.id))
    }

 },[selectedAddress,listOfAddress])


  useEffect(()=>{
      getAddress();
  },[])

  const getAddress = async() => {
    const getAddressResp  =  await fetch('/api/get-address', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    const addressData = await getAddressResp.json();
    const addressList = addressData && addressData['shippingAddress'] && addressData['shippingAddress'];
    const seletedDefaultAddress = addressData && addressData['shippingAddress'] && (addressData['shippingAddress']).find(data=>data.isDefaultAddress == true)
    console.log("bhabha",seletedDefaultAddress)
    console.log("addressList",addressList)
    if(addressList && addressList.length > 0){
      setListOfAddress(addressList);
      // setSelectedAddress(seletedDefaultAddress)
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