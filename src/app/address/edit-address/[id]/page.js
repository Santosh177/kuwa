'use client';
import React,{useEffect, useState }  from "react";
import { useRouter, useParams,useSearchParams } from 'next/navigation';
import { useAddressData } from "@/context/address";
import PageHeader from "@/components/PageHeader/PageHeader";
import AddressForm from "../../add-address/address-form/address-form";
import SubmitBtn from "../../component/SubmitBtn/SubmitBtn";


export default function AddAddress() {
  const router = useRouter()
  const params = useParams();
  const searchParams = useSearchParams();
  const refererPath = searchParams.get('referer');
  console.log("searchParams",refererPath)
  const editAddressid = params.id;
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={},setListOfAddress={} } = useAddressData();
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
      getAddress()
      router.push(refererPath);

  }
  const getAddress = async() => {
    const getAddressResp  =  await fetch('/api/get-address', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const addressData = await getAddressResp.json();
    const addressList = addressData && addressData['billingAddresses'] && addressData['billingAddresses'];
    if(addressList && addressList.length > 0){
      setListOfAddress(addressList);
    }
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
    