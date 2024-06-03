import styles from './order-address.module.scss';
import { useLanguage } from '@/context/languageDetails';


const AddressInfoCard = ({data}) => {
    const { headerTitle="", userName="" , address="" , phoneNo="" } = data || {}
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


    return (
        <div className={styles.addressInfoCard}>
            <div className={styles.headerTitle}>{headerTitle}</div>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.addressInfo}>{address}</div>
            <div className={styles.phoneno}>{isArabic ? "رقم الهاتف" : "Phone no "}: {phoneNo}</div>
        </div>
    )
}



export default function OrderAddress({data}) {


    const shippingAddress = {
        headerTitle:"Shipping Address",
        userName:"Karif Daoud",
        address:"12th Floor Yes Business Centre Al Barsha – Dubai United Arab Emirates",
        phoneNo:"971-8996689"
    }
    const billingAddress = {
        headerTitle:"Billing Address",
        userName:"Karif Daoud",
        address:"12th Floor Yes Business Centre Al Barsha – Dubai United Arab Emirates",
        phoneNo:"971-8996689"
    }

  return (
    <>
        <AddressInfoCard  data={shippingAddress}/>
        <AddressInfoCard  data={billingAddress}/>
    </>

  )
}
