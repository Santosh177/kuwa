"use client"
import React, { createContext, useState, useContext } from 'react';

// Create a context
const LanguageContext = createContext();

// Create a provider component
export const LanguageProvider = ({ children }) => {
  const listOfLanguage = [
    { id: '1', language_code: 'en', language_name: 'English' },
    { id: '2', language_code: 'ar', language_name: 'Arabic' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(listOfLanguage[0]); // Default to English
  const [isArabic, setIsArabic] = useState(selectedLanguage.language_code === 'ar');
  const [isEnglish, setIsEnglish] = useState(selectedLanguage.language_code === 'en');

  const changeLanguage = (id) => {
    const langData = listOfLanguage.find((lang) => lang.id === id);
    if (langData) {
      setSelectedLanguage(langData);
      setIsArabic(langData.language_code === 'ar');
      setIsEnglish(langData.language_code === 'en');
    }
  };

  return (
    <LanguageContext.Provider value={{ listOfLanguage, selectedLanguage, isArabic, isEnglish, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
