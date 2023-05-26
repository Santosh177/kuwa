'use client';

import Input from "@/components/Input/Input";
import CheckBox from "@/components/Checkbox/Checkbox";
import PhoneNumberInput from "@/components/PhoneNumberInput/PhoneNumberInput";
import CreateAccountBox from "../components/CreateAccountBox/CreateAccountBox";
import { useAuth } from '@/context/userDetail';
import styles from './address-form.module.scss';
import { useEffect, useState } from "react";


const PersonalInfoFrom = ({onChange={},values={},isEdit}) => {


    return (
        <div className={styles.personalInfoForm}>
            <div className={styles.headerTxt}>Personal Info</div>
           {(!isEdit && !values['email']) && <CreateAccountBox />}
            <div className={styles.userNameContainer}>
                <Input type="text" fieldName="firstName" placeHolder="First name *" style={{width:'49%'}}  value={values['firstName']} onInputChange={onChange} isDisabled={isEdit && values['firstName']} />
                <Input type="text" fieldName="lastName" placeHolder="Last name *" style={{width:'49%'}} value={values['lastName']} onInputChange={onChange} isDisabled={isEdit &&  values['lastName']} />
            </div>
            <PhoneNumberInput type="text" fieldName="phone"  value={values['phone']} onInputChange={onChange} />
            <div className={styles.orderUpdate} onClick={()=>onChange(!values['orderUpdate'],'orderUpdate')}>
                <CheckBox isChecked={values['orderUpdate']}/>
                <div className={styles.txt}>Get order updates on WhatsApp</div>
            </div>
            <Input type="email" fieldName="email" placeHolder="Email ID (ex. abc@gmail.com)" value={values['email']} onInputChange={onChange} isDisabled={isEdit && values['email']}   />
        </div>
    )
}

const ShippingAddressForm = ({onChange={},values={}}) => {
    return (
        <div className={styles.addressInfoForm}>
         <div className={styles.headerTxt}>Shipping Address</div>
            <div className={styles.areaInputText}>
                <div className={styles.inputContainer}>
                    <input type="text" id='address' name='address'  value={values['address']} onChange={(e)=>onChange(e,"address")} />
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

const BillingAddressForm = ({onChange={},values={}}) => {
    return (
        <div className={styles.addressInfoForm}>
         <div className={styles.headerTxt}>Billing Address</div>
            <div className={styles.areaInputText}>
                <div className={styles.inputContainer}>
                    <input type="text" id='address' name='address'  value={values['address']} onChange={(e)=>onChange(e,"address")} />
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


export default function AddressForm({onFormData,formData, isEdit=false,onGetFormValues,getFormValues}) {
     const {isLogin=false, userData={}} = useAuth();
      const [ isSameBillingAddress, setIsSameBillingAddress ] = useState(false);
      const [ personalInfo, setPersonalInfo ] = useState({});
      const [ shippingAddress, setShippingAddress ] = useState ({});
      const [ billngAddress, setBillngAddress ] = useState({});

      useEffect(()=>{
        if(isEdit && formData && Object.keys(formData).length > 0){
            const { address="", apartment="", country=""  , stateProvince=""} = formData || {}
            const shippingAddressObject = {
                'address':address,
                'apartment':apartment,
                'country':country,
                'stateProvince':stateProvince
            }
            setShippingAddress(shippingAddressObject)
        }
      },[formData]);
      

      useEffect(()=>{
        const { firstName="", lastName="", emailAddress="" } = userData || {}
        const userObject = {
            'firstName':firstName,
            'lastName':lastName,
            'phone':"",
            'email':emailAddress
        }
        setPersonalInfo(userObject)
      },[userData])


      useEffect(()=>{
      if(getFormValues){
            let combineFormData = {
                "shippingAddress":{...personalInfo,...shippingAddress},
            }
            if(isSameBillingAddress){
                combineFormData['billingAddress'] ={...personalInfo,...shippingAddress}
            }else{
                combineFormData['billingAddress'] = {...personalInfo,...billngAddress}
            }
            combineFormData['shippingAddress']['billingAddress'] = true;
            combineFormData['shippingAddress']['isDefaultAddress'] = true;
            combineFormData['shippingAddress']['isActive'] = true;
            combineFormData['billingAddress']['shippingAddress'] = true;
            combineFormData['billingAddress']['isDefaultAddress'] = true;
            combineFormData['billingAddress']['isActive'] = true;
            onGetFormValues(combineFormData);
        }
      },[getFormValues])

     

      const onPersonalInfo = (e,fieldName) => {
        let value = ""
        if(fieldName === 'phone'){
            value = e;
        }else if(fieldName === 'orderUpdate'){
            value = e;
        }
        else{
            value = e.target.value;
        }
        setPersonalInfo(currentValues =>({...currentValues,[fieldName]:value}))
      }
      
      const onShippingAddress = (e,fieldName) => {
        let value = ""
        if(fieldName === 'phone'){
            value = e
        }else{
            value = e.target.value;
        }
        setShippingAddress(currentValues =>({...currentValues,[fieldName]:value}))
      }

      const onBillngAddress = (e,fieldName) => {
        let value = ""
        if(fieldName === 'phone'){
            value = e
        }else{
            value = e.target.value;
        }
        setBillngAddress(currentValues =>({...currentValues,[fieldName]:value}))
      }

      const onSelectBillngAddress = () => {
        // if(!isShowBillingAddress){
        //     setBillngAddress({})
        // }
        setIsSameBillingAddress(!isSameBillingAddress)
      }

  
      console.log("personalInfo",personalInfo)
      console.log("shippingAddress",shippingAddress)
      console.log("billngAddress",billngAddress)
      return (
        <>
          <div className={styles.addressForm}> 
            <PersonalInfoFrom onChange={onPersonalInfo} values={personalInfo} isEdit={isEdit} />
            <div className={styles.addressContainer}>
                <ShippingAddressForm onChange={onShippingAddress} values={shippingAddress}/>
                <div className={styles.selectBillingAddressBtn} onClick={()=> onSelectBillngAddress()}>
                    <CheckBox isChecked={isSameBillingAddress}/>
                    <div className={styles.txt}>Use this same address for billing</div>
                </div>
                {!isSameBillingAddress && <BillingAddressForm onChange={onBillngAddress} values={billngAddress} />}
            </div>
          </div>
        </>
      )
    }
    