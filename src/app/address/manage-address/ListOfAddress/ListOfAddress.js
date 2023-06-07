'use client';
import { useRouter,usePathname } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import AddressInfo from '../AddressInfo/AddressInfo';
import { useAddressData } from "@/context/address";
import SubmitBtn from '../../component/SubmitBtn/SubmitBtn';
import styles from './list-of-address.module.scss'
import { useEffect, useState } from 'react';

export default function ListOfAddress({allAddress,addressList}) {
  const router = useRouter();
  const pathName = usePathname();
  const { selectedAddress ={},listOfAddress={},setSelectedAddress={} , setListOfAddress={} } = useAddressData();
  const [selectedAdddressId, setSelectedAddressId] = useState(null);
  const [ isLoading , setIsLoading] = useState(false);

  useEffect(()=>{
    if(addressList && addressList.length == 0){
      router.replace('/address/add-address?referer=/address/manage-address')
    }
  },[addressList])

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
    if(filterAddressId && filterAddressId.length > 0){
      setListOfAddress(filterAddressId);
    }else{
      router.replace('/address/add-address?referer=/address/manage-address')
    }
  
  }

  const onChangeAddress = (data) =>{
    setSelectedAddress(data)
    // router.push('/order-summary')
  }


  const onEditAddress = () => {
    
  }


 

  const onSelectDefaultAddress = async(defaultAddress) => {

    const shippingAddress = allAddress['shippingAddress'].find(shippingData => shippingData.id == defaultAddress.id);
    const billingAddress = allAddress['billingAddresses'].find(billingData => billingData.id == shippingAddress.asoBillingAddress );
    let data = {
      shippingAddress:shippingAddress,
      billingAddress: billingAddress
    }

    data['shippingAddress']['isDefaultAddress'] = true;
    data['billingAddress']['isDefaultAddress'] = true;
    
    try {
      // setIsLoading(true)
      const updateAddressResp  =  await fetch(`/api/update-address`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data),
        cache: 'no-store'
      })
      // const updateAddress = await updateAddressResp.json();
      // setIsLoading(false
     
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
  }


  
      return (
        <>
          <div className={styles.addressListWrapper}>
            <div className={styles.addNewAddressTxt} onClick={()=> router.push(`/address/add-address?referer=${pathName}`)}>+ Add new address</div>
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
                            <AddressInfo onSelectDefaultAddress={onSelectDefaultAddress} data={addressData} key={index} onSelectAddress={()=>onChangeAddress(data)} isSelected={isSelected} onRemoveAddress={()=>onRemoveAddress(data.id)} onEditAddress={()=>onEditAddress()} />
                        )
                    })
                }
            </div>
          </div>
          <Loader isShow={isLoading} />
        </>
       
      )
    }
    