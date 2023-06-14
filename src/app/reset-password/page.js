'use client';
import { useRouter } from 'next/navigation';
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

    const [ newPassword , setNewPassword ] = useState("");
    const [ repeatNewPassword, setRepeatNewPassword ] = useState("")
 
    const onInputChange =(e)=>{
        setNewPassword(e.target.value)
    }

      return (
        <>
         <ResetPasswordHeader />
         <div className={styles.resetPasswordContainer}>
            <div className={styles.txt}>Reset Password</div>
            <div className={styles.subTxt}>Enter a strong password</div>
            <div className={styles.passwordInputBoxContainer}>
                <Input lassName={styles.inputBox} type='password'  value={newPassword || ""} placeHolder='New Password' onInputChange={(e)=>onInputChange(e)}  />
            </div>
            <div className={styles.passwordInputBoxContainer}>
                <Input lassName={styles.inputBox} type='password'  value={repeatNewPassword || ""} placeHolder='Repeat New Password' onInputChange={(e)=>onInputChange(e)}  />
            </div>
            <div className={styles.resetPasswordBtn}>Save</div>
         </div>
        </>
        
      )
    }
    