'use client';
import { useRouter } from 'next/navigation';
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
                    <input type="text" id="fname" name="fname" autocomplete="off" value={formData.firstName || ""} onChange={(e)=>onInputChange(e,'firstName')}  />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>First name *</div>
                    </label>
                </div>
                <div className={styles.inputContain}>
                    <input type="text" id="lname" name="fname" autocomplete="off" value={formData.lastName || ""} onChange={(e)=>onInputChange(e,'lastName')}  />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>Last name *</div>
                    </label>
                </div>
            </div>
            <div>
                <input className={styles.inputBox} type='phone'  value={formData.mobNumber || ""} placeholder='Phone number *' onChange={(e)=>onInputChange(e,'mobNumber')}  />
                {/* <span>Error</span> */}
            </div>
            <div>
                <input className={styles.inputBox} type='email'  value={formData.email || ""} placeholder='Email ID (ex. abc@gmail.com)' onChange={(e)=>onInputChange(e,'email')} />
                {/* <span>Error</span> */}
            </div>
            <div>
                <input className={styles.inputBox} type='password'  value={formData.password || ""} placeholder='Set password' onChange={(e)=>onInputChange(e,'password')} />
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
    