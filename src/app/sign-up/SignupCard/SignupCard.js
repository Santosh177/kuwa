'use client';
import { useRouter } from 'next/navigation';
import styles from './sign-up-card.module.scss';
import { useState } from 'react';


const SignupForm = () => {
    return (
        <div className={styles.signUpFormContainer}>
            <div className={styles.userNameContainer}>
                <div className={styles.inputContain}>
                    <input type="text" id="fname" name="fname" autocomplete="off" value=""  />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>First name *</div>
                    </label>
                </div>
                <div className={styles.inputContain}>
                    <input type="text" id="lname" name="fname" autocomplete="off" value=""  />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>Last name *</div>
                    </label>
                </div>
            </div>
            <div>
                <input className={styles.inputBox} type='phone'  value={''} placeholder='Phone number *' />
                {/* <span>Error</span> */}
            </div>
            <div>
                <input className={styles.inputBox} type='email'  value={''} placeholder='Email ID (ex. abc@gmail.com)' />
                {/* <span>Error</span> */}
            </div>
            <div>
                <input className={styles.inputBox} type='password'  value={''} placeholder='Set password' />
                {/* <span>Error</span> */}
            </div>
        </div>
    )
}



export default function SignupCard() {
    const router = useRouter();

    const [ userEmail , setUserEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [inputs, setInputs] = useState({});
   

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
  

    const handleInputChange = (event, value, labelId) => {
        if (labelId === 'phoneNo') {
          const phoneNumber = `+${value.dialCode}` + '' + event.slice(value.dialCode.length);
          setInputs(inputs => ({ ...inputs, [labelId]: phoneNumber }));
        } else {
          event.persist();
          setInputs(inputs => ({ ...inputs, [event.target.id]: event.target.value }));
        }
      }

      return (
        <div className={styles.signUpCardWrapper}>
          <div className={styles.signUpTxt}>Create an account</div>
          <div className={styles.descTxt}>Create or login to enjoy exclusive benefits.</div>
            <SignupForm />
            <div className={styles.createAccountBtn} onClick={onLogin}>Create account</div>
            <div className={styles.loginTxt}>Already have an account ? <span className={styles.loginSubTxt}>Login</span></div>
        </div>
      )
    }
    