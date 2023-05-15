'use client';
import { useRouter } from 'next/navigation';
import styles from './login-info.module.scss';
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
              Authorization: 'Bearer ' + "didToken",
            },
            body:JSON.stringify({
                'username':userEmail,
                'password':password
            })
          })
          if (res.status === 200) {
            router.push('/')
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
        <div className={styles['login-wrapper']}>
            <div>
                <input type='email' onChange={onEmailChange} value={userEmail} />
            </div>
            <div>
                <input type='passord' onChange={onPasswordChange} value={password} />
            </div>
            <button onClick={onLogin}>Login</button>
            <div>Don’t have an account ? <span>Create account</span></div>
        </div>
      )
    }
    