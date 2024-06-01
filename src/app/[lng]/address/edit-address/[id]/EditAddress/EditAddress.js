'use client';
import React,{useEffect, useState }  from "react";
import { useRouter, useParams,useSearchParams } from 'next/navigation';
import { useAddressData } from "@/context/address";
import PageHeader from "@/app/[lng]/components/PageHeader/PageHeader";
import AddressForm from "../../../add-address/address-form/address-form";
import SubmitBtn from "../../../component/SubmitBtn/SubmitBtn";
import styles from './edit-address.module.scss';
import Loader from "@/app/[lng]/components/Loader/Loader";


import { queryParams } from "@/services";


export default function AddAddress() {
  const router = useRouter()
  const params = useParams();
  const searchParams = useSearchParams();
  const refererPath = searchParams.get('referer');

  const productId = searchParams.get('productId');
  const variantId = searchParams.get('variantId')
  let queryString = ''
  if(productId){
    queryString = queryParams(productId,variantId)
  }

  console.log("searchParams",refererPath)
  const editAddressid = params.id;
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={},setListOfAddress={} } = useAddressData();
  const [ addressData, setAddressData] = useState({});
  const [ getFormValues , setGetFormValues] = useState(0);
  const [isUpdateSuccess,setIsUpdateSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

    let editAddressData = {
      data:data,
      shippingAddressId: data.shippingAddress.id
    }
    try {
      setIsLoading(true)
  
      const updateAddressResp  =  await fetch(`/api/update-address`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(editAddressData),
        cache: 'no-store'
      })
      setIsLoading(false)
        const updateAddress = await updateAddressResp.json();
        getAddress()
        if(refererPath){
          setIsUpdateSuccess(true)
          router.replace(`${refererPath}/?${queryString}`)
        }else{
          router.replace(`/payment/?${queryString}`)
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
          <div className={styles.editAddressWrapper}> 
              <AddressForm getFormValues={getFormValues} onGetFormValues={onGetFormValues} onFormData={(formData)=>onFormData(formData)} formData={addressData} isEdit={true}/>
              <SubmitBtn isUpdateSuccess={isUpdateSuccess}  btnName="Update Address" onClick={onUpdateAddress}/>
              <Loader  isShow={isLoading}/>
          </div>
        </>
      )
    }
    
