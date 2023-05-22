'use client';
import { useRouter } from 'next/navigation';
import AddressInfo from '../AddressInfo/AddressInfo';
import styles from './list-of-address.module.scss'


export default function ListOfAddress({addressList}) {
  const router = useRouter();



  


  
      return (
        <>
          <div className={styles.addressListWrapper}>
            <div className={styles.addNewAddressTxt} onClick={()=> router.push('/address/add-address')}>+ Add new address</div>
            <div className={styles.addressInfoContainer}>
                {
                    addressList.map((data,index)=>{
                        const addressTxt = data.address +" " +data.apartment + " " +data.city + " " +data.country || "";
                        const addressData = {
                            userName:data.firstName + " " + data.lastName,
                            addressTxt:addressTxt,
                            phoneNo:data.phone || ""
                        }
                        return(
                            <AddressInfo data={addressData} key={index}/>
                        )
                    })
                }
            </div>
          </div>
        </>
       
      )
    }
    