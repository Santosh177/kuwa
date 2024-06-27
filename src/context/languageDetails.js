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

  console.log("routerProperty",router)

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
      console.log("bjhbjq",langCode)

      const langData = listOfLanguages.find(lang => lang.language_code === langCode);
      if (langData) {
        setSelectedLanguage(langData);
        setIsArabic(langData.language_code === 'ar');
        setIsEnglish(langData.language_code === 'en');
        localStorage.setItem('selectedLanguage', langData.language_code);
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



