'use client';

import Input from "@/components/Input/Input";
import PhoneNumberInput from "@/components/PhoneNumberInput/PhoneNumberInput";
import CreateAccountBox from "../components/CreateAccountBox/CreateAccountBox";
import styles from './address-form.module.scss';
import { useEffect, useState } from "react";


const ValidationSchema = [
    {
        "firstName":{
            isRequired: true,
            rules: [
                {

                }
            ]
        },
        "lastName":{
            isRequired: true
        },
        "email":{
            isRequired: true
        },
        "area":{
            isRequired: true
        },
        "apartment":{
            isRequired: true
        },
        "country": {
            isRequired: true
        },
        "stateProvince":{
            isRequired: true
        }
    }
]

const PersonalInfoFrom = ({onChange={},values={},isEdit}) => {
    return (
        <div className={styles.personalInfoForm}>
            <div className={styles.headerTxt}>Personal Info</div>
           {!isEdit && <CreateAccountBox />}
            <div className={styles.userNameContainer}>
                <Input type="text" fieldName="firstName" placeHolder="First name *" style={{width:'49%'}}  value={values['firstName']} onInputChange={onChange} />
                <Input type="text" fieldName="lastName" placeHolder="Last name *" style={{width:'49%'}} value={values['lastName']} onInputChange={onChange} />
            </div>
            <PhoneNumberInput type="text" fieldName="phone" style={{width:'49%'}} value={values['phone']} onInputChange={onChange} />
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
                    <input type="text" id='address' name='address' autocomplete="off" value={values['address']} onChange={(e)=>onChange(e,"address")} />
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


export default function AddressForm({onFormData,formData, isEdit=false}) {

      const [ values , setValues ] = useState(formData);
      const [ errors , setErrors ] = useState({});

      const onChange = (e,fieldName) => {
        const value = e.target.value;
        setValues(currentValues =>({...currentValues,[fieldName]:value}))

      }

      useEffect(()=>{
            setValues(formData)
      },[formData])

      useEffect(()=>{
        validate();
        onFormData(values);
      },[values]);

      const validate = () => {
        try {
            console.log("validatevalidate")
        } catch (error) {
            
        }
      }


      


      console.log("valuesvalues",values)



  
      return (
        <>
          <div className={styles.addressForm}> 
            <PersonalInfoFrom onChange={onChange} values={values} isEdit={isEdit} />
            <AddressInfoForm onChange={onChange} values={values}/>
          </div>
        </>
      )
    }
    