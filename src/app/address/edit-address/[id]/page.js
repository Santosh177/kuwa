'use client';
import React,{useEffect, useState }  from "react";
import { useRouter, useParams,useSearchParams } from 'next/navigation';

import { useAddressData } from "@/context/address";
import PageHeader from "@/components/PageHeader/PageHeader";
import AddressForm from "../../add-address/address-form/address-form";
import SubmitBtn from "../../component/SubmitBtn/SubmitBtn";
// import styles from './page.module.scss';


export default function AddAddress() {
  const router = useRouter()
  const params = useParams();
  const searchParams = useSearchParams();
  const refererPath = searchParams.get('referer');
  console.log("searchParams",refererPath)
  const editAddressid = params.id;
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} } = useAddressData();
  const [ addressData, setAddressData] = useState({});


  useEffect(()=>{
    const editAddressData = listOfAddress.find(data => data.id == editAddressid)
    setAddressData(editAddressData)
  },[listOfAddress])






  const onUpdateAddress = async() =>{
      const updateAddressResp  =  await fetch(`/api/update-address`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(addressData),
        next: { revalidate: 0} 
      })
      const updateAddress = await updateAddressResp.json();
      console.log("updateAddressupdateAddress",updateAddress)
      router.push(refererPath);

  }


  const onFormData = (formData) => {
      setAddressData(formData)
    }

  
      return (
        <>
          <PageHeader headerName="Edit Address" />
          <div > 
              <AddressForm onFormData={(formData)=>onFormData(formData)} formData={addressData} isEdit={true}/>
              <SubmitBtn  btnName="Update Address" onClick={onUpdateAddress}/>
          </div>
        </>
      )
    }
    