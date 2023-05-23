'use client';
import React,{useState }  from "react";
import PageHeader from "@/components/PageHeader/PageHeader";
import AddressForm from "../../add-address/address-form/address-form";
// import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
// import styles from './page.module.scss';


export default function AddAddress() {

  const data = {
    address:"dd",
    firstName:"d",
    lastName:"d",
    phone:"d9240234",
    stateProvince:"324234",
    apartment:"234",
    country:"Ae"
  }

  const [ addressData, setAddressData] = useState(data)
  
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
    