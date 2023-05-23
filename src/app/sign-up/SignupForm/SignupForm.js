'use client';
import { useRouter } from 'next/navigation';
import styles from './sign-up-card.module.scss';
import { useEffect, useState } from 'react';





export default function SignupForm() {
    const router = useRouter();

    const [ formData , setFormData] = useState({})


    useEffect(()=>{

        console.log("form Data",formData)

    },[formData])
   
    const onInputChange = (event, labelId) =>{
        setFormData(inputs => ({ ...inputs, [labelId]: event.target.value }));
    }
 
    return (
        <div className={styles.signUpFormContainer}>
            <div className={styles.userNameContainer}>
                <div className={styles.inputContain}>
                    <input type="text" id="fname" name="fname"  value={formData.firstName || ""} onChange={(e)=>onInputChange(e,'firstName')}  />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>First name *</div>
                    </label>
                </div>
                <div className={styles.inputContain}>
                    <input type="text" id="lname" name="fname"  value={formData.lastName || ""} onChange={(e)=>onInputChange(e,'lastName')}  />
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
    