import { AddressProvider } from "@/context/address";
import PageHeader from '@/components/PageHeader/PageHeader';
import ListOfAddress from '../component/ListOfAddress/ListOfAddress';
import AddAddress from '../add-address/page';
import { authHeader } from "../../../lib/auth-cookies";

export default async function SelectAddress() {

  const customHeader = await authHeader();
  console.log("customHeader",customHeader)
  const getAddressResp  =  await fetch(`https://api.kuwa.bevaleo.dev/module/address/`, {
    method: 'GET',
    headers:{
      ...customHeader
    },
    cache: 'no-store'
  })
  const getAddress = await getAddressResp.json();

  console.log("getAddressgetAddress",getAddress)
      return (
        <>
            <PageHeader headerName='Select Address' />
            <ListOfAddress  addressList = {getAddress['shippingAddress'] || []}/>
        </>
       
      )
    }
    