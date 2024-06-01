'use client';
import { useRouter,usePathname,useSearchParams } from 'next/navigation';
// import Loader from '@/components/Loader/Loader';
import Loader from '@/app/[lng]/components/Loader/Loader';
import AddressInfo from '../AddressInfo/AddressInfo';
import { useAddressData } from "@/context/address";
import SubmitBtn from '../SubmitBtn/SubmitBtn';
import styles from './list-of-address.module.scss'
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/languageDetails';

import { queryParams } from '@/services';


export default function ListOfAddress({addressList}) {
  const router = useRouter();
  const pathName = usePathname();
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} , setListOfAddress={} } = useAddressData();
  const [selectedAdddressId, setSelectedAddressId] = useState(null);
  const [ isLoading , setIsLoading] = useState(false)
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const search = useSearchParams();
  const onRemoveAddress = async(addressId) =>{
    setIsLoading(true)
    const removeAddressResp  =  await fetch(`/api/delete-address`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({addressId:addressId}),
      cache: 'no-store'
    })
    const removeAddress = await removeAddressResp.json();
    setIsLoading(false)
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
   
    const productId = search.get('productId');
    const variantId = search.get('variantId');
    if(productId){
      const queryString = queryParams(productId,variantId)
      window.location.href = `/payment/?${queryString}`
    }
    else{
      window.location.href = '/payment'
      // router.push('/payment')
    }
    
    // router.push('/payment')
  }
 



  
      return (
        <>
          <div className={styles.addressListWrapper}>
            <div className={styles.addNewAddressTxt} onClick={()=> router.push(`/address/add-address?referer=${pathName}`)}>+ {isArabic ? "أضف عنوانًا جديدًا" : "Add new address"}</div>
            <div className={styles.addressInfoContainer}>
                {
                    listOfAddress.map((data,index)=>{
                        const addressTxt = data.address +" " +data.apartment + " " +data.country || "";
                        const addressData = {
                            userName:data.firstName + " " + data.lastName,
                            addressTxt:addressTxt,
                            mobNumber:data.mobNumber || "",
                            id:data.id
                        }
                        const isSelected =(selectedAddress.id)?(selectedAddress.id == data.id ):data.isDefaultAddress;
                        return(
                            <AddressInfo showRemoveBtn={listOfAddress.length > 1} data={addressData} key={index} onSelectAddress={()=>onChangeAddress(data)} isSelected={isSelected} onRemoveAddress={()=>onRemoveAddress(data.id)} onEditAddress={()=>onEditAddress()} />
                        )
                    })
                }
            </div>
          </div>
          {listOfAddress && listOfAddress.length > 0 && <SubmitBtn btnName={isArabic ? "حفظ والمتابعة" : 'Save & proceed'} onClick={onSelectAddress} />}
          <Loader isShow={isLoading} />
        </>
       
      )
    }
    
