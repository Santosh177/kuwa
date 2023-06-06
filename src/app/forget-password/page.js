'use client';
import { useRouter } from 'next/navigation';
import ForgetPasswordHeader from './ForgePasswordHeader/ForgetPasswordHeader';
import Input from "@/components/Input/Input";
import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput';
import Loader from '@/components/Loader/Loader';
import styles from './page.module.scss';
import { useState } from 'react';

const validateForm = (formData) => {
  const errors = {};
  if (!formData.firstName) {
    errors.firstName = 'First name is required.';
  }
  if (!formData.lastName) {
    errors.lastName = 'Last name is required.';
  }
  if(!formData.mobNumber){
    errors.mobNumber = "Mobile number is required";
  }
  if(!formData.email){
    errors.email = "Email is required";
  }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Invalid email address.';
  }
  if(!formData.password){
    errors.password = "Password is required";
  }else if(!(formData.password.length > 7)){
    errors.password = "Passwords need to be a min. of 8 characters";
  }
  return errors;
};






export default function ForgetPassword() {

    const [ email , setEmail ] = useState("")
 
    const onInputChange =(e)=>{
        setEmail(e.target.value)
    }

      return (
        <>
         <ForgetPasswordHeader />
         <div className={styles.forgetPasswordContainer}>
            <div className={styles.txt}>Enter Registered E-mail</div>
            <div className={styles.subTxt}>You will get a link in your email</div>
            <div className={styles.emailInputBoxContainer}>
                <Input lassName={styles.inputBox} type='email'  value={email || ""} placeHolder='Email ID (ex. abc@gmail.com)' onInputChange={(e)=>onInputChange(e)}  />
            </div>
            <div className={styles.successMsg}>A link has been sent to your mail ID. If not found check spam folder.</div>
            <div className={styles.forgetPasswordBtn}>Send link</div>
         </div>
        </>
        
      )
    }
    