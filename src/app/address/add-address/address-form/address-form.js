'use client';

import Input from "@/components/Input/Input";
import styles from './address-form.module.scss';


export default function AddressForm() {



  
      return (
        <>
          <div className={styles.addressForm}> 
            <div className={styles.userNameContainer}>
                <Input type="text" fieldName="firstName" placeHolder="First name *" style={{width:'49%'}}  />
                <Input type="text" fieldName="lastName" placeHolder="Last name *" style={{width:'49%'}}  />
            </div>
            <Input type="email" fieldName="email" placeHolder="Email ID (ex. abc@gmail.com)"  />
            <div className={styles.areaInputText}>
                <div className={styles.inputContainer}>
                    <input type="text" id='area' name='area' autocomplete="off" value={''} onChange={(e)=>onInputChange(e,fieldName)} />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>Area name, Colony *</div>
                    </label>
                </div>
            </div>
            <Input type="email" fieldName="email" placeHolder="Appartment name, Floor, Room no, City*"  />
            <div className={styles.countryContainer}>
                <Input type="text" fieldName="country" placeHolder="Country *"  style={{width:'49%'}} />
                <Input type="text" fieldName="stateProvince" placeHolder="State Province*" style={{width:'49%'}}  />
            </div>
          </div>
        </>
      )
    }
    