// "use client"
// import React, { createContext, useState, useContext } from 'react';
// import { useRouter } from 'next/navigation';

// const LanguageContext = createContext();


// export const LanguageProvider = ({ children }) => {
//   const listOfLanguages = [
//     { id: '1', language_code: 'en', language_name: 'English' },
//     { id: '2', language_code: 'ar', language_name: 'Arabic' },
//   ];

//   const router = useRouter();
//   const [selectedLanguage, setSelectedLanguage] = useState(listOfLanguages[0]); 
//   const [isArabic, setIsArabic] = useState(selectedLanguage.language_code === 'ar');
//   const [isEnglish, setIsEnglish] = useState(selectedLanguage.language_code === 'en');

//   console.log("selectedLanguage",selectedLanguage)

//   const changeLanguage = (id) => {
//     console.log("sdjsbsjm")
//     const langData = listOfLanguages.find((lang) => lang.id == id);
//     console.log("langData",langData,id)
//     if (langData) {
//       setSelectedLanguage(langData);
//       setIsArabic(langData.language_code === 'ar');
//       setIsEnglish(langData.language_code === 'en');
      
//       const newLocale = langData.language_code;
//       const currentPath = window.location.pathname;
//       // const newPath = currentPath.replace(/^\/(en|ar)/, `/${newLocale}`);
//       const newPath = `/${newLocale}${currentPath.replace(/^\/(en|ar)/, '')}`;
      
//       router.push(newPath);
      
//     }
//   };


//   return (
//     <LanguageContext.Provider value={{ listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };


// export const useLanguage = () => useContext(LanguageContext);

"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const listOfLanguages = [
    { id: '1', language_code: 'en', language_name: 'English' },
    { id: '2', language_code: 'ar', language_name: 'Arabic' },
  ];

  const router = useRouter();

  const getInitialLanguage = () => {
    if (typeof window !== 'undefined') {
      const savedLanguageCode = localStorage.getItem('selectedLanguage');
      return listOfLanguages.find(lang => lang.language_code === savedLanguageCode) || listOfLanguages[0];
    }
    return listOfLanguages[0];
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getInitialLanguage);
  const [isArabic, setIsArabic] = useState(selectedLanguage.language_code === 'ar');
  const [isEnglish, setIsEnglish] = useState(selectedLanguage.language_code === 'en');

  useEffect(() => {
    const handleRouteChange = (url) => {
      const langCode = url.split('/')[1];
      const langData = listOfLanguages.find(lang => lang.language_code === langCode);
      if (langData) {
        setSelectedLanguage(langData);
        setIsArabic(langData.language_code === 'ar');
        setIsEnglish(langData.language_code === 'en');
        localStorage.setItem('selectedLanguage', langData.language_code);
      }
    };

    router.events?.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const changeLanguage = (id) => {
    const langData = listOfLanguages.find(lang => lang.id == id);
    if (langData) {
      setSelectedLanguage(langData);
      setIsArabic(langData.language_code === 'ar');
      setIsEnglish(langData.language_code === 'en');
      localStorage.setItem('selectedLanguage', langData.language_code);

      const newLocale = langData.language_code;
      const currentPath = window.location.pathname;
      const newPath = `/${newLocale}${currentPath.replace(/^\/(en|ar)/, '')}`;
      
      router.push(newPath);
    }
  };

  return (
    <LanguageContext.Provider value={{ listOfLanguages, selectedLanguage, isArabic, isEnglish, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);



