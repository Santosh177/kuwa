'use client';
import {  useSearchParams, useRouter } from 'next/navigation';
import ResetPasswordHeader from './ResetPasswordHeader/ResetPasswordHeader';
import Input from "@/app/[lng]/components/Input/Input";
import PhoneNumberInput from '@/app/[lng]/components/PhoneNumberInput/PhoneNumberInput';
import Loader from '@/app/[lng]/components/Loader/Loader';
import styles from './page.module.scss';
import { useState } from 'react';
import { useLanguage } from '@/context/languageDetails';


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
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

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
        setError( isArabic ? "فشل في تحديث كلمة المرور. يرجى المحاولة مرة أخرى" : "Failed to update password. Please try again.");
      }
     
    }
    catch(error) {
      setIsLoading(false)
      console.error(error);
    
    }
    }
    else{
        setIsLoading(false);
      setError(isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match.");
    }
  }

      return (
        <>
         <ResetPasswordHeader />
         <div className={styles.resetPasswordContainer}>
            <div className={styles.txt}>{isArabic ? "إعادة تعيين كلمة المرور" : "Reset Password"}</div>
            <div className={styles.subTxt}>{isArabic ? "أدخل كلمة مرور قوية" : "Enter a strong password"}</div>
            <div className={styles.passwordInputBoxContainer}>
                <Input lassName={styles.inputBox} type='password'  value={password || ""} placeHolder={isArabic ? "كلمة المرور الجديدة" : 'New Password'} onInputChange={(e)=>onInputChange(e) }  />
            </div>
            <div className={styles.passwordInputBoxContainer}>
                <Input lassName={styles.inputBox} type='password'  value={repeatNewPassword || ""} placeHolder={isArabic ? "أعد إدخال كلمة المرور الجديدة" : 'Repeat New Password'} onInputChange={(e) => setRepeatNewPassword(e.target.value)}  />
            </div>
            {error && <div className={`${styles.error} ${isArabic ? styles['error-ar'] :""}` }>{error}</div>}
            <div className={styles.resetPasswordBtn} onClick={updatePassword}>
            {isLoading ? <Loader isShow={isLoading}  /> : ''}
            {isArabic ? " حفظ" : "Save"}</div>
         </div>
        </>
        
      )
    }
    