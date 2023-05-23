'use client';
import React,{useEffect, useState }  from "react";
import { useRouter, useParams } from 'next/navigation';

import { useAddressData } from "@/context/address";
import PageHeader from "@/components/PageHeader/PageHeader";
import AddressForm from "../../add-address/address-form/address-form";
// import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
// import styles from './page.module.scss';


export default function AddAddress() {
  const router = useRouter()
  const params = useParams();
  const editAddressid = params.id;
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} } = useAddressData();
  const data = {
    address:"dd",
    firstName:"d",
    lastName:"d",
    phone:"d9240234",
    stateProvince:"324234",
    apartment:"234",
    country:"Ae"
  }
  const [ addressData, setAddressData] = useState({});


  useEffect(()=>{
    console.log("listOfAddress",listOfAddress)
    const editAddressData = listOfAddress.find(data => data.id == editAddressid)
    setAddressData(editAddressData)
  },[listOfAddress])




  console.log("addressData+++",addressData)


  
      return (
        <>
          <PageHeader headerName="Edit Address" />
          <div > 
              <AddressForm onFormData={()=>{}} formData={addressData} isEdit={true}/>
              {/* <SubmitBtn /> */}
          </div>
        </>
      )
    }
    