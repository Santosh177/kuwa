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
   

    const onLogin = async() =>{
      const validationErrors = validateForm({userEmail:userEmail,password:password });
      if (Object.keys(validationErrors).length === 0) {
        try {
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
          if (res.status === 200) {
            window.location.href = '/'
          } else {
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
        setPassword(e.target.value)
    }
  

      return (
        <>
         <div className={styles.loginCardWrapper}>
          <div className={styles.loginTxt}>Login</div>
          <div className={styles.descTxt}>Create or login to enjoy exclusive benefits.</div>
          <div className={styles.loginInputContainer}>
              <div>
                  <input className={styles.inputBox} type='email' onChange={onEmailChange} value={userEmail} placeholder='Email ID (ex. abc@gmail.com)' />
                  {errors.userEmail && <span className={styles.errorMsg}>{errors.userEmail}</span>}
              </div>
              <div>
                  <input className={styles.inputBox} type='password' onChange={onPasswordChange} value={password} placeholder='Password' />
                  {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
              </div>
              <div className={styles.loginBtn} onClick={onLogin}>Login</div>
          </div>
           
            <div className={styles.signUpTxt}>Don’t have an account ? <span className={styles.createAccountTxt} onClick={()=>router.push('/sign-up')}>Create account</span></div>
        </div>
        
        <Loader isShow={isLoading} />
        </>
       
      )
    }
    