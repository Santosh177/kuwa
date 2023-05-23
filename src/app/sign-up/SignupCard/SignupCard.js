'use client';
import { useRouter } from 'next/navigation';
import Input from "@/components/Input/Input";
import PhoneNumberInput from '@/components/PhoneNumberInput/PhoneNumberInput';
import styles from './sign-up-card.module.scss';
import { useState } from 'react';


const SignupForm = ({setFormData={},formData={}}) => {

  const onInputChange = (event, labelId) =>{
    setFormData(inputs => ({ ...inputs, [labelId]: event.target.value }));
  }
    return (
        <div className={styles.signUpFormContainer}>
            <div className={styles.userNameContainer}>
                <div className={styles.inputContain}>
                    <Input type="text" id="fname" name="fname" placeHolder='First name *'  value={formData.firstName || ""} onInputChange={(e)=>onInputChange(e,'firstName')}  />
                </div>
                <div className={styles.inputContain}>
                    <Input type="text" id="lname" name="fname" placeHolder='Last name *'  value={formData.lastName || ""} onInputChange={(e)=>onInputChange(e,'lastName')}  />
                </div>
            </div>
            <div>
              <PhoneNumberInput />
                <input className={styles.inputBox} type='phone'  value={formData.mobNumber || ""} placeholder='Phone number *' onChange={(e)=>onInputChange(e,'mobNumber')}  />
                {/* <span>Error</span> */}
            </div>
            <div>
                <Input lassName={styles.inputBox} type='email'  value={formData.email || ""} placeHolder='Email ID (ex. abc@gmail.com)' onInputChange={(e)=>onInputChange(e,'email')}  />
                {/* <span>Error</span> */}
            </div>
            <div>
                <Input className={styles.inputBox} type='password'  value={formData.password || ""} placeHolder='Set password' onInputChange={(e)=>onInputChange(e,'password')} />
                {/* <span>Error</span> */}
            </div>
        </div>
    )
}



export default function SignupCard() {
    const router = useRouter();

    const [ formData , setFormData] = useState({})
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
  


      const onSignup = async() =>{
        try {

          const res = await fetch('/api/signup', {
            method: 'POST',
            body:JSON.stringify(formData)
          })
          if (res.status === 200) {
            window.location.href = '/'
          } else {
            throw new Error(await res.text())
          }
        } catch (error) {
          console.error('An unexpected error happened occurred:', error)
        }
      }

      console.log("formData",formData)

      return (
        <div className={styles.signUpCardWrapper}>
          <div className={styles.signUpTxt}>Create an account</div>
          <div className={styles.descTxt}>Create or login to enjoy exclusive benefits.</div>
            <SignupForm setFormData={setFormData} formData={formData}/>
            <div className={styles.createAccountBtn} onClick={onSignup}>Create account</div>
            <div className={styles.loginTxt} onClick={()=> router.push('/login')}>Already have an account ? <span className={styles.loginSubTxt} >Login</span></div>
        </div>
      )
    }
    