import { PaymentPageProvider } from "@/context/payment";
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



 
      return (
        <>

          <PageHeader headerName="Payment"/>
          <PageStepTracker stepCount={3} />
          <PaymentPageProvider cartItemsResp={getCartItems}>
              <Payment cartData={getCartItems} />
          </PaymentPageProvider>
          
        </>
      )
    }
    