import React , {useEffect, useState} from 'react'
import styles from './cod-otp.module.scss'
// import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput';
import PhoneNumberInput from '@/app/[lng]/components/PhoneNumberInput/PhoneNumberInput';
import { useAuth } from '@/context/userDetail';
// import Loader from '@/components/Loader/Loader';
import Loader from '@/app/[lng]/components/Loader/Loader';
import {checkInternationalPhone} from "../../../../../utils/validation"
import { useLanguage } from '@/context/languageDetails';


const CodOtpCard = ({orderId,setIsSuccessPopup,mobileNumber}) => {
//    console.log("mobileNumber",mobileNumber)
    const {isLogin=false,userData = {} } = useAuth() || {};
    const [otp ,setOtp] = useState();
    const [mobNumber,setMobNumber] = useState(userData.mobNumber || "");
    const [isShowOtpDiv,setIsShowOtpDiv] = useState(true);
    const [isShowPhoneDiv,setIsShowPhoneDiv] = useState(false);
    const [isShowResendOtp,setIsShowResendOtp] = useState(false)
    const [time,setTime] = useState(30);
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [mobNumberError,setMobNumberError] = useState("")

    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();



    useEffect(() => {
        if (mobileNumber) {
            setMobNumber(mobileNumber);
        }
    }, [mobileNumber]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (time === 0) {
            setIsShowResendOtp(true);
        }
    }, [time]);
     
    const handleResendOtp = () => {
        setTime(60);
        setIsShowResendOtp(false);
        // setIsShowOtpDiv(true);
        handleCreateOtp()
    };
    
    console.log("userData++++",userData)
    const handleEdit = ()=>{
        setIsShowOtpDiv(false);
        setIsShowPhoneDiv(true)
    }
    
    const handleCreateOtp = async()=>{
        const payload = {
            mobNumber: mobNumber,
            orderId:orderId
        }
        try{
            setIsLoading(true)
            const res = await fetch(`/api/create-otp`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            if (!res.ok) {
                console.error(`Failed to verify otp. Status: ${response.status}`);
                return;
              }
              setIsLoading(false)
              const responseData = await res.json();
              
        }
        catch(error){
            setIsLoading(false)
            console.log("error",error)
        }
    }

    const handleSaveMob = ()=>{
        if(!mobNumber){
            setMobNumberError(isArabic ? "يرجى إدخال رقم الهاتف المحمول" :"Please enter mobile number")
            return;
        }
        if(mobNumber && !checkInternationalPhone(mobNumber)){
            setMobNumberError(isArabic ? "رقم الهاتف المحمول غير صحيح" : "Invalid mobile number")
            return;
        }
        setIsShowOtpDiv(true);
        setIsShowPhoneDiv(false)
        handleCreateOtp();
    }

    const handleVerifyOtp = async()=>{
        if (!otp) {
            setOtpError(isArabic ? "يرجى إدخال رمز OTP" : 'Please enter OTP');
            return;
        }
        const payload = {
            mobNumber: mobNumber,
            otp: otp,
            orderId:orderId
        }
        try{
            setIsLoading(true)
            const res = await fetch(`/api/verify-otp`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            console.log("nkjbkja",res.status)
            if (res.status==200) {
                setIsLoading(false)
                // const responseData = await res.json();
                setIsSuccessPopup(true);
              }
              else{
                setIsLoading(false)
                setOtpError(isArabic ? "رمز OTP غير صحيح" : "Incorrect OTP")
                // const responseData = await res.json();
              
                // console.error(`Failed to verify otp. Status: ${res.status}`);
                return;
              }
              
        }
        catch(error){
             setIsLoading(false)
            console.log("error",error)
        }
    }

   return (
    <>
    <div className={styles.codOtpCard}>
        <div className={styles.heading}>
            <div className={styles.Title}>{isArabic ? "تأكيد الرقم" : "Confirm Number"}</div>
            <div className={styles.sideTitle}>{isArabic ? "اختياري" : "Optional"}</div>
        </div>
        <div className={styles.subTxt}>{isArabic ? "لتسريع عملية طلبك وتجنب التأخير، يُرجى التحقق من رقم هاتفك باستخدام الرمز المُرسل. هذا يضمن المعالجة التلقائية دون الحاجة إلى مكالمات التحقق الإضافية." : "To expedite your order and avoid delays, please verify your phone number with the code sent. This ensures automatic processing without additional verification calls."}</div>
        { isShowOtpDiv &&  <div className={styles.mobDiv}>
           <div className={styles.mobTxt}>{isArabic ? "رقم هاتفك المحمول" : "Your mobile number"} :</div>
          {mobNumber && <div className={styles.mob}>{mobNumber}
            <span onClick={handleEdit}>{isArabic ?  "تعديل" : "EDIT"}</span></div>}
        </div>}
       {isShowOtpDiv && <div className={styles.otpDiv}>
        <div>
         <input type='text' placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)} className={isArabic ? "inputOtp-ar" : ""}></input>
         {otpError && <div className={styles.otperror}>{otpError}</div>}
         </div>
        <div className={styles.btn} onClick={handleVerifyOtp}>{isArabic ? "تحقق" : "Verify"}</div>
           </div>}
           {
            isShowPhoneDiv && <div className={styles.phoneBox}>
                <div className={styles.phoneTxt}>{isArabic ? "أدخل رقم الهاتف" : "Enter phone number"}</div>
                <div className={styles.phoneDiv}>
                <div className={styles.phoneInput}>
                <PhoneNumberInput type="text" fieldName="mobNumber" value={mobNumber} onInputChange={(e)=>setMobNumber(e)}/>
                </div>
                <div className={styles.button} onClick={handleSaveMob}>{isArabic ? "تأكيد" : "Confirm"}</div>
                </div>  
                {mobNumberError &&  <div className={styles.mobNumberError}>{mobNumberError}</div>}
            </div>
           }
       {isShowOtpDiv && !isShowResendOtp && <div className={styles.timerOtp}>{isArabic ? "إعادة إرسال رمز OTP" :"Resend OTP"} (in {time} sec)</div>}
       {isShowOtpDiv && isShowResendOtp && <div className={styles.resendOtp}  onClick={handleResendOtp}>{isArabic ? "إعادة إرسال رمز OTP" : "Resend OTP"}</div>}
    </div>
       <Loader isShow={isLoading} />
       </>
  )
}

export default CodOtpCard
