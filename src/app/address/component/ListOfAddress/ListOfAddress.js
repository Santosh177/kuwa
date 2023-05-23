'use client';
import { useRouter } from 'next/navigation';
import AddressInfo from '../AddressInfo/AddressInfo';
import { useAddressData } from "@/context/address";
import styles from './list-of-address.module.scss'
import { useEffect, useState } from 'react';


export default function ListOfAddress({}) {
  const router = useRouter();
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} } = useAddressData();
  const [selectedAdddressId, setSelectedAddressId] = useState(null);

  const onRemoveAddress = () =>{

  }

  const onChangeAddress = (data) =>{
    setSelectedAddress(data)
    router.push('/order-summary')
  }



  
      return (
        <>
          <div className={styles.addressListWrapper}>
            <div className={styles.addNewAddressTxt} onClick={()=> router.push('/address/add-address')}>+ Add new address</div>
            <div className={styles.addressInfoContainer}>
                {
                    listOfAddress.map((data,index)=>{
                        const addressTxt = data.address +" " +data.apartment + " " +data.city + " " +data.country || "";
                        const addressData = {
                            userName:data.firstName + " " + data.lastName,
                            addressTxt:addressTxt,
                            phoneNo:data.phone || "",
                            id:data.id
                        }
                        const isSelected = false;
                        return(
                            <AddressInfo data={addressData} key={index} onSelectAddress={()=>onChangeAddress(data)} isSelected={isSelected} onRemoveAddress={onRemoveAddress}/>
                        )
                    })
                }
            </div>
          </div>
        </>
       
      )
    }
    