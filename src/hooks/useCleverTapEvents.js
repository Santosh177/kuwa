import React ,{useState,useEffect} from 'react'
import { useCountry } from '@/context/contryDetails';
import { useAuth } from '@/context/userDetail';
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';
import { useLanguage } from '@/context/languageDetails';
function useCleverTapEvents(initialValue) {
    const { selectedCountry = {} } = useCountry();
    const { name = "", id = "", currency="" }=selectedCountry||{}
    const { isLogin = false, userData = {} } = useAuth();
    const [pageType, setPageType] = useState(getPageType())
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    useEffect(() => {
        const handleResize = () => {
          setPageType(getPageType());
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    function getPageType() {
        return window.innerWidth > 770 ? 'web' : 'mWeb';
      }

      function getDeviceType() {
        if (isMobile) {
          if (isAndroid) {
            return 'Android';
          } else if (isIOS) {
            return 'iOS';
          } else {
            return 'Mobile';
          }
        } else if (isTablet) {
          return 'Tablet';
        } else {
          return 'Desktop';
        }
      }
   
    const onCleverTapEvent = (eventName="",data={}) => {

      console.log("hbwdhqbwh",selectedLanguage)
        console.log("cleverTap_event_name",eventName,data)
        console.log("wbjkq",isLogin)
        data['country'] = name || '';
        data['countryId'] = id || '';
        data['currency'] = currency || '';
        data['Logged'] = isLogin || false;
        data['Device'] = getDeviceType();
        data['Source']= pageType;
        data['language'] = selectedLanguage.language_name
        try{
            window.clevertap.event.push(eventName, data)
        }catch(error){
            console.log("Clevertap event Error", error)
        }
    };



    return { onCleverTapEvent };
}

export default useCleverTapEvents;