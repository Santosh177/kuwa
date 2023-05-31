import { PaymentPageProvider } from "@/context/payment";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import Payment from "./payment";
import { authHeader } from "../../lib/auth-cookies";
import styles from './pages.module.scss';

export default async function PaymentPage() {
  let getCartItems = [];
  let paymentModes = [];
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
    console.log("getCartItemsgetCartItems",getCartItems)
    
  } catch (error) {
    
  }


  try {
    const customHeader = await authHeader();
    const getPaymentConfigData  =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/payment-config', {
      method: 'GET',
      headers:{
        ...customHeader
      },
      next: { revalidate: 0} 
    })
    const paymentModeData = await getPaymentConfigData.json();
    paymentModes = paymentModeData.find((data, index)=> data.countryId == 186).paymentModes;
  } catch (error) {
    
  }


  
  


 
      return (
        <>

          <PageHeader headerName="Payment"/>
          <PageStepTracker stepCount={3} />
          <PaymentPageProvider cartItemsResp={getCartItems}>
              <Payment cartData={getCartItems} paymentModes={paymentModes}/>
          </PaymentPageProvider>
          
        </>
      )
    }
    