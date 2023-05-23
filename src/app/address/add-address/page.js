'use client';
import { useRouter } from 'next/navigation';
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import AddressForm from "./address-form/address-form";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import styles from './page.module.scss';
import { useState } from "react";
import { useAddressData } from "@/context/address";


export default function AddAddress() {
  const router = useRouter();
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} } = useAddressData();
  const [ addressData, setAddressData] = useState({})



    const onSaveAddress = async(data) =>{
      try {
        const res = await fetch('/api/save-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify(addressData)
        })
        if (res.status === 200) {
          const saveAddress = await res.json()
          setSelectedAddress(saveAddress);
          router.push('/order-summary')
        } else {
          // throw new Error(await res.text())
        }
      } catch (error) {
        console.error('An unexpected error happened occurred:', error)
      }

    }

    const onFormData = (formData) => {
      setAddressData(formData)
    }

  
      return (
        <>
          <PageHeader headerName="Add Address" />
          <PageStepTracker />
          <div className={styles.addAddressWrapper}> 
              <AddressForm  onFormData={onFormData} formData={addressData}/>
              <SubmitBtn onSaveAddress={onSaveAddress}/>
          </div>
        </>
      )
    }
    