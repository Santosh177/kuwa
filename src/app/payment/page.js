
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import Payment from "./payment";
import { authHeader } from "../../lib/auth-cookies";
import styles from './pages.module.scss';

export default async function PaymentPage() {

  const customHeader = await authHeader();
    const getCartItemResp  =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
      method: 'GET',
      headers:{
        ...customHeader
      },
      next: { revalidate: 0} 
    })
    const getCartItems = await getCartItemResp.json();

    console.log("getCartItemsgetCartItems",getCartItems)

  
      return (
        <>
          <PageHeader headerName="Payment"/>
          <PageStepTracker stepCount={3} />
          <Payment cartData={getCartItems} />
        </>
      )
    }
    