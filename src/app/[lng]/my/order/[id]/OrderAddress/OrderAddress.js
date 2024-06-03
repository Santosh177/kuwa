'use client';
import styles from './order-address.module.scss';
import { useLanguage } from '@/context/languageDetails';


const AddressInfoCard = ({data}) => {
    const { headerTitle="", userName="" , address1="" , phoneNo="",address2 } = data || {}
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


    return (
        <div className={styles.addressInfoCard}>
            <div className={styles.headerTitle}>{headerTitle}</div>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.addressInfo}>{address1}</div>
            <div className={styles.addressInfo}>{address2}</div>
            <div className={styles.phoneno}>{isArabic ?  "رقم الهاتف" : "Phone no"} : {phoneNo}</div>
        </div>
    )
}



export default function OrderAddress({address}) {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    const {shippingAddress={}, billingAddress={} } = address || {}
    let  shippingAddressData= {};
    let billingAddressData= {};
    if(shippingAddress && Object.keys(shippingAddress).length > 0){
        shippingAddressData = {
            headerTitle: isArabic ?  "عنوان الشحن" : "Shipping Address",
            userName:shippingAddress['firstName'] || "",
            address1: shippingAddress['address'] +" "+ shippingAddress['apartment'] ,
            address2: shippingAddress['city'] + " " + (shippingAddress['postalCode'] ? `${shippingAddress['postalCode']}` : "") + " " + shippingAddress['country'] || "",
            phoneNo:shippingAddress['mobNumber'] || ""
        }
    }


    if(billingAddress && Object.keys(billingAddress).length > 0){
        billingAddressData     = {
            headerTitle:isArabic ? "عنوان الفواتير" : "Billing Address",
            userName:billingAddress['firstName'],
            address1:billingAddress['address'] +" "+ billingAddress['apartment'] ,
            address2: billingAddress['city'] + " " + (billingAddress['postalCode'] ? `${billingAddress['postalCode']}` : "") + " " + billingAddress['country'] || "",
            phoneNo:billingAddress['mobNumber']
        }
    }
   
    

  return (
    <>
        <AddressInfoCard  data={shippingAddressData}/>
        <AddressInfoCard  data={billingAddressData}/>
    </>

  )
}
