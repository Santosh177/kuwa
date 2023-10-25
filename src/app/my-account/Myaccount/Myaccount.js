'use client';
import { useRouter } from 'next/navigation';
import Input from "@/components/Input/Input";
import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput';
import styles from './my-account.module.scss';
import { useAuth } from '@/context/userDetail';
import Loader from '@/components/Loader/Loader';
import { useEffect, useState } from 'react';

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
  return errors;
};


const SignupForm = ({setFormData={},formData={},errors={}}) => {

  const onInputChange = (event, labelId) =>{
    if(labelId === 'mobNumber'){
      setFormData(inputs => ({ ...inputs, [labelId]: event}));
    }else{
      setFormData(inputs => ({ ...inputs, [labelId]: event.target.value }));
    }

    
  }

  
    return (
        <div className={styles.signUpFormContainer}>
            <div className={styles.userNameContainer}>
                <div className={styles.inputContain}>
                    <Input type="text" id="fname" name="fname" placeHolder='First name *'  value={formData.firstName || ""} onInputChange={(e)=>onInputChange(e,'firstName')}  />
                    {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                </div>
                <div className={styles.inputContain}>
                    <Input type="text" id="lname" name="fname" placeHolder='Last name *'  value={formData.lastName || ""} onInputChange={(e)=>onInputChange(e,'lastName')}  />
                    {errors.firstName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                </div>
            </div>
            <div>
            <PhoneNumberInput type="text" fieldName="mobNumber"   value={formData.mobNumber || ""} onInputChange={onInputChange} />
            {errors.mobNumber && <span className={styles.errorMsg}>{errors.mobNumber}</span>}
            </div>
            <div>
                <Input isDisabled lassName={styles.inputBox} type='email'  value={formData.email || ""} placeHolder='Email ID (ex. abc@gmail.com)' onInputChange={(e)=>onInputChange(e,'email')}  />
                {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>
        </div>
    )
}



export default function SignupCard() {
    const router = useRouter();
    const {isLogin=false, userData={}} = useAuth();
    const [ formData , setFormData] = useState({});
    const [ errors, setErrors] = useState({});  
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false)
 

    useEffect(()=>{
        const { firstName="", lastName="", emailAddress="", mobNumber="" } = userData || {}
        const userObject = {
            'firstName':firstName,
            'lastName':lastName,
            'mobNumber':mobNumber,
            'email':emailAddress
        }
    setFormData(userObject)
    },[userData])
  


      const onSignup = async() =>{
       
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
          setIsLoading(true);
            try {
              const res = await fetch('/api/profile-update', {
                method: 'POST',
                body:JSON.stringify(formData)
              })
              setIsLoading(false);
            if (res.status === 200) {
              setIsUpdateSuccess(true)
              window.location.href = '/'
            } else {
              throw new Error(await res.text())
            }
          } catch (error) {
            console.error('An unexpected error happened occurred:', error)
          }
        } else {
          setErrors(validationErrors);
        }

      }


      return (
        <>
         <div className={styles.signUpCardWrapper}>
          <div className={styles.signUpTxt}>Personal Info</div>
            <SignupForm setFormData={setFormData} formData={formData} errors={errors}/>
            <div className={styles.createAccountBtn} onClick={onSignup}>Save details</div>
           {isUpdateSuccess && <div className={styles.updateMsg}>Updated Successfully!</div>}
          </div>
          <Loader isShow={isLoading} />
        </>
       
      )
    }
    