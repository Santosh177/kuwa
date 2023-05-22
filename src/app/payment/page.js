
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import Payment from "./payment";
import styles from './pages.module.scss';

export default async function PaymentPage() {

    const getCartItemResp  =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
      method: 'GET',
      headers:{
        "user":10,
        "country":1
      },
      next: { revalidate: 0} 
    })
    const getCartItems = await getCartItemResp.json();

    console.log("getCartItemsgetCartItems",getCartItems)

  
      return (
        <>
          <PageHeader headerName="Payment"/>
          <PageStepTracker />
          <Payment cartData={getCartItems} />
        </>
      )
    }
    