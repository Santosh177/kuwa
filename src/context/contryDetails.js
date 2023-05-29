"use client";

import React, { useContext, useEffect, useState } from 'react'


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


export const CountryProvider = ({ children, countryCode,selectedCountryData }) => {
   
  const [ selectedCountry , setSelectedCountry ] = useState(selectedCountryData);


  
  
//   console.log("countryDetail+++",countryDetail)
//   useEffect(()=>{
//     if(userData){
//         const data = {
//             selectedCountry:"UAE"
//         }
//         // setCountryDetails(data)
//     }

//   },[userData])





  const data = getTimezoneOffset();

  console.log("FINEEE",data)

  
  return <CountryContext.Provider value={{data,selectedCountry,setSelectedCountry}}>{children}</CountryContext.Provider>
}



export const useCountry = () => {
    const context = useContext(CountryContext);
    if (!context) {
      throw new Error("Called useSurvey before setting SurveyProvider context");
    }
    return context;
};