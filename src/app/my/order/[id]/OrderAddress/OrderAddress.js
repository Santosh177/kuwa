'use client';
import styles from './order-address.module.scss';


const AddressInfoCard = ({data}) => {
    const { headerTitle="", userName="" , address="" , phoneNo="" } = data || {}

    return (
        <div className={styles.addressInfoCard}>
            <div className={styles.headerTitle}>{headerTitle}</div>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.addressInfo}>{address}</div>
            <div className={styles.phoneno}>Phone no : {phoneNo}</div>
        </div>
    )
}



export default function OrderAddress({address}) {
    const {shippingAddress={}, billingAddress={} } = address || {}
    let  shippingAddressData= {};
    let billingAddressData= {};
    if(shippingAddress && Object.keys(shippingAddress).length > 0){
        shippingAddressData = {
            headerTitle:"Shipping Address",
            userName:shippingAddress['firstName'] || "",
            address: shippingAddress['address'] +" "+ shippingAddress['apartment'] + " " + shippingAddress['country'] || "",
            phoneNo:shippingAddress['mobNumber'] || ""
        }
    }


    if(billingAddress && Object.keys(billingAddress).length > 0){
        billingAddressData     = {
            headerTitle:"Billing Address",
            userName:billingAddress['firstName'],
            address:billingAddress['address'] +" "+ billingAddress['apartment'] + " " + billingAddress['country'],
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
