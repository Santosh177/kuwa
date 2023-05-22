'use client';
import { useRouter } from 'next/navigation';
import styles from './login-card.module.scss';
import { useState } from 'react';



export default function Login() {
    const router = useRouter();

    const [ userEmail , setUserEmail ] = useState("");
    const [ password , setPassword ] = useState("");
   

    const onLogin = async() =>{
        try {

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
          if (res.status === 200) {
            window.location.href = '/'
          } else {
            throw new Error(await res.text())
          }
        } catch (error) {
          console.error('An unexpected error happened occurred:', error)
          setErrorMsg(error.message)
        }
    }


    const onEmailChange = (e) => {
        setUserEmail(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }
  

      return (
        <div className={styles.loginCardWrapper}>
          <div className={styles.loginTxt}>Login</div>
          <div className={styles.descTxt}>Create or login to enjoy exclusive benefits.</div>
          <div className={styles.loginInputContainer}>
              <div>
                  <input className={styles.inputBox} type='email' onChange={onEmailChange} value={userEmail} placeholder='Email ID (ex. abc@gmail.com)' />
              </div>
              <div>
                  <input className={styles.inputBox} type='passord' onChange={onPasswordChange} value={password} placeholder='Password' />
              </div>
              <div className={styles.loginBtn} onClick={onLogin}>Login</div>
          </div>
           
            <div className={styles.signUpTxt}>Don’t have an account ? <span className={styles.createAccountTxt}>Create account</span></div>
        </div>
      )
    }
    