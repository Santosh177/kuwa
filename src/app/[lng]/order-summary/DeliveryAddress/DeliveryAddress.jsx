import { useRouter,useSearchParams } from 'next/navigation';
import { useAddressData } from "@/context/address";
import { useAuth } from '@/context/userDetail';
import styles from './delivery-address.module.scss';
import { useLanguage } from '@/context/languageDetails';
import { queryParams } from '@/services';

export default function DeliveryAddress() {
  const router = useRouter();
  const { selectedAddress ={}} = useAddressData();
  const { firstName="", lastName="" , mobNumber="" , apartment="", address="",country="",city="",postalCode=""} = selectedAddress || {};
  const userName = firstName + " " +lastName;
  const addressTxt1 = apartment+ " " +address
  const addressTxt2 = city + " " + (postalCode ? ` ${postalCode}` : "")+ " " +country;
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
const search = useSearchParams();

    console.log("deliverAddress",selectedAddress)
    const productId = search.get('productId');
    const variantId = search.get('variantId');

    const changeAddress = () => {
    let queryString = '';
    if (productId) {
      queryString = queryParams(productId, variantId);
    }
    router.push(`/address/select-address/?${queryString}`);
  }
      return (
        <div className={styles.deliveryAddress}> 
            <div className={styles.actionItem}>
                <div className={styles.headerTxt}>{isArabic ? "عنوان الشحن" :  "Shipping address"}</div>
                <div className={styles.changeAction} onClick={changeAddress}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                    <div className={styles.changeTxt} >{isArabic ? "تغيير" : "Change"}</div>
                </div>
            </div>
            <div className={styles.name}>{userName}</div>
            <div className={styles.txt}>{addressTxt1}</div>
            <div className={styles.txt}>{addressTxt2}</div>
            <div className={styles.txt}>{isArabic ?  "رقم الهاتف" : "Phone no"} : {mobNumber}</div>
        </div>
      )
    }
    
