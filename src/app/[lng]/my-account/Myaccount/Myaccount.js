'use client';
import { useRouter } from 'next/navigation';
import Input from "@/app/[lng]/components/Input/Input";
import PhoneNumberInput from '@/app/[lng]/components/PhoneNumberInput/PhoneNumberInput';
import styles from './my-account.module.scss';
import { useAuth } from '@/context/userDetail';
import Loader from '@/app/[lng]/components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/languageDetails';
import { checkInternationalPhone } from '@/utils/validation';
import { useCountry } from '@/context/contryDetails';


const validateForm = (formData,isArabic,selectedCountry) => {
  const errors = {};
  if (!formData.firstName) {
    errors.firstName = formData.isArabic ? "الاسم الأول مطلوب" : 'First name is required.';
  }
  if (!formData.lastName) {
    errors.lastName = formData.isArabic ? "اسم العائلة مطلوب" :  'Last name is required.';
  }
  if(!formData.mobNoValidation){
    errors.mobNumber = isArabic ? "رقم الهاتف المحمول مطلوب": "Mobile number is required";
  }else if(formData && formData.mobNoValidation && !checkInternationalPhone(formData.mobNoValidation,selectedCountry)){
    errors.mobNumber = isArabic ? "رقم الهاتف المحمول غير صحيح" : "Invalid mobile number";
  }
  if(!formData.email){
    errors.email = formData.isArabic  ? "البريد الإلكتروني مطلوب" : "Email is required";
  }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = formData.isArabic ? "عنوان بريد إلكتروني غير صالح." : 'Invalid email address.';
  }
  return errors;
};


const SignupForm = ({setFormData={},formData={},errors={},setErrors={}}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const { selectedCountry={} } = useCountry();
  const onInputChange = (event, labelId,data) =>{
    if(labelId === 'mobNumber'){
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
                    <Input type="text" id="fname" name="fname" placeHolder={isArabic ? "الاسم الأول مطلوب *" : 'First name *'}  value={formData.firstName || ""} onInputChange={(e)=>onInputChange(e,'firstName')}  />
                    {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                </div>
                <div className={styles.inputContain}>
                    <Input type="text" id="lname" name="fname" placeHolder={isArabic ? "الاسم الأخير *" : 'Last name *'}  value={formData.lastName || ""} onInputChange={(e)=>onInputChange(e,'lastName')}  />
                    {errors.firstName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                </div>
            </div>
            <div>
            <PhoneNumberInput type="text" fieldName="mobNumber"   value={formData.mobNumber || ""} onInputChange={onInputChange} />
            {errors.mobNumber && <span className={styles.errorMsg}>{errors.mobNumber}</span>}
            </div>
            <div>
                <Input isDisabled lassName={styles.inputBox} type='email'  value={formData.email || ""} placeHolder={isArabic ? "البريد الإلكتروني (مثال: abc@gmail.com)" : 'Email ID (ex. abc@gmail.com)'} onInputChange={(e)=>onInputChange(e,'email')}  />
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
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    const { selectedCountry={} } = useCountry();

    useEffect(()=>{
        const { firstName="", lastName="", emailAddress="", mobNumber="" } = userData || {}
        const userObject = {
            'firstName':firstName,
            'lastName':lastName,
            'mobNumber':mobNumber,
            'email':emailAddress,
            'isArabic':isArabic,
        }
    setFormData(userObject)
    },[userData])
  


      const onSignup = async() =>{
       
        const validationErrors = validateForm(formData,isArabic,selectedCountry);
        if (Object.keys(validationErrors).length === 0) {
         
            try {
              setIsLoading(true);
              const res = await fetch('/api/profile-update', {
                method: 'POST',
                body:JSON.stringify(formData)
              })
              const data = await res.json();

              console.log("profileupdateData", data);
              // setIsLoading(false);
            if (res.status === 200) {
              setIsLoading(false)
              setIsUpdateSuccess(true)
              window.location.href = '/'
            } else {
              throw new Error(await res.text())
            }
          } catch (error) {
            console.error('An unexpected error happened occurred:', error)
            setIsLoading(false)
          }
        } else {
          setErrors(validationErrors);
          // setIsLoading(false)
        }

      }


      return (
        <>
         <div className={styles.signUpCardWrapper}>
         <img className={styles.personalProfile} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/personal_profile.png' alt='personal-profile'/>
          <div className={styles.signUpTxt}>{isArabic ? "المعلومات الشخصية" : "Personal Info"}</div>
            <SignupForm setFormData={setFormData} formData={formData} errors={errors}  setErrors={setErrors}/>
            <div className={styles.createAccountBtn} onClick={onSignup}>{isArabic ? "حفظ التفاصيل" : "Save details"}</div>
           {isUpdateSuccess && <div className={styles.updateMsg}>{isArabic ? "تم التحديث بنجاح" : "Updated Successfully!"}</div>}
          </div>
          <Loader isShow={isLoading} />
        </>
       
      )
    }
    