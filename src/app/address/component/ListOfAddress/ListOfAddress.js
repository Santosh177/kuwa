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

  const onRemoveAddress = async(addressId) =>{
    const removeAddressResp  =  await fetch(`/api/delete-address`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({addressId:addressId}),
      next: { revalidate: 0} 
    })
    const removeAddress = await removeAddressResp.json();
    console.log("removeAddress",removeAddress)
  }

  const onChangeAddress = (data) =>{
    setSelectedAddress(data)
    router.push('/order-summary')
  }


  const onEditAddress = () => {
    
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
                            <AddressInfo data={addressData} key={index} onSelectAddress={()=>onChangeAddress(data)} isSelected={isSelected} onRemoveAddress={()=>onRemoveAddress(data.id)} onEditAddress={()=>onEditAddress()} />
                        )
                    })
                }
            </div>
          </div>
        </>
       
      )
    }
    