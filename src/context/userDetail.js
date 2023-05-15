"use client";

import React, { useContext, useEffect, useState } from 'react'


export const userInfo = {
   
}


const AuthContext = React.createContext({})


export const AuthProvider = ({ children, userData }) => {

  
  return <AuthContext.Provider value={{userData}}>{children}</AuthContext.Provider>
}



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("Called useSurvey before setting SurveyProvider context");
    }
    return context;
};