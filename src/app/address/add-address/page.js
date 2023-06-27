'use client';
import { useRouter,useSearchParams } from 'next/navigation';
import PageHeader from "@/components/PageHeader/PageHeader";
import Loader from "@/components/Loader/Loader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import AddressForm from "./address-form/address-form";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import styles from './page.module.scss';
import { useState } from "react";
import { useAuth } from '@/context/userDetail';
import { useAddressData } from "@/context/address";


export default function AddAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLogin=false} = useAuth();
  const refererPath = searchParams.get('referer');
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} , setListOfAddress={} } = useAddressData();
  const [ addressData, setAddressData] = useState({});
  const [ getFormValues , setGetFormValues] = useState(0);
  const [ isLoading , setIsLoading] = useState(false);
  const [error,setError] = useState({})


    const onFormData = (formData) => {
      setAddressData(formData)
    }

    const onSaveAddress = () => {
      setGetFormValues(getFormValues => getFormValues + 1)
    }

    const onGetFormValues = async(data) => {
      console.log("datadata",data)
      if(isLogin){
        onAddAddress(data)
      }else{
        const { firstName="" , lastName="" , mobNumber="" ,email="" } = data && data['shippingAddress']
        const nonSignupUser = {
            "email": email,
            "firstName":firstName,
            "lastName": lastName,
            "mobNumber":mobNumber
        }
          const signUpResp = await fetch('/api/signup', {
            method: 'POST',
            body:JSON.stringify(nonSignupUser)
          })
          const signupRespData = await signUpResp.json();
          console.log("signupRespData",signupRespData)
          signupRespData.status_code=== 200 ? 
          onAddAddress(data) : setError({email:signupRespData.data.message})
      }
     
    }

    const onAddAddress = async(data) =>{
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
            router.replace(refererPath)
          }else{
            router.replace('/order-summary')
          }
          
        } else {
          throw new Error(await res.text())
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
      }
    }

    

  
      return (
        <>
          <PageHeader headerName="Add Address" />
         {!refererPath && <PageStepTracker stepCount={1} />}
          <div className={styles.addAddressWrapper}> 
              <AddressForm error={error} getFormValues={getFormValues} onGetFormValues={onGetFormValues} onFormData={onFormData} formData={addressData}/>
              <SubmitBtn onSaveAddress={onSaveAddress}/>
          </div>
          <Loader  isShow={isLoading}/>
        </>
      )
    }
    