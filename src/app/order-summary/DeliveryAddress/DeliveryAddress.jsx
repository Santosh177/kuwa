import { useRouter } from 'next/navigation';
import { useAddressData } from "@/context/address";
import styles from './delivery-address.module.scss';

export default function DeliveryAddress() {
  const router = useRouter();
  const { selectedAddress ={},} = useAddressData();
  const { firstName="", lastName="" , phone="" , apartment="", address="",country=""} = selectedAddress || {};
  const userName = firstName + " " +lastName;
  const addressTxt = apartment+ " " +address + " " +country;
  

    console.log("ht",selectedAddress)
  
      return (
        <div className={styles.deliveryAddress}> 
            <div className={styles.actionItem}>
                <div className={styles.headerTxt}>Shipping address</div>
                <div className={styles.changeAction}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                    <div className={styles.changeTxt} onClick={()=>router.push('/address/select-address')}>Change</div>
                </div>
            </div>
            <div className={styles.name}>{userName}</div>
            <div className={styles.txt}>{addressTxt}</div>
            <div className={styles.txt}>Phone no : {phone}</div>
        </div>
      )
    }
    