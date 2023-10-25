'use client';
import { useRouter } from 'next/navigation';
import ForgetPasswordHeader from './ForgePasswordHeader/ForgetPasswordHeader';
import Input from "@/components/Input/Input";
import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput';
import Loader from '@/components/Loader/Loader';
import styles from './page.module.scss';
import { useState } from 'react';
import { useCountry } from '@/context/contryDetails';

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
  const router = useRouter();
    const [ email , setEmail ] = useState("")
    const [isEmailSent, setIsEmailSent] = useState(false);
    // const [text,setText] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg,setErrorMsg] = useState("");
    const [successMsg,setSuccessMsg] = useState("")
    const { selectedCountry={} } = useCountry();
    const onInputChange =(e)=>{
        setEmail(e.target.value)
    }
    const sendEmail=async()=>{
      setIsLoading(true);
      try {
        const res = await fetch('/api/get-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), 
        });
        setIsLoading(false);
        const response = await res.json();
        const countryName = selectedCountry && selectedCountry.name || "";
        if(response.statusCode === 200){
          window.clevertap.event.push("kuwa_password_reset", {
            "Country":countryName,
            "Email":email,
          });
          setIsEmailSent(true);
          setSuccessMsg('A link has been sent to your mail ID. If not found check spam folder.')
          setErrorMsg("")
        }
        else{
          setErrorMsg('please enter a valid Email')
          setSuccessMsg("")
        }
        
      }catch (error) {
        console.error(error);
        setIsLoading(false);
      }
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
            <div className={styles.successMsg}>{successMsg}</div>
            <div className={styles.errorMsg}>{errorMsg}</div>
            <div className={styles.forgetPasswordBtn}  onClick={sendEmail}>
            {isLoading ? <Loader isShow={isLoading}  /> : ''}
            Send link </div>
         </div>
        </>
        
      )
    }
    