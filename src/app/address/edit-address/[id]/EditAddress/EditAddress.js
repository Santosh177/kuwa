'use client';
import React,{useEffect, useState }  from "react";
import { useRouter, useParams,useSearchParams } from 'next/navigation';
import { useAddressData } from "@/context/address";
import PageHeader from "@/components/PageHeader/PageHeader";
import AddressForm from "../../../add-address/address-form/address-form";
import SubmitBtn from "../../../component/SubmitBtn/SubmitBtn";


export default function AddAddress() {
  const router = useRouter()
  const params = useParams();
  const searchParams = useSearchParams();
  const refererPath = searchParams.get('referer');
  console.log("searchParams",refererPath)
  const editAddressid = params.id;
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={},setListOfAddress={} } = useAddressData();
  const [ addressData, setAddressData] = useState({});
  const [ getFormValues , setGetFormValues] = useState(0)

  useEffect(()=>{
    getEditAddress ();
  },[listOfAddress]);

  const getEditAddress = async() =>{
    const editAddressResp  =  await fetch(`/api/edit-address`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({id:editAddressid}),
        cache: 'no-store'
      })
      const editAddress = await editAddressResp.json();
      setAddressData(editAddress)
  }






  const onUpdateAddressw = async() =>{
      const updateAddressResp  =  await fetch(`/api/update-address`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(addressData),
        cache: 'no-store'
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
    const addressList = addressData && addressData['shippingAddress'] && addressData['shippingAddress'];
    if(addressList && addressList.length > 0){
      setListOfAddress(addressList);
    }
  }


  const onGetFormValues = async(data) => {
    console.log("datadata",data)
    try {
      // setIsLoading(true)
      const updateAddressResp  =  await fetch(`/api/update-address`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
        cache: 'no-store'
      })
      const updateAddress = await updateAddressResp.json();
      // setIsLoading(false)
      console.log("updateAddressupdateAddress",updateAddress)
      if (updateAddress.status === 200) {
        const updateAddress = await updateAddress.json()
        setSelectedAddress(saveAddress['shippingAddress']);
        setListOfAddress(currentState => [...currentState, saveAddress['shippingAddress']])
        if(refererPath){
          router.replace(refererPath)
        }else{
          router.replace('/order-summary')
        }
        
      } else {
        // throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
  }


  const onUpdateAddress = () => {
    setGetFormValues(getFormValues => getFormValues + 1)
  }
  const onFormData = (formData) => {

      setAddressData(formData)
    }
  
      return (
        <>
          <div > 
              <AddressForm getFormValues={getFormValues} onGetFormValues={onGetFormValues} onFormData={(formData)=>onFormData(formData)} formData={addressData} isEdit={true}/>
              <SubmitBtn  btnName="Update Address" onClick={onUpdateAddress}/>
          </div>
        </>
      )
    }
    