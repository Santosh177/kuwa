'use client';
import { useRouter } from 'next/navigation';
import styles from './login-card.module.scss';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';
const validateForm = (formData) => {
  const errors = {};
  if(!formData.userEmail){
    errors.userEmail = "Email is required";
  }else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
    errors.userEmail = 'Invalid email address.';
  }
  if(!formData.password){
    errors.password = "Password is required";
  }else if(!(formData.password.length > 7)){
    errors.password = "Passwords need to be a min. of 8 characters";
  }
  return errors;
};


export default function Login() {
    const router = useRouter();

    const [ userEmail , setUserEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ errors, setErrors] = useState({});
    const [isLoading, setIsLoading]= useState(false)  
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [ loginFailureTxt , setLoginFailureTxt] = useState("");

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const getUserData = async({userId,token}) =>{

        try {
          const userLoginResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/customer/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            }
          })
          const userData = await userLoginResp.json();
          console.log("userDatauserData",userData)
          const name = userData.firstName+ ' ' +userData.lastName;
          const userId = userData && userData && userData.id || null
          const phone = userData.mobNumber ;
          const email = userData.emailAddress;
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
          }
         } catch (err) {
         }
    
    }
   

    const onLogin = async() =>{
      const validationErrors = validateForm({userEmail:userEmail,password:password });
      if (Object.keys(validationErrors).length === 0) {
        try {
          setErrors(validationErrors);
          setIsLoading(true)
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'username':userEmail,
                'password':password
            })
          })
          setIsLoading(false)
          const loginResp = await res.json();
         
          if(loginResp && loginResp.status && loginResp.status === 'SUCCESS'){
              const data = await getUserData({userId:loginResp.data.id, token:loginResp.data.token});
              window.location.href = '/'
          }else {
              setLoginFailureTxt('Wrong email or password. Try again or click Forgot password to reset it')
          }
        } catch (error) {
          console.error('An unexpected error happened occurred:', error)
        }
      }else{
        setErrors(validationErrors);
      }
    }


    const onEmailChange = (e) => {
        setUserEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
  

      return (
        <>
         <div className={styles.loginCardWrapper}>
          <div className={styles.loginTxt}>Login</div>
          <div className={styles.descTxt}>Create or login to enjoy exclusive benefits.</div>
          <div className={styles.loginInputContainer}>
              <div>
                  <input autocomplete="off" autoComplete='off' className={styles.inputBox} type='email' onChange={onEmailChange} value={userEmail} placeholder='Email ID (ex. abc@gmail.com)' />
                  {errors.userEmail && <span className={styles.errorMsg}>{errors.userEmail}</span>}
              </div>
              <div className={styles.loginPasswordInput}>
                  <input autocomplete="off" autoComplete='off' className={styles.inputBox} type={isPasswordVisible ? 'text' : 'password'} onChange={onPasswordChange} value={password} placeholder='Password' 
                  />
                   <img
                className={styles.eyeIcon}
                src={
                  isPasswordVisible
                    ? 'https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/eye_open.png'
                    : 'https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/eye_closed+(1).png'
                }
                alt="Toggle Password Visibility"
                onClick={togglePasswordVisibility}
              />
                  {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
                  <div className={styles.loginFailureTxt}>{loginFailureTxt}</div>
                  <div className={styles.forgetPassword} onClick={()=>router.push('/forget-password')}>Forgot Password ?</div>
              </div>
             
              <div className={styles.loginBtn} onClick={onLogin}>Login</div>
          </div>
           
            <div className={styles.signUpTxt}>Don’t have an account ? <span className={styles.createAccountTxt} onClick={()=>router.push('/sign-up')}>Create account</span></div>
        </div>
        
        <Loader isShow={isLoading} />
        </>
       
      )
    }
    