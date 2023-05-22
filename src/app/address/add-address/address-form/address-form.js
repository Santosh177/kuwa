'use client';

import Input from "@/components/Input/Input";
import PhoneNumberInput from "@/components/PhoneNumberInput/PhoneNumberInput";
import CreateAccountBox from "../components/CreateAccountBox/CreateAccountBox";
import styles from './address-form.module.scss';
import { useState } from "react";

const PersonalInfoFrom = ({onChange={},values={}}) => {


    return (
        <div className={styles.personalInfoForm}>
            <div className={styles.headerTxt}>Personal Info</div>
            <CreateAccountBox />
            <div className={styles.userNameContainer}>
                <Input type="text" fieldName="firstName" placeHolder="First name *" style={{width:'49%'}}  value={values['firstName']} onInputChange={onChange} />
                <Input type="text" fieldName="lastName" placeHolder="Last name *" style={{width:'49%'}} value={values['lastName']} onInputChange={onChange} />
            </div>
            <PhoneNumberInput />
            <Input type="email" fieldName="email" placeHolder="Email ID (ex. abc@gmail.com)" value={values['email']} onInputChange={onChange}   />
        </div>
    )
}

const AddressInfoForm = ({onChange={},values={}}) => {
    return (
        <div className={styles.addressInfoForm}>
         <div className={styles.headerTxt}>Address</div>
            <div className={styles.areaInputText}>
                <div className={styles.inputContainer}>
                    <input type="text" id='area' name='area' autocomplete="off" value={values['area']} onChange={(e)=>onChange(e,"area")} />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>Area name, Colony *</div>
                    </label>
                </div>
            </div>
            <Input type="text" fieldName="apartment" placeHolder="Appartment name, Floor, Room no, City*" value={values['apartment']} onInputChange={onChange}  />
            <div className={styles.countryContainer}>
                <Input type="text" fieldName="country" placeHolder="Country *"  style={{width:'49%'}} value={values['country']} onInputChange={onChange}  />
                <Input type="text" fieldName="stateProvince" placeHolder="State Province*" style={{width:'49%'}} value={values['stateProvince']} onInputChange={onChange}   />
            </div>
        </div>
    )
}


export default function AddressForm() {

      const [ values , setValues ] = useState({});

      const onChange = (e,fieldName) => {
        const value = e.target.value;
        console.log("fieldName",fieldName)
        setValues(currentValues =>({...currentValues,[fieldName]:value}))
        
      }



      console.log("values",values)
  
      return (
        <>
          <div className={styles.addressForm}> 
        
            <PersonalInfoFrom onChange={onChange} values={values} />
            <AddressInfoForm onChange={onChange} values={values}/>
          </div>
        </>
      )
    }
    