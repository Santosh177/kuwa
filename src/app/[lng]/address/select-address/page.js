import { AddressProvider } from "@/context/address";
import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import ListOfAddress from '../component/ListOfAddress/ListOfAddress';
import AddAddress from '../add-address/page';
import { authHeader } from "../../../../lib/auth-cookies";
import { cookies } from "next/headers";

export default async function SelectAddress() {


  const nextCookies = cookies();
  const language_code = nextCookies.get('language_code')?.value
  const customHeader = await authHeader();
  console.log("customHeader",customHeader)
  const getAddressResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/address/`, {
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
            <PageHeader headerName={language_code == "ar" ? "اختر العنوان" : 'Select Address'} />
            <ListOfAddress  addressList = {getAddress['shippingAddress'] || []}/>
        </>
       
      )
    }
    