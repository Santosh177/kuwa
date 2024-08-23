'use client';
import { useRouter,useSearchParams } from 'next/navigation';
import PageHeader from "@/app/[lng]/components/PageHeader/PageHeader";
import Loader from "@/app/[lng]/components/Loader/Loader";
import PageStepTracker from "@/app/[lng]/components/PageStepTracker/PageStepTracker";
import AddressForm from "./address-form/address-form";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import styles from './page.module.scss';
import { useEffect, useState } from "react";
import { useAuth } from '@/context/userDetail';
import { useAddressData } from "@/context/address";
import { useCountry } from '@/context/contryDetails';
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';
import { queryParams } from '@/services';
// import { mixPanelTrackEvent } from '@/app/page';
import { mixPanelTrackEvent } from '../../page';
import { useLanguage } from '@/context/languageDetails';
import QatarAddressForm from './components/QatarAddressForm/QatarAddressForm';

export default function AddAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedCountry={} } = useCountry();
  const { isLogin=false,userData={}} = useAuth();
  const refererPath = searchParams.get('referer');
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} , setListOfAddress={} } = useAddressData();
  const [ addressData, setAddressData] = useState({});
  const [ getFormValues , setGetFormValues] = useState(0);
  const [ isLoading , setIsLoading] = useState(false);
  const [error,setError] = useState({})
  const clevertapEvent = useCleverTapEvents();
  const [pageType, setPageType] = useState(getPageType())
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();




    const onFormData = (formData) => {
      setAddressData(formData)
    }

    const onSaveAddress = () => {
      setGetFormValues(getFormValues => getFormValues + 1)
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

    const onGetFormValues = async(data) => {
      console.log("onGetFormValues",data)
      if(isLogin){
        onAddAddress(data)
      }else{
        const { firstName="" , lastName="" , mobNumber="" ,email="" } = data && data['shippingAddress']
        const nonSignupUser = {
            "email": email,
            "firstName":firstName,
            "lastName": lastName,
            "mobileNumber":mobNumber,
            "deviceType":getDeviceType(),
            "pageType":pageType
        }
          const signUpResp = await fetch('/api/signup', {
            method: 'POST',
            body:JSON.stringify(nonSignupUser)
          })
          const signupRespData = await signUpResp.json();
          console.log("signupRespData",signupRespData)
          if(signupRespData &&   signupRespData.status_code &&   signupRespData.status_code == 200 && signupRespData.data){
            const name = signupRespData.data.firstName+ ' ' +signupRespData.data.lastName;
            const userId = signupRespData && signupRespData.data&& signupRespData.data.id || null
            const phone = signupRespData.data.mobileNumber ;
            const email = signupRespData.data.email;
            const countryName = selectedCountry && selectedCountry.name ||  ""
            if(userId){
              window.clevertap?.onUserLogin?.push({
                "Site": {
                  "Name": name,            // String
                  "Identity": userId,              // String or number
                  "Email": email,         // Email address of the user
                  "Phone": phone, 
                  "Country":countryName,
                  "MSG-email": true,                // Disable email notifications
                  "MSG-push": true,                  // Enable push notifications
                  "MSG-sms": true,                   // Enable sms notifications
                  "MSG-whatsapp": true,              // Enable WhatsApp notifications
                },
                "cart_items": []
               })
               
               window.clevertap?.event?.push("kuwa_user_add_address_signup_success", {
                "Country":countryName,
                "Email":email,
                "Name": name,
                "Phone": phone
              });
            }
          }
          signupRespData.status_code=== 200 ? 
          onAddAddress(data) : setError({email:signupRespData.data.message})
      }
     
    }

    const onAddAddress = async(data) =>{
   
      clevertapEvent.onCleverTapEvent("kuwa_add_address_save_and_proceed",{}); 
      if(isLogin) {
        mixPanelTrackEvent("kuwa_add_address_save_and_proceed",{},userData.id)
      }
      else{
        mixPanelTrackEvent("kuwa_add_address_save_and_proceed",{})
      }
      try {
        setIsLoading(true)
        const res = await fetch('/api/save-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(data)
        })
        setIsLoading(false)
        if (res.status === 200) {
          const saveAddress = await res.json()
          setSelectedAddress(saveAddress['shippingAddress']);
          setListOfAddress(currentState => [...currentState, saveAddress['shippingAddress']])
          if(refererPath){
            // router.replace(refererPath)
            window.location.replace(refererPath)
          }else{
  let productId = searchParams.get('productId') || "" 
  let variantId = searchParams.get('variantId') || ""
  if(productId){
    const queryString = queryParams(productId,variantId)
    window.location.replace(`/payment?${queryString}`)
  }
  else{
    window.location.replace('/payment')
  }
           
            // router.replace('/order-summary')
          }
          
        } else {
          throw new Error(await res.text())
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
      }
    }

    useEffect(()=>{
      clevertapEvent.onCleverTapEvent("kuwa_add_address_landing"); 
      if(isLogin){
        mixPanelTrackEvent("kuwa_add_address_landing",{Logged:isLogin},userData.id)
      } 
      else{
        mixPanelTrackEvent("kuwa_add_address_landing",{Logged:isLogin})
      }
    },[])

  
      return (
        <>
          <PageHeader headerName={isArabic ? "إضافة عنوان" : "Add Address"} />
         {!refererPath && <PageStepTracker stepCount={1} />}
          <div className={styles.addAddressWrapper}> 
              {selectedCountry.code !== "QA" && <AddressForm error={error} getFormValues={getFormValues} onGetFormValues={onGetFormValues} onFormData={onFormData} formData={addressData}/>}
              {selectedCountry.code == "QA" && <QatarAddressForm error={error} getFormValues={getFormValues} onGetFormValues={onGetFormValues} onFormData={onFormData} formData={addressData}/>}
              <SubmitBtn onSaveAddress={onSaveAddress}/>
          </div>
          <Loader  isShow={isLoading}/>
        </>
      )
    }
    
