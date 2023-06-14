'use client';
import { useEffect, useState } from "react";
import Input from "@/components/Input/Input";
import CheckBox from "@/components/Checkbox/Checkbox";
import PhoneNumberInput from "@/components/PhoneNumberInput/PhoneNumberInput";
import CreateAccountBox from "../components/CreateAccountBox/CreateAccountBox";
import { useAuth } from '@/context/userDetail';
import { useCountry } from '@/context/contryDetails';
import styles from './address-form.module.scss';


const validatePersonalForm = (formData) => {
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = 'First name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required.';
    }
    if(!formData.mobNumber){
      errors.mobNumber = "Mobile number is required";
    }
    if(!formData.email){
      errors.email = "Email is required";
    }else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address.';
    }
    return errors;
  };
const validateShippingAddressForm = (formData) => {
    const errors = {};
    if (!formData.address) {
      errors.address = 'Area is required.';
    }
    if (!formData.apartment) {
      errors.apartment = 'Apartment is required.';
    }
    if(!formData.country){
      errors.country = "Country is required";
    }
    if(!formData.stateProvince){
      errors.stateProvince = "State Province is required";
    }
    return errors;
  };


  const validateBillingAddressForm = (formData) => {
    const errors = {};
    if (!formData.address) {
      errors.address = 'Area is required.';
    }
    if (!formData.apartment) {
      errors.apartment = 'Apartment is required.';
    }
    if(!formData.country){
      errors.country = "Country is required";
    }
    if(!formData.stateProvince){
      errors.stateProvince = "State Province is required";
    }
    return errors;
  };


const PersonalInfoFrom = ({onChange={},values={},isEdit,errors={}}) => {

    const {isLogin=false, userData={}} = useAuth();
    // const onOrderUpdate = async(isOrderUpdate) => {
    //   let formData = {
    //     updateWhatsapp: isOrderUpdate
    //   }
    //   const res = await fetch('/api/profile-update', {
    //     method: 'POST',
    //     body:JSON.stringify(formData)
    //   })
    // }
    return (
        <div className={styles.personalInfoForm}>
            <div className={styles.headerTxt}>Personal Info</div>
           {(!isEdit && !isLogin) && <CreateAccountBox />}
            <div className={styles.userNameContainer}>
                <div className={styles.nameField}>
                    <Input type="text" fieldName="firstName" placeHolder="First name *"   value={values['firstName']} onInputChange={onChange}  />
                    {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                </div>
                <div className={styles.nameField}>
                    <Input type="text" fieldName="lastName" placeHolder="Last name *"  value={values['lastName']} onInputChange={onChange} />
                    {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                </div>
            </div>
            <PhoneNumberInput type="text" fieldName="mobNumber"  value={values['mobNumber']} onInputChange={onChange} />
            {errors.mobNumber && <span className={styles.errorMsg}>{errors.mobNumber}</span>}
            <div className={styles.orderUpdate} onClick={()=>{
              onChange(!values['orderUpdate'],'orderUpdate')
          }}>
                <CheckBox isChecked={values['orderUpdate']}/>
                <div className={styles.txt}>Get order updates on WhatsApp</div>
            </div>
            <Input type="email" fieldName="email" placeHolder="Email ID (ex. abc@gmail.com)" value={values['email']} onInputChange={onChange} isDisabled={isLogin || (isEdit && values['email'])}   />
            {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
        </div>
    )
}

const ShippingAddressForm = ({onChange={},values={},errors={}}) => {
    return (
        <div className={[styles.addressInfoForm,styles.shippingAddressForm].join(" ")}>
         <div className={styles.headerTxt}>Shipping Address</div>
            <div className={styles.areaInputText}>
                <div className={styles.inputContainer}>
                    <input type="text" id='address' name='address'  value={values['address']} onChange={(e)=>onChange(e,"address")} />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>Area name, Colony *</div>
                    </label>
                </div>
                {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
            </div>
            <Input type="text" fieldName="apartment" placeHolder="Appartment name, Floor, Room no, City*" value={values['apartment']} onInputChange={onChange}  />
            {errors.apartment && <span className={styles.errorMsg}>{errors.apartment}</span>}
            <div className={styles.countryContainer}>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="country" placeHolder="Country *"  value={values['country']} onInputChange={onChange} isDisabled={true} />
                    {errors.country && <span className={styles.errorMsg}>{errors.country}</span>}
                </div>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="stateProvince" placeHolder="State Province*"  value={values['stateProvince']} onInputChange={onChange}   />
                    {errors.stateProvince && <span className={styles.errorMsg}>{errors.stateProvince}</span>}
                </div>
            </div>
        </div>
    )
}

const BillingAddressForm = ({onChange={},values={},errors={}}) => {
    return (
        <div className={[styles.addressInfoForm,styles.billingAddressForm].join(" ")}>
         <div className={styles.headerTxt}>Billing Address</div>
            <div className={styles.areaInputText}>
                <div className={styles.inputContainer}>
                    <input type="text" id='address' name='address'  value={values['address']} onChange={(e)=>onChange(e,"address")} />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>Area name, Colony *</div>
                    </label>
                </div>
                {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
            </div>
            <Input type="text" fieldName="apartment" placeHolder="Appartment name, Floor, Room no, City*" value={values['apartment']} onInputChange={onChange}  />
            {errors.country && <span className={styles.errorMsg}>{errors.country}</span>}
            <div className={styles.countryContainer}>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="country" placeHolder="Country *"  value={values['country']} onInputChange={onChange} isDisabled={true} />
                    {errors.country && <span className={styles.errorMsg}>{errors.country}</span>}
                </div>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="stateProvince" placeHolder="State Province*"  value={values['stateProvince']} onInputChange={onChange}   />
                    {errors.stateProvince && <span className={styles.errorMsg}>{errors.stateProvince}</span>}
                </div>
            </div>
        </div>
    )
}

const getShippingAddressData = (data) => {
  return(
    {
      "firstName": data.firstName,
      "lastName": data.lastName,
      "mobNumber": data.mobNumber,
      "email": data.email,
      "country": data.country,
      "address": data.address,
      "apartment": data.apartment,
      "stateProvince":data.stateProvince ,
      "sameAddressForBilling": data.sameAddressForBilling,
      "billingAddress":data.billingAddress,
      "isDefaultAddress": data.isDefaultAddress,
      "isActive": data.isActive,
      "id":data.id
    }
  )
}

const getBillingAddressData = (data) => {
  console.log("biii",data)
  return(
    {
      "firstName": data.firstName,
      "lastName": data.lastName,
      "mobNumber": data.mobNumber,
      "email": data.email,
      "country": data.country,
      "address": data.address,
      "apartment": data.apartment,
      "stateProvince":data.stateProvince ,
      "isDefaultAddress": data.isDefaultAddress,
      "isActive": data.isActive
    }
  )
}


export default function AddressForm({onFormData,formData, isEdit=false,onGetFormValues,getFormValues}) {
     const {isLogin=false, userData={}} = useAuth();
     const { selectedCountry={} } = useCountry();
      const [ isSameBillingAddress, setIsSameBillingAddress ] = useState(true);
      const [ personalInfo, setPersonalInfo ] = useState({});
      const [ shippingAddress, setShippingAddress ] = useState ({country:selectedCountry.name});
      const [ billngAddress, setBillngAddress ] = useState({country:selectedCountry.name});
      const [personalInfoErrors, setPersonalInfoErrors] = useState({});
      const [shippingAddressErrors, setShippingAddressErrors] = useState({});
      const [billingAddressErrors, setBillingAddressErrors] = useState({});

      useEffect(()=>{
        if(isEdit && formData && Object.keys(formData).length > 0){
          console.log("formData",formData)


            
            setShippingAddress(getShippingAddressData(formData['shippingAddress']));
            setBillngAddress(getBillingAddressData(formData['billingAddress']));
            setIsSameBillingAddress(formData['shippingAddress'].sameAddressForBilling || false)
            const { firstName="", lastName="", email="", mobNumber="",orderUpdate=false } = formData['shippingAddress'] || {}
            const userObject = {
                'firstName':firstName,
                'lastName':lastName,
                'mobNumber':mobNumber,
                'email':email,
                'orderUpdate':orderUpdate
    
            }
            setPersonalInfo(userObject)
        }
      },[formData]);
      

      useEffect(()=>{
        const { firstName="", lastName="", emailAddress="", mobNumber="",updateWhatsapp=false } = userData || {}
        const userObject = {
            'firstName':firstName,
            'lastName':lastName,
            'mobNumber':mobNumber,
            'email':emailAddress

        }
        if(!isEdit)
        setPersonalInfo(userObject)
      },[userData])

      const addressValidation = () => {
        const validationPersonalInfoErrors = validatePersonalForm(personalInfo);
        const validationShippingErrors = validateShippingAddressForm(shippingAddress);
        const validationBillingErrors = validateBillingAddressForm(billngAddress);
       
        if (Object.keys(validationPersonalInfoErrors).length === 0 && Object.keys(validationShippingErrors).length === 0 && isSameBillingAddress ){
          return true
        }else if(Object.keys(validationPersonalInfoErrors).length === 0 && Object.keys(validationShippingErrors).length === 0 && Object.keys(validationBillingErrors).length === 0){
          return true
        }else{
          return false
        }
       
      }


      useEffect(()=>{
      if(getFormValues){
        const validationPersonalInfoErrors = validatePersonalForm(personalInfo);
        const validationShippingErrors = validateShippingAddressForm(shippingAddress);
        const validationBillingErrors = validateBillingAddressForm(billngAddress);
        if (addressValidation()) {
                let combineFormData = {
                    "shippingAddress":{...shippingAddress,...personalInfo},
                }
                if(isSameBillingAddress){
                    combineFormData['billingAddress'] ={...shippingAddress,...personalInfo,}
                    combineFormData['shippingAddress']['sameAddressForBilling'] = true;
                }else{
                    combineFormData['billingAddress'] = {...billngAddress,...personalInfo,}
                }
                combineFormData['shippingAddress']['billingAddress'] = true;
                combineFormData['shippingAddress']['isActive'] = true;
                combineFormData['billingAddress']['shippingAddress'] = true;
                combineFormData['billingAddress']['isActive'] = true;
                if(!isEdit){
                  combineFormData['shippingAddress']['isDefaultAddress'] = true;
                  combineFormData['billingAddress']['isDefaultAddress'] = true;
                }
                onGetFormValues(combineFormData);

        }else{
            setPersonalInfoErrors(validationPersonalInfoErrors);
            setShippingAddressErrors(validationShippingErrors);
            setBillingAddressErrors(validationBillingErrors);
        }
           
        }
      },[getFormValues])

     

      const onPersonalInfo = (e,fieldName) => {
        let value = ""
        if(fieldName === 'mobNumber'){
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
        if(fieldName === 'mobNumber'){
            value = e
        }else{
            value = e.target.value;
        }
        setShippingAddress(currentValues =>({...currentValues,[fieldName]:value}))
      }

      const onBillngAddress = (e,fieldName) => {
        let value = ""
        if(fieldName === 'mobNumber'){
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
            <PersonalInfoFrom onChange={onPersonalInfo} values={personalInfo} isEdit={isEdit} errors={personalInfoErrors} />
            <div className={styles.addressContainer}>
                <ShippingAddressForm onChange={onShippingAddress} values={shippingAddress} errors={shippingAddressErrors} />
                <div className={styles.selectBillingAddressBtn} onClick={()=> onSelectBillngAddress()}>
                    <CheckBox isChecked={isSameBillingAddress}/>
                    <div className={styles.txt}>Use this same address for billing</div>
                </div>
                {!isSameBillingAddress && <BillingAddressForm onChange={onBillngAddress} values={billngAddress} errors={billingAddressErrors}/>}
            </div>
          </div>
        </>
      )
    }
    