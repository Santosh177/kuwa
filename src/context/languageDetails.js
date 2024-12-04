"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter,usePathname  } from 'next/navigation';
import Loader from '@/app/[lng]/components/Loader/Loader';


const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const listOfLanguages = [
    { id: '1', language_code: 'en', language_name: 'English' },
    { id: '2', language_code: 'ar', language_name: 'العربية' },
  ];

  const router = useRouter();
  const pathname = usePathname();
 
  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      const savedLanguageCode = localStorage.getItem('selectedLanguage');
      return listOfLanguages.find(lang => lang.language_code === savedLanguageCode) || listOfLanguages[0];
    }
    return listOfLanguages[0];
  };

  console.log("initialLanguage",getInitialLanguage())

  const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage);
  const [isArabic, setIsArabic] = useState(selectedLanguage.language_code === 'ar');
  const [isEnglish, setIsEnglish] = useState(selectedLanguage.language_code === 'en');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      const langCode = window.location.pathname.split('/')[1];
    

      const langData = listOfLanguages.find(lang => lang.language_code === langCode);
      if (langData) {
        setSelectedLanguage(langData);
        setIsArabic(langData.language_code === 'ar');
        setIsEnglish(langData.language_code === 'en');
        localStorage.setItem('selectedLanguage', langData.language_code);
        document.cookie = `language_code=${langData.language_code}; path=/;`;
      }
      else {
        // If langData is undefined, default to English
        const defaultLangData = listOfLanguages.find(lang => lang.language_code === 'en');
        setSelectedLanguage(defaultLangData);
        setIsArabic(false);
        setIsEnglish(true);
        localStorage.setItem('selectedLanguage', 'en');
        document.cookie = `language_code=en; path=/;`;
    }
    };
     handleRouteChange()
  }, []);

 

  const changeLanguage = (id) => {
    const langData = listOfLanguages.find(lang => lang.id == id);
  
    if (langData) {
      setSelectedLanguage(langData);
      setIsArabic(langData.language_code === 'ar');
      setIsEnglish(langData.language_code === 'en');
      localStorage.setItem('selectedLanguage', langData.language_code);
      document.cookie = `language_code=${langData.language_code}; path=/;`;
    
      const newLocale = langData.language_code;
      const currentPath = window.location.pathname;
      let newPath;
      console.log("langData",id,langData,newLocale,currentPath,newPath);
      if(newLocale === "en"){
        console.log("qwbjqb")
        newPath = currentPath.replace(/^\/(en|ar)/, "");  
        // newPath = `/${newLocale}${currentPath.replace(/^\/(en|ar)/, '')}`;
      }
      else{
        newPath = `/${newLocale}${currentPath.replace(/^\/(en|ar)/, '')}`;
      }
      console.log("newPath",newPath)
        router.push(newPath);
      // window.location.href = newPath
    }
  };

  return (
    <LanguageContext.Provider value={{ listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);



