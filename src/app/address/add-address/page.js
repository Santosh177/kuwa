'use client';
import { useRouter,useSearchParams } from 'next/navigation';
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import AddressForm from "./address-form/address-form";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import styles from './page.module.scss';
import { useState } from "react";
import { useAddressData } from "@/context/address";


export default function AddAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refererPath = searchParams.get('referer');
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} , setListOfAddress={} } = useAddressData();
  const [ addressData, setAddressData] = useState({});
  const [ getFormValues , setGetFormValues] = useState(false);


    const onFormData = (formData) => {
      setAddressData(formData)
    }

    const onSaveAddress = () => {
      setGetFormValues(true)
    }

    const onGetFormValues = async(data) => {
      console.log("datadata",data)
      try {
        const res = await fetch('/api/save-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(data)
        })
        if (res.status === 200) {
          const saveAddress = await res.json()
          setSelectedAddress(saveAddress['shippingAddress']);
          setListOfAddress(currentState => [...currentState, saveAddress['shippingAddress']])
          if(refererPath){
            router.push(refererPath)
          }else{
            router.push('/order-summary')
          }
          
        } else {
          // throw new Error(await res.text())
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
      }
    }

    

  
      return (
        <>
          <PageHeader headerName="Add Address" />
          <PageStepTracker stepCount={1} />
          <div className={styles.addAddressWrapper}> 
              <AddressForm  getFormValues={getFormValues} onGetFormValues={onGetFormValues} onFormData={onFormData} formData={addressData}/>
              <SubmitBtn onSaveAddress={onSaveAddress}/>
          </div>
        </>
      )
    }
    