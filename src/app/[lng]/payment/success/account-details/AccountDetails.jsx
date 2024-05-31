'use Client';
import React, {useState}from 'react';
import styles from './account-details.module.scss';
import Input from "@/app/[lng]/components/Input/Input";
import { useAuth } from '@/context/userDetail';
import Loader from '@/app/[lng]/components/Loader/Loader';
import { useLanguage } from '@/context/languageDetails';



const AccountDetails = ({setIsSuccessPopup}) => {
  const [ password , setNewPassword ] = useState("");
    const [ repeatNewPassword, setRepeatNewPassword ] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

  const { userData = {}} = useAuth();
  
  const email = userData?.emailAddress;
  const {firstName="",lastName,id="",newShippingAddress=""}   = userData || {}
  const {country="",mobNumber=""} = newShippingAddress || {};
  const name = `${firstName} ${lastName}`;
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const onInputChange =(e)=>{
    setNewPassword(e.target.value)
}


const handleCreateAccount = async () => {
  if (!password || password.length < 8) {
    setPasswordError(isArabic ? "يجب أن تكون كلمة المرور على الأقل 8 أحرف" : "Passwords need to be a min. of 8 characters");
    return;
  }
  if (password !== repeatNewPassword) {
    setPasswordError(isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match");
    return;
  }
  const payload = {
    "username": email,
    "password": password
  };
  try {
    setIsLoading(true)
    const response = await fetch('/api/guest-login', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Failed to update password. Status: ${response.status}`);
      return;
    }
    setIsLoading(false)
    const responseData = await response.json();

    setIsSuccessPopup(true);
  } catch (error) {
    console.error('Error updating password:', error);
  }
};

  return (
    <>
    <div className={styles.accountContainer}>
    <div className={styles.headerTxt}>{isArabic ? "أكمل إنشاء حساب" : "Complete creating an account"}</div>
    <div className={styles.container}>
        <div className={styles.icon}>
       
           <img src="https://d25uasl7utydze.cloudfront.net/assets/fast.svg"/> 
           <span>{isArabic ? "تسجيل خروج أسرع" : "Faster Checkouts"}</span>
        </div>
        <div className={styles.icon}>
           
           <img src="https://d25uasl7utydze.cloudfront.net/assets/truck%20(1).svg"/> 
           <span>{isArabic ? "تتبع الطلب" : "Order Tracking"}</span>
        </div>
        <div className={styles.icon}>
            
           <img src="https://d25uasl7utydze.cloudfront.net/assets/offer.svg"/> 
           <span>{isArabic ? "عروض حصرية" : "Exclusive Offers"}</span>
        </div>

    </div>
    <div className={styles.personalDetails}>
        <div className={styles.inputEmail}>
      <Input className={styles.guestEmail}type="email" fieldName="email" value={email}  placeHolder={isArabic ? "البريد الإلكتروني (مثال: abc@gmail.com)" : "Email ID (ex. abc@gmail.com)*"} isDisabled={email}/>
      </div>
      <div className={styles.inputPassword}>

       <div className={styles.inputDiv}><Input className={styles.guestPassword} type='password'  value={password || ""} placeHolder={isArabic ? "كلمة المرور" : 'Password'} onInputChange={(e)=>onInputChange(e) }/></div> 
        <div className={styles.inputDiv}><Input className={styles.guestPassword} type='password' value={repeatNewPassword || ""} placeHolder={isArabic ? "تأكيد كلمة المرور" : 'Confirm Password'} onInputChange={(e) => setRepeatNewPassword(e.target.value)} /></div>
     
      </div>
      {passwordError && <div className={styles.passwordError}>{passwordError}</div>}
   
    <div className={styles.btn} onClick={handleCreateAccount}>{isArabic ? "انشئ حساب " : "Create Account"}</div>     
    </div>    

    </div>
       <Loader isShow={isLoading} />
       </>
  )
}

export default AccountDetails