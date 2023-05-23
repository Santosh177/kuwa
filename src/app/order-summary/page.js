import { AddressProvider } from "@/context/address";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import OrderSummaryPage from "./OrderSummaryPage/OrderSummaryPage";
import { authHeader } from "../../lib/auth-cookies";

import styles from './pages.module.scss';

export default async function OrderSummary() {

  



  const customHeader = await authHeader();
  const getAddressResp  =  await fetch(`https://api.kuwa.bevaleo.dev/module/address/${customHeader.user}`, {
    method: 'GET',
    headers:{
      ...customHeader
    },
    next: { revalidate: 0} 
  })
  const getAddress = await getAddressResp.json();
  const billingAddresses = getAddress && getAddress['billingAddresses'] || [];

  
      return (
        <>
            <PageHeader headerName="Order Summary"/>
            <PageStepTracker stepCount={2} />
            <OrderSummaryPage addressData= {billingAddresses} />
        </>
      )
    }
    