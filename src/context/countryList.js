"use client";

import React, { useContext, useEffect, useState } from 'react'



export const CountryListContext = React.createContext({})


export const CountryListProvider = ({ children, countryList }) => {

  
  
  return <CountryListContext.Provider value={countryList}>{children}</CountryListContext.Provider>
}



export const useCountryList = () => {
    const context = useContext(CountryListContext);
    if (!context) {
      throw new Error("Called useSurvey before setting SurveyProvider context");
    }
    return context;
};