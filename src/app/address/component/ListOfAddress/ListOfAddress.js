'use client';
import { useRouter } from 'next/navigation';
import AddressInfo from '../AddressInfo/AddressInfo';
import styles from './list-of-address.module.scss'
import { useEffect, useState } from 'react';


export default function ListOfAddress({addressList}) {
  const router = useRouter();
  const [selectedAdddressId, setSelectedAddressId] = useState(null);
  useEffect(()=>{
    if(addressList && addressList.length > 0){
        setSelectedAddressId(addressList[0].id)
    }
  },[addressList])

  
      return (
        <>
          <div className={styles.addressListWrapper}>
            <div className={styles.addNewAddressTxt} onClick={()=> router.push('/address/add-address')}>+ Add new address</div>
            <div className={styles.addressInfoContainer}>
                {
                    addressList.map((data,index)=>{
                        console.log("Ddd",data)
                        const addressTxt = data.address +" " +data.apartment + " " +data.city + " " +data.country || "";
                        const addressData = {
                            userName:data.firstName + " " + data.lastName,
                            addressTxt:addressTxt,
                            phoneNo:data.phone || "",
                            id:data.id
                        }
                        const isSelected = selectedAdddressId === data.id;
                        return(
                            <AddressInfo data={addressData} key={index} onSelectAddress={setSelectedAddressId} isSelected={isSelected}/>
                        )
                    })
                }
            </div>
          </div>
        </>
       
      )
    }
    