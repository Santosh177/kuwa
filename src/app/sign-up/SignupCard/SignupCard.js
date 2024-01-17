'use client';
import { useRouter , useSearchParams} from 'next/navigation';

import Input from "@/components/Input/Input";
import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput';
import Loader from '@/components/Loader/Loader';
import styles from './sign-up-card.module.scss';
import { useCountry } from '@/context/contryDetails';
import { useState,useEffect } from 'react';
import { checkInternationalPhone } from "../../../utils/validation";

const validateForm = (formData) => {
  const errors = {};
  if (!formData.firstName) {
    errors.firstName = 'First name is required.';
  }
  if (!formData.lastName) {
    errors.lastName = 'Last name is required.';
  }
  if(!formData.mobNoValidation){
    errors.mobileNumber = "Mobile number is required";
  }else if(formData && formData.mobNoValidation && !checkInternationalPhone(formData.mobNoValidation)){
    errors.mobileNumber = "Invalid mobile number";
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


const SignupForm = ({setFormData={},formData={},errors={},setErrors={}}) => {
  const { selectedCountry={} } = useCountry();
  const countryCode = selectedCountry && selectedCountry.code || "";
  const onInputChange = (event, labelId, data) =>{
    if(labelId === 'mobileNumber'){
      setFormData(inputs => ({ ...inputs, [labelId]: "+"+event,["mobNoValidation"]:event.slice(data.dialCode.length)}));
    }else{
      setFormData(inputs => ({ ...inputs, [labelId]: event.target.value }));
    }
    const { [labelId]: removedKey, ...newFormData } = errors;
    setErrors(newFormData);
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
                    {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                </div>
            </div>
            <div>
            <PhoneNumberInput countryCode={countryCode} type="text" fieldName="mobileNumber"   value={formData.mobNumber || ""} onInputChange={onInputChange} />
            {errors.mobileNumber && <span className={styles.errorMsg}>{errors.mobileNumber}</span>}
            </div>
            <div>
                <Input autoComplete='off' lassName={styles.inputBox} type='email'  value={formData.email || ""} placeHolder='Email ID (ex. abc@gmail.com)' onInputChange={(e)=>onInputChange(e,'email')}  />
                {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>
            <div>
                <Input autoComplete='off' className={styles.inputBox}  type='password' value={formData.password || ""} placeHolder='Set password' onInputChange={(e)=>onInputChange(e,'password')}
                icon={{
                  eyeClosed: 'https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/eye_closed+(1).png',
                  eyeOpen: 'https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/eye_open.png'
                }}
                />
                {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
            </div>
        </div>
    )
}



export default function SignupCard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { selectedCountry={} } = useCountry();
    const [ formData , setFormData] = useState({});
    const [ errors, setErrors] = useState({});  
    const [isLoading , setIsLoading] = useState(false)
    const refererPath = searchParams.get('referer');
    const [pageType, setPageType] = useState(getPageType())
    
    console.log("useCountry",selectedCountry)
  
    function getDeviceType(){
      const userAgent = window.navigator.userAgent;
      if (userAgent.match(/Android/i)) {
          return 'Android';
      } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
          return 'iOS';
      } else {
          return 'Unknown';
      }
    }
    useEffect(() => {
      const handleResize = () => {
        setPageType(getPageType());
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    function getPageType() {
      return window.innerWidth > 770 ? 'web' : 'mWeb';
    }

      const onSignup = async() =>{
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
       
            try {
              setIsLoading(true)
              formData.deviceType = getDeviceType();
              formData.pageType = pageType;
              console.log("formData",formData)
              const res = await fetch('/api/signup', {
                method: 'POST',
                body:JSON.stringify(formData)
              })
              const data = await res.json();
              if(data && data.status_code && data.status_code == 200){
                const name = formData.firstName+ ' ' +formData.lastName;
                const userId = data && data.data && data.data.id || null
                const phone = formData.mobileNumber ;
                const email = formData.email;
                const countryName = selectedCountry && selectedCountry.name ||  ""
                if(userId){
                  window.clevertap.onUserLogin.push({
                    "Site": {
                      "Name": name,            // String
                      "Identity": userId,              // String or number
                      "Email": email,         // Email address of the user
                      "Phone": phone, 
                      "Country":countryName,
                      "MSG-email": true,                // Disable email notifications
                      "MSG-push": true,                  // Enable push notifications
                      "MSG-sms": true,                   // Enable sms notifications
                      "MSG-whatsapp": true,              // Enable WhatsApp notifications
                    },
                    "cart_items": []
                   })
                   window.clevertap.event.push("kuwa_user_signup_success", {
                    "Country":countryName,
                    "Email":email,
                    "Name": name,
                    "Phone": phone
                  });
                }
              }
              if(data && data.status_code && data.status_code == 400){
                setErrors({email:'This email address already exists. Please try logging in'})
                setIsLoading(false)
              }else{
                if(refererPath){
                  window.location.href = refererPath;
                }else{
                  window.location.href = '/'
                }
                
              }
              setIsLoading(false);
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
              <SignupForm setFormData={setFormData} formData={formData} errors={errors} setErrors={setErrors}/>
              <div className={styles.createAccountBtn} onClick={onSignup}>Create account</div>
              <div className={styles.loginTxt} onClick={()=> router.push('/login')}>Already have an account ? <span className={styles.loginSubTxt} >Login</span></div>
          </div>
          <Loader isShow={isLoading}/>
        </>
        
      )
    }
    