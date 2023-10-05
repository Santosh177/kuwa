"use client";

import React, { useContext, useEffect, useState } from 'react'
import { useRouter,usePathname } from 'next/navigation';

 const countryDetails = {
      countryCode:"",
      countryId:""
}
const getTimezoneOffset = () =>{
  function z(n){return (n<10? '0' : '') + n}
  var offset = new Date().getTimezoneOffset();
  var sign = offset < 0? '+' : '-';
  offset = Math.abs(offset);
  return sign + z(offset/60 | 0) + z(offset%60);
}

export const CountryContext = React.createContext({})


export const CountryProvider = ({ children, countryCode,selectedCountryData , countryList=[]}) => {
   
  const [ selectedCountry , setSelectedCountry ] = useState(selectedCountryData);
  const router = useRouter()


  
  useEffect(()=>{
    if(selectedCountryData && Object.keys(selectedCountryData).length == 0){
         const data = getTimezoneOffset();
         const timeZoneCountry = countryList.find((data,index)=>data.id == 8)
         setSelectedCountry(timeZoneCountry)
         updateCountryData(timeZoneCountry);
    }
  },[countryList,selectedCountryData])




  const updateCountryData = async(data) => {
    if(selectedCountryData && Object.keys(selectedCountryData).length == 0){
      const coutryApiResp = await fetch('/api/update-country', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({countryId:data.id})
      })
      const coutryApiData = await coutryApiResp.json();
      router.refresh();
    }
  }





  
  return <CountryContext.Provider value={{selectedCountry,setSelectedCountry}}>{children}</CountryContext.Provider>
}



export const useCountry = () => {
    const context = useContext(CountryContext);
    if (!context) {
      throw new Error("Called useSurvey before setting SurveyProvider context");
    }
    return context;
};