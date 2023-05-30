import { AddressProvider } from "@/context/address";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import OrderSummaryPage from "./OrderSummaryPage/OrderSummaryPage";
import EmptyCart from "../cart/EmptyCart/EmptyCart";
import { authHeader } from "../../lib/auth-cookies";

import styles from './pages.module.scss';

export default async function OrderSummary() {
  let getCartItems = []
  try {
    const customHeader = await authHeader();
    console.log("CART Cuuuuh",customHeader)
    const getCartItemResp  =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
      method: 'GET',
      headers:{
        ...customHeader
      },
      next: { revalidate: 0} 
    })
     getCartItems = await getCartItemResp.json();
     if(getCartItems && getCartItems.status == 404){
      getCartItems = []
     }
  } catch (error) {
    getCartItems = []
  }

  console.log("getCartItemsgetCartItems",getCartItems)

  const isNonEmptyCart = getCartItems && Object.keys(getCartItems).length > 0 ;

  

    if(!isNonEmptyCart)
      return <EmptyCart />
  
      return (
        <>
            <PageHeader headerName="Order Summary"/>
            <PageStepTracker stepCount={2} />
            <OrderSummaryPage cartData={getCartItems} />
        </>
      )
    }
    