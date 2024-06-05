'use client';
import { useRouter , useSearchParams} from 'next/navigation';

import Input from "@/app/[lng]/components/Input/Input";
import PhoneNumberInput from '@/app/[lng]/components/PhoneNumberInput/PhoneNumberInput';
import Loader from '@/app/[lng]/components/Loader/Loader';
import styles from './sign-up-card.module.scss';
import { useCountry } from '@/context/contryDetails';
import { useState,useEffect } from 'react';
import { checkInternationalPhone } from "../../../../utils/validation";
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';
import { useLanguage } from '@/context/languageDetails';

const validateForm = (formData,isArabic) => {
  const errors = {};
  if (!formData.firstName) {
    errors.firstName = isArabic ? "الاسم الأول مطلوب" : 'First name is required.';
  }
  if (!formData.lastName) {
    errors.lastName = isArabic ? "اسم العائلة مطلوب" :  'Last name is required.';
  }
  if(!formData.mobNoValidation){
    errors.mobileNumber = isArabic ? "رقم الهاتف المحمول مطلوب": "Mobile number is required";
  }else if(formData && formData.mobNoValidation && !checkInternationalPhone(formData.mobNoValidation)){
    errors.mobileNumber = "Invalid mobile number";
  }
  if(!formData.email){
    errors.email = isArabic ? "البريد الإلكتروني مطلوب" : "Email is required";
  }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Invalid email address.';
  }
  if(!formData.password){
    errors.password = isArabic ? "كلمة المرور مطلوبة" :  "Password is required";
  }else if(!(formData.password.length > 7)){
    errors.password = isArabic ? "يجب أن تكون كلمة المرور على الأقل 8 أحرف" :  "Passwords need to be a min. of 8 characters";
  }
  return errors;
};


const SignupForm = ({setFormData={},formData={},errors={},setErrors={}}) => {
  const { selectedCountry={} } = useCountry();
  const countryCode = selectedCountry && selectedCountry.code || "";
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

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
                    <Input type="text" id="fname" name="fname" placeHolder={isArabic ? "الاسم الأول مطلوب *" : 'First name *'  }value={formData.firstName || ""} onInputChange={(e)=>onInputChange(e,'firstName')} />
                    {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                </div>
                <div className={styles.inputContain}>
                    <Input type="text" id="lname" name="fname" placeHolder={isArabic ? "الاسم الأخير *" : 'Last name *'}  value={formData.lastName || ""} onInputChange={(e)=>onInputChange(e,'lastName')}  />
                    {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                </div>
            </div>
            <div>
            <PhoneNumberInput countryCode={countryCode} type="text" fieldName="mobileNumber"   value={formData.mobNumber || ""} onInputChange={onInputChange} />
            {errors.mobileNumber && <span className={styles.errorMsg}>{errors.mobileNumber}</span>}
            </div>
            <div>
                <Input autoComplete='off' lassName={styles.inputBox} type='email'  value={formData.email || ""} placeHolder={isArabic ? "البريد الإلكتروني (مثال: abc@gmail.com)" : 'Email ID (ex. abc@gmail.com)'} onInputChange={(e)=>onInputChange(e,'email')}  />
                {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>
            <div>
                <Input autoComplete='off' className={styles.inputBox}  type='password' value={formData.password || ""} placeHolder={isArabic ? "تعيين كلمة المرور" : 'Set password'} onInputChange={(e)=>onInputChange(e,'password')}
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
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    
    console.log("useCountry",selectedCountry)
  
    function getDeviceType() {
      if (isMobile) {
        if (isAndroid) {
          return 'Android';
        } else if (isIOS) {
          return 'iOS';
        } else {
          return 'Mobile';
        }
      } else if (isTablet) {
        return 'Tablet';
      } else {
        return 'Desktop';
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

      const onSignup = async(isArabic) =>{
        const validationErrors = validateForm(formData,isArabic);
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
                setIsLoading(false)
                const name = formData.firstName+ ' ' +formData.lastName;
                const userId = data && data.data && data.data.id || null
                const phone = formData.mobileNumber ;
                const email = formData.email;
                const countryName = selectedCountry && selectedCountry.name ||  ""
                if(userId){
                console.log("rahul")
                  window.clevertap?.onUserLogin?.push({
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
                console.log("santo")
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
            <div className={styles.signUpTxt}>{isArabic ? "إنشاء حساب" : "Create an account"}</div>
            <div className={styles.descTxt}>{isArabic ? "إنشاء حساب أو تسجيل الدخول للاستمتاع بمزايا حصرية" : "Create or login to enjoy exclusive benefits"}.</div>
              <SignupForm setFormData={setFormData} formData={formData} errors={errors} setErrors={setErrors}/>
              <div className={styles.createAccountBtn} onClick={onSignup}>{isArabic ? "إنشاء حساب" : "Create account"}</div>
              <div className={styles.loginTxt} onClick={()=> router.push('/login')}>{isArabic ? "هل لديك حساب بالفعل" : "Already have an account"} ? <span className={styles.loginSubTxt} >{isArabic ? "تسجيل الدخول" : "Login"}</span></div>
          </div>
          <Loader isShow={isLoading}/>
        </>
        
      )
    }
    