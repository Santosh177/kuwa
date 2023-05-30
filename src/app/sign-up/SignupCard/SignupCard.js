'use client';
import { useRouter } from 'next/navigation';
import Input from "@/components/Input/Input";
import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput';
import Loader from '@/components/Loader/Loader';
import styles from './sign-up-card.module.scss';
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
                <Input lassName={styles.inputBox} type='email'  value={formData.email || ""} placeHolder='Email ID (ex. abc@gmail.com)' onInputChange={(e)=>onInputChange(e,'email')}  />
                {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>
            <div>
                <Input className={styles.inputBox} type='password'  value={formData.password || ""} placeHolder='Set password' onInputChange={(e)=>onInputChange(e,'password')} />
                {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
            </div>
        </div>
    )
}



export default function SignupCard() {
    const router = useRouter();
    const [ formData , setFormData] = useState({});
    const [ errors, setErrors] = useState({});  
    const [isLoading , setIsLoading] = useState(false)

  


      const onSignup = async() =>{
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            try {
              setIsLoading(true)
              const res = await fetch('/api/signup', {
                method: 'POST',
                body:JSON.stringify(formData)
              })
              setIsLoading(false)
            if (res.status === 200) {
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
            <div className={styles.signUpTxt}>Create an account</div>
            <div className={styles.descTxt}>Create or login to enjoy exclusive benefits.</div>
              <SignupForm setFormData={setFormData} formData={formData} errors={errors}/>
              <div className={styles.createAccountBtn} onClick={onSignup}>Create account</div>
              <div className={styles.loginTxt} onClick={()=> router.push('/login')}>Already have an account ? <span className={styles.loginSubTxt} >Login</span></div>
          </div>
          <Loader isShow={isLoading}/>
        </>
        
      )
    }
    