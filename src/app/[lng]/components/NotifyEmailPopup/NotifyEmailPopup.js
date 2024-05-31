import React , {useState} from 'react'
import styles from './notify-email-popup.module.scss'
import { useAuth } from '@/context/userDetail';
import { useLanguage } from '@/context/languageDetails';

const NotifyEmailPopup = ({setIsShowNotifyEmailPopup,setIsShowNotifySuccessPopup,emailId,setEmailId,handleNotify}) => {
    const [error, setError] = useState('');
    const { isLogin=false ,userData} = useAuth();
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    
  const handleSubmit = () =>{

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailId)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    console.log("email nonlogin");
    setIsShowNotifyEmailPopup(false);
    handleNotify()
    setEmailId('')
  }
    return (
    <div className={styles.NotifyEmailOverlay}>
    <div className={styles.NotifyEmailPopup}>
        <div className={styles.content}>
          <div className={styles.crossIcon} onClick={()=>setIsShowNotifyEmailPopup(false)}><img src="https://d25uasl7utydze.cloudfront.net/assets/cross_icon%20(2).svg"/></div>
            <div className={styles.txt}>{isArabic ? "": "We will notify you when the product is back in stock"}</div>
            <div><input type="email" placeholder={isArabic ? "البريد الإلكتروني (مثال: abc@gmail.com)" : 'Email ID * (ex. abc@gmail.com)'} value={emailId} onChange={(e)=>setEmailId(e.target.value)} ></input>
            {error && <div className={styles.error}>{error}</div>}</div>
            <div className={styles.btn} onClick={handleSubmit}>{isArabic ? "" : "Submit"}</div>
        </div>

    </div>

    </div>
  )
}

export default NotifyEmailPopup