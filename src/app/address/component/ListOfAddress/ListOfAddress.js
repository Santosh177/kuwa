'use client';
import { useRouter,usePathname } from 'next/navigation';
import AddressInfo from '../AddressInfo/AddressInfo';
import { useAddressData } from "@/context/address";
import SubmitBtn from '../SubmitBtn/SubmitBtn';
import styles from './list-of-address.module.scss'
import { useEffect, useState } from 'react';


export default function ListOfAddress({}) {
  const router = useRouter();
  const pathName = usePathname();
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} , setListOfAddress={} } = useAddressData();
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

    
    const filterAddressId = listOfAddress.filter((data,index)=> data.id != removeAddress.id);
    const isSelectedAddressId = removeAddress.id === selectedAddress.id;
    if(isSelectedAddressId){
      const defaultAddress = filterAddressId.find((data) => data.isDefaultAddress);
      if(defaultAddress){
        setSelectedAddress(defaultAddress)
      }else{
        setSelectedAddress(filterAddressId[0])
      }
    }
    setListOfAddress(filterAddressId);
  }

  const onChangeAddress = (data) =>{
    setSelectedAddress(data)
    // router.push('/order-summary')
  }


  const onEditAddress = () => {
    
  }

  const onSelectAddress = () => {
    router.push('/order-summary')
  }
 



  
      return (
        <>
          <div className={styles.addressListWrapper}>
            <div className={styles.addNewAddressTxt} onClick={()=> router.push(`/address/add-address?referer=${pathName}`)}>+ Add new address</div>
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
                        const isSelected = (selectedAddress.id == data.id);
                        return(
                            <AddressInfo data={addressData} key={index} onSelectAddress={()=>onChangeAddress(data)} isSelected={isSelected} onRemoveAddress={()=>onRemoveAddress(data.id)} onEditAddress={()=>onEditAddress()} />
                        )
                    })
                }
            </div>
          </div>
          <SubmitBtn btnName='Save & proceed' onClick={onSelectAddress} />
        </>
       
      )
    }
    