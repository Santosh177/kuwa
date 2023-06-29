'use client';
import {  useSearchParams, useRouter } from 'next/navigation';
import ResetPasswordHeader from './ResetPasswordHeader/ResetPasswordHeader';
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






export default function ResetPassword() {
   const router = useRouter()
    const [ password , setNewPassword ] = useState("");
    const [ repeatNewPassword, setRepeatNewPassword ] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    console.log("searchParams",searchParams)
    const token = searchParams.get('token') || '';
  

  console.log("token",token)
    const onInputChange =(e)=>{
        setNewPassword(e.target.value)
    }
    const updatePassword =async()=>{
      setIsLoading(true)
      if(password === repeatNewPassword) {
        try{
      const data = await fetch('/api/reset-password',{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token,password }), 
      })
      setIsLoading(false)
      const res = await data.json();
      if(res.statusCode === 200){
          router.push('/updated-password-successful')
      }
      else{
        setIsLoading(false)
        setError("Failed to update password. Please try again.");
      }
     
    }
    catch(error) {
      setIsLoading(false)
      console.error(error);
    
    }
    }
    else{
        setIsLoading(false);
      setError("Passwords do not match.");
    }
  }

      return (
        <>
         <ResetPasswordHeader />
         <div className={styles.resetPasswordContainer}>
            <div className={styles.txt}>Reset Password</div>
            <div className={styles.subTxt}>Enter a strong password</div>
            <div className={styles.passwordInputBoxContainer}>
                <Input lassName={styles.inputBox} type='password'  value={password || ""} placeHolder='New Password' onInputChange={(e)=>onInputChange(e) }  />
            </div>
            <div className={styles.passwordInputBoxContainer}>
                <Input lassName={styles.inputBox} type='password'  value={repeatNewPassword || ""} placeHolder='Repeat New Password' onInputChange={(e) => setRepeatNewPassword(e.target.value)}  />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.resetPasswordBtn} onClick={updatePassword}>
            {isLoading ? <Loader isShow={isLoading}  /> : ''}
            Save</div>
         </div>
        </>
        
      )
    }
    