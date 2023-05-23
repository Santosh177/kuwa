import { AddressProvider } from "@/context/address";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import OrderSummaryPage from "./OrderSummaryPage/OrderSummaryPage";
import { authHeader } from "../../lib/auth-cookies";

import styles from './pages.module.scss';

export default async function OrderSummary() {

  let getCartItems = []
  try {
    const customHeader = await authHeader();
    const getCartItemResp  =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
      method: 'GET',
      headers:{
        ...customHeader
      },
      next: { revalidate: 0} 
    })
     getCartItems = await getCartItemResp.json();
  } catch (error) {
    getCartItems = []
  }


  console.log("getCartItemsgetCartItems",getCartItems)



  

  
      return (
        <>
            <PageHeader headerName="Order Summary"/>
            <PageStepTracker stepCount={2} />
            <OrderSummaryPage cartData={getCartItems} />
        </>
      )
    }
    