'use client';
import { useEffect, useState, useRef } from "react";
import Input from "@/app/[lng]/components/Input/Input";
import CheckBox from "@/app/[lng]/components/Checkbox/Checkbox";
import PhoneNumberInput from "@/app/[lng]/components/PhoneNumberInput/PhoneNumberInput";
import CreateAccountBox from "../components/CreateAccountBox/CreateAccountBox";
import { useAuth } from '@/context/userDetail';
import { useCountry } from '@/context/contryDetails';
// import { checkInternationalPhone } from "../../../../utils/validation";
import { checkInternationalPhone } from "@/utils/validation";
import styles from './address-form.module.scss';
import EmailExistPopUp from "../components/EmailExistPopUp/EmailExistPopUp";
import Loader from "@/app/[lng]/components/Loader/Loader";
import { isMobile, isTablet, isAndroid, isIOS } from 'react-device-detect';

import { useLanguage } from "@/context/languageDetails";

const validatePersonalForm = (formData) => {

  console.log("validatePersonalForm",formData)
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = 'First name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required.';
    }
    if(("mobNoValidation" in formData) && !formData.mobNoValidation){
      errors.mobNumber = "Mobile number is required";
    }
    if(!formData.mobNumber){
        errors.mobNumber = "Mobile number is required";
    }
    else if(formData &&  ("mobNoValidation" in formData) && formData.mobNoValidation && !checkInternationalPhone(formData.mobNoValidation)){
      errors.mobNumber = "Invalid mobile number";
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
      errors.address =
      //  formData.isArabic ? "المنطقة مطلوبة" :
       'Area is required.';
    }
    if (!formData.apartment) {
      errors.apartment =
      //  formData.isArabic ? "الشقة مطلوبة" :
       'Apartment is required.';
    }
    if(!formData.country){
      errors.country = "Country is required";
    }
    if(!formData.city){
      errors.city = 
      // formData.isArabic ? "المدينة مطلوبة":
        "City is required";
    }
    // if(!formData.postalCode){
    //   errors.postalCode = "Postal Code is required";
    // }
    // if(!formData.stateProvince){
      // errors.stateProvince = "State Province is required";
    // }
    return errors;
  };


const validateBillingAddressForm = (formData) => {
    const errors = {};
    if (!formData.address) {
      errors.address = 
      // formData.isArabic ? "المنطقة مطلوبة" : 
      'Area is required.';
    }
    if (!formData.apartment) {
      errors.apartment = 
      // formData.isArabic ? "الشقة مطلوبة" :
       'Apartment is required.';
    }
    if(!formData.country){
      errors.country = "Country is required";
    }
    if(!formData.city){
      errors.city =
      //  formData.isArabic ? "المدينة مطلوبة": 
        "City is required";
    }
    // if(!formData.postalCode){
    //   errors.postalCode = "Postal Code is required";
    // }
    // if(!formData.stateProvince){
    //   errors.stateProvince = "State Province is required";
    // }
    return errors;
  };



const PersonalInfoFrom = ({countryCode="" ,onChange={},values={},isEdit,errors={},setIsShowEmailExistPopUp,isShowEmailExistPopUp}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


  const [emailError,setEmailError] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const {isLogin=false, userData={}} = useAuth();
  const [pageType, setPageType] = useState(getPageType())

    const emailInputRef = useRef(null);
    // const emailValueRef = useRef(values['email']);

    const validateEmail = (email) => {
      console.log("abjab",email)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
      const handleResize = () => {
        setPageType(getPageType());
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
    function getPageType() {
      return window.innerWidth > 770 ? 'web' : 'mWeb';
    }

    function getDeviceType() {
      if (isMobile) {
        if (isAndroid) {
          return 'Android';
        } else if (isIOS) {
          return 'iOS';
        } else {
          return 'Mobile';
        }
      } else if (isTablet) {
        return 'Tablet';
      } else {
        return 'Desktop';
      }
    }

    


    useEffect(()=>{
      if(!isShowEmailExistPopUp){
        document.addEventListener("mousedown",handleClickOutside)
      }
    
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    },[values['email'],isShowEmailExistPopUp])

    useEffect(() => {
      const handleResize = () => {
        setPageType(getPageType());
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    
    function getPageType() {
      return window.innerWidth > 770 ? 'web' : 'mWeb';
    }
   

    const handleClickOutside = async(event) => {
      console.log("event",event)
      if (emailInputRef.current && !emailInputRef.current.contains(event.target) && !isLogin) {
        if (values['email']) {
          const isValidEmail = validateEmail(values['email']);
          if (!isValidEmail) {
            setEmailError("Please enter a valid email address");
          } else {
            setEmailError("");
           
            const emailPayload = {
              "email": values['email'],
              "firstName":values['firstName'],
              "lastName": values['lastName'],
              "mobileNumber":values['mobNumber'],
              "deviceType":getDeviceType(),
              "pageType":pageType
          }
          console.log("emailPayload",emailPayload)
          try{
            setIsLoading(true)
            const signUpResp = await fetch('/api/signup', {
              method: 'POST',
              body:JSON.stringify(emailPayload)
            })
            const signupRespData = await signUpResp.json();
            if (signupRespData.status_code !== 200) {
              setIsLoading(false)
              setIsShowEmailExistPopUp(true);
             
            }
            document.removeEventListener("mousedown", handleClickOutside); 
            // else if(signupRespData.status_code ==200){
            //   document.removeEventListener("mousedown", handleClickOutside); 
            // }
            
          }
        catch(err){
          console.log("error",err)
        }
        finally{
          setIsLoading(false)
        }
           
          }
        }
      }
    }

    return (
      <>
        <div className={styles.personalInfoForm}>
            <div className={styles.headerTxt}>{isArabic ? "المعلومات الشخصية" : "Personal Info"}</div>
           {/* {(!isEdit && !isLogin) && <CreateAccountBox />} */}
            <div className={styles.userNameContainer}>
                <div className={styles.nameField}>
                    <Input type="text" fieldName="firstName" placeHolder={isArabic ? "الاسم الأول *" : "First name *" }  value={values['firstName']} onInputChange={onChange}  />
                    {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                </div>
                <div className={styles.nameField}>
                    <Input type="text" fieldName="lastName" placeHolder={isArabic ? "الاسم الأخير *" :"Last name *"}  value={values['lastName']} onInputChange={onChange} />
                    {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                </div>
            </div>
            <PhoneNumberInput countryCode={countryCode} type="text" fieldName="mobNumber"  value={values['mobNumber']} onInputChange={onChange} />
            {errors.mobNumber && <span className={styles.errorMsg}>{errors.mobNumber}</span>}
            <div className={styles.orderUpdate} onClick={()=>{
              onChange(!values['orderUpdate'],'orderUpdate')
          }}>
                <CheckBox isChecked={values['orderUpdate']}/>
                <div className={styles.txt}>Get order updates on WhatsApp</div>
            </div>
            <div id="email" ref={emailInputRef}>
            <Input type="email" fieldName="email" placeHolder={isArabic ? "البريد الإلكتروني (مثال: abc@gmail.com)" : "Email ID (ex. abc@gmail.com)"} value={values['email']} 
            //  onInputChange={(e)=>handleChange(e)}
             onInputChange={onChange}
            isDisabled={isLogin || (isEdit && values['email'])} />
            {errors.email  && <span className={styles.errorMsg}>{errors.email } </span>}
            {emailError && <span className={styles.errorMsg}>{emailError} </span>}
            
            </div>
        </div>
        <Loader isShow={isLoading}/>
        </>
    )
}

const ShippingAddressForm = ({onChange={},values={},errors={}}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return (
        <div className={[styles.addressInfoForm,styles.shippingAddressForm].join(" ")}>
         <div className={styles.headerTxt}>{isArabic ? "عنوان الشحن" : "Shipping Address"}</div>
            <div className={styles.areaInputText}>
                <div className={styles.inputContainer}>
                    <input type="text" id='address' name='address'  value={values['address']} onChange={(e)=>onChange(e,"address")} />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>{isArabic ? "اسم المنطقة، الطريق، القطعة *" : "Area name, Road, Block *"}</div>
                    </label>
                </div>
                {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
            </div>
            <Input type="text" fieldName="apartment" placeHolder={isArabic ? "اسم البناء/الفيلا، الطابق، رقم الشقة *" : "Building/Villa name, Floor, Flat no. *"} value={values['apartment']} onInputChange={onChange}  />
            {errors.apartment && <span className={styles.errorMsg}>{errors.apartment}</span>}
            <div className={styles.countryContainer}>
              <div className={styles.addressDiv}>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="country" placeHolder={isArabic ? "البلد" : "Country *"}  value={values['country']} onInputChange={onChange} isDisabled={true} />
                    {errors.country && <span className={styles.errorMsg}>{errors.country}</span>}
                </div>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="city" placeHolder={isArabic ? "المدينة *" : "City *"}  value={values['city']} onInputChange={onChange}  />
                    {errors.city && <span className={styles.errorMsg}>{errors.city}</span>}
                </div>
                </div>
                <div className={styles.addressDiv}>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="stateProvince" placeHolder={isArabic ? "المحافظة/الولاية" : "State/Province"}  value={values['stateProvince']} onInputChange={onChange}   />
                    {/* {errors.stateProvince && <span className={styles.errorMsg}>{errors.stateProvince}</span>} */}
                </div>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="postalCode" placeHolder={isArabic ? "الرمز البريدي" : "Postal code "}  value={values['postalCode']} onInputChange={onChange}   />
                    {errors.postalCode && <span className={styles.errorMsg}>{errors.postalCode}</span>}
                </div>
                </div>
            </div>
        </div>
    )
}

const BillingAddressForm = ({onChange={},values={},errors={}}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return (
        <div className={[styles.addressInfoForm,styles.billingAddressForm].join(" ")}>
         <div className={styles.headerTxt}>{isArabic ? "عنوان الفواتير" : "Billing Address"}</div>
            <div className={styles.areaInputText}>
                <div className={styles.inputContainer}>
                    <input type="text" id='address' name='address'  value={values['address']} onChange={(e)=>onChange(e,"address")} />
                    <label className={styles.placeholderText}>
                        <div className={styles.text}>{isArabic ? "اسم المنطقة، الطريق، القطعة *" : "Area name, Road, Block *"}</div>
                    </label>
                </div>
                {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
            </div>
            <Input type="text" fieldName="apartment" placeHolder={isArabic ? "اسم البناء/الفيلا، الطابق، رقم الشقة *" : "Building/Villa name, Floor, Flat no. *"} value={values['apartment']} onInputChange={onChange}  />
            {errors.apartment && <span className={styles.errorMsg}>{errors.apartment}</span>}
            <div className={styles.countryContainer}>
            <div className={styles.addressDiv}>
                <div className={styles.countryInfoField}>
             
                    <Input type="text" fieldName="country" placeHolder={isArabic ? "البلد" : "Country *"}  value={values['country']} onInputChange={onChange} isDisabled={true} />
                    {errors.country && <span className={styles.errorMsg}>{errors.country}</span>}
                </div>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="city" placeHolder={isArabic ? "المدينة *" : "City *"}  value={values['city']} onInputChange={onChange}  />
                    {errors.city && <span className={styles.errorMsg}>{errors.city}</span>}
                </div>
                </div>
                <div className={styles.addressDiv}>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="stateProvince" placeHolder={isArabic ? "المحافظة/الولاية" : "State/Province"}  value={values['stateProvince']} onInputChange={onChange}   />
                    {/* {errors.stateProvince && <span className={styles.errorMsg}>{errors.stateProvince}</span>} */}
                </div>
                <div className={styles.countryInfoField}>
                    <Input type="text" fieldName="postalCode" placeHolder={isArabic ? "الرمز البريدي" : "Postal code "}  value={values['postalCode']} onInputChange={onChange}   />
                    {errors.postalCode && <span className={styles.errorMsg}>{errors.postalCode}</span>}
                </div>
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
      "id":data.id,
      "city": data.city,
      "postalCode":data.postalCode,
      // "isArabic" : isArabic
    }
  )
}

const getBillingAddressData = (data) => {
  // console.log("biii",data)
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
      "isActive": data.isActive,
      "city": data.city,
      "postalCode":data.postalCode,
      // "isArabic" : isArabic
    }
  )
}


export default function AddressForm({onFormData,formData, isEdit=false,onGetFormValues,getFormValues,error}) {
     const {isLogin=false, userData={}} = useAuth();
     const { selectedCountry={} } = useCountry();
      const countryCode = selectedCountry && selectedCountry.code || "";
      const [ isSameBillingAddress, setIsSameBillingAddress ] = useState(true);
      const [ personalInfo, setPersonalInfo ] = useState({});
      const [ shippingAddress, setShippingAddress ] = useState ({country:selectedCountry.name});
      const [ billngAddress, setBillngAddress ] = useState({country:selectedCountry.name});
      const [personalInfoErrors, setPersonalInfoErrors] = useState({});
      const [shippingAddressErrors, setShippingAddressErrors] = useState({});
      const [billingAddressErrors, setBillingAddressErrors] = useState({});
      const [isShowEmailExistPopUp, setIsShowEmailExistPopUp] = useState(false)
      const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

 
  // console.log("personalInfoErrors",personalInfoErrors)

  useEffect(()=>{
   

  },[shippingAddress])

  useEffect(()=>{

    if(error && Object.keys(error).length > 0){
      setPersonalInfoErrors(error)
    }
  },[error])

      useEffect(()=>{
        if(isEdit && formData && Object.keys(formData).length > 0){
          // console.log("formData",formData)

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

     

      const onPersonalInfo = (e,fieldName,data) => {
        
        let value = ""
        if(fieldName === 'mobNumber'){
            value = "+"+e;
        }else if(fieldName === 'orderUpdate'){
            value = e;
        }
        else{
            value = e.target.value;
        }
        if(fieldName === 'mobNumber'){
          setPersonalInfo(currentValues =>({...currentValues,[fieldName]:value,["mobNoValidation"]:e.slice(data.dialCode.length)}))
        }else{
          setPersonalInfo(currentValues =>({...currentValues,[fieldName]:value}))
        }
        const { [fieldName]: removedKey, ...newFormData } = personalInfoErrors;
        setPersonalInfoErrors(newFormData);
   
      }
      
    
      const onShippingAddress = (e,fieldName) => {
        let value = ""
        if(fieldName === 'mobNumber'){
            value = "+"+e
        }else{
            value = e.target.value;
        }
        setShippingAddress(currentValues =>({...currentValues,[fieldName]:value}))
        const { [fieldName]: removedKey, ...newFormData } = shippingAddressErrors;
        setShippingAddressErrors(newFormData);
      }

      const onBillngAddress = (e,fieldName) => {
        let value = ""
        if(fieldName === 'mobNumber'){
            value = "+"+e
        }else{
            value = e.target.value;
        }
        setBillngAddress(currentValues =>({...currentValues,[fieldName]:value}))
        const { [fieldName]: removedKey, ...newFormData } = billingAddressErrors;
        setBillingAddressErrors(newFormData);
      }

      const onSelectBillngAddress = () => {
        // if(!isShowBillingAddress){
        //     setBillngAddress({})
        // }
        setIsSameBillingAddress(!isSameBillingAddress)
      }

      

    
      return (
        <>
          <div className={styles.addressForm}> 
            <PersonalInfoFrom countryCode={countryCode} onChange={onPersonalInfo} values={personalInfo} isEdit={isEdit} errors={personalInfoErrors} setIsShowEmailExistPopUp={setIsShowEmailExistPopUp} isShowEmailExistPopUp={isShowEmailExistPopUp}  />
            <div className={styles.addressContainer}>
                <ShippingAddressForm onChange={onShippingAddress} values={shippingAddress} errors={shippingAddressErrors} />
                <div className={styles.selectBillingAddressBtn} onClick={()=> onSelectBillngAddress()}>
                    <CheckBox isChecked={isSameBillingAddress}/>
                    <div className={styles.txt}>{isArabic ? "استخدم هذا العنوان نفسه للفواتير" : "Use this same address for billing"}</div>
                </div>
                {!isSameBillingAddress && <BillingAddressForm onChange={onBillngAddress} values={billngAddress} errors={billingAddressErrors}/>}
            </div>
          </div>
          {isShowEmailExistPopUp &&<div className={styles.emailExistPopUp}>
          <EmailExistPopUp setIsShowEmailExistPopUp={setIsShowEmailExistPopUp} email={personalInfo['email']}/>
          </div> }
        </>
      )
    }
    