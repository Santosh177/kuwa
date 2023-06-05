import { AddressProvider } from "@/context/address";
import PageHeader from '@/components/PageHeader/PageHeader';
import ListOfAddress from './ListOfAddress/ListOfAddress';
import { authHeader } from "../../../lib/auth-cookies";
import { redirect } from 'next/navigation';

export default async function SelectAddress() {

  const customHeader = await authHeader();
  console.log("customHeader",customHeader)
  const getAddressResp  =  await fetch(`https://api.kuwa.bevaleo.dev/module/address/`, {
    method: 'GET',
    headers:{
      ...customHeader
    },
    next: { revalidate: 0} 
  })
  const getAddress = await getAddressResp.json();
  console.log("getAddressgetAddressshippingAddress",getAddress['shippingAddress']);
  // if(!(getAddress && getAddress['shippingAddress'] && getAddress['shippingAddress'].length > 0))
  //   return redirect('/address/add-address?referer=/address/manage-address')
  
  
      return (
        <>
            <PageHeader headerName='Manage Address' />
            <ListOfAddress  addressList = {getAddress['shippingAddress'] || []}/>
        </>
       
      )
    }
    