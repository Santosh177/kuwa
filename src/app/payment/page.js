import { PaymentPageProvider } from "@/context/payment";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import Payment from "./payment";
import { authHeader } from "../../lib/auth-cookies";
import { redirect } from 'next/navigation';
import styles from './pages.module.scss';

export default async function PaymentPage() {
  let getCartItems = [];
  let paymentModes = [];
  let tamaraConfig = [];
  try {
    
    const customHeader = await authHeader();
    const getCartItemResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/cart`, {
      method: 'GET',
      headers:{
        ...customHeader
      },
      cache: 'no-store'
    })
     getCartItems = await getCartItemResp.json();
    
  } catch (error) {
    
  }


  console.log("getCartItemsgetCartItems++++",getCartItems)

    if((getCartItems && getCartItems.length == 0 ) || (getCartItems.status == 404)){
      redirect(`/`);
    }
  

  try {
    const customHeader = await authHeader();
    const getPaymentConfigData  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/payment-config`, {
      method: 'GET',
      headers:{
        ...customHeader
      },
      cache: 'no-store'
    })
    const paymentModeData = await getPaymentConfigData.json();
    paymentModes = paymentModeData.find((data, index)=> data.countryId == customHeader.country).paymentModes;
    console.log("paymentModes",paymentModes)
  } catch (error) {
    
  }


  try {
    const customHeader = await authHeader();
    const countryCode = 'BH';
    console.log("padasd")
    const getTamaraPaymentResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/tamara/payment-types?countryCode=${countryCode}`, {
      method: 'GET',
      cache: 'no-store' 
    })
    console.log("getTamaraPaymentRespgetTamaraPaymentResp",getTamaraPaymentResp)
    const getTamaraPaymentConfigData = await getTamaraPaymentResp.json();
    console.log("getTamaraPaymentConfigData",getTamaraPaymentConfigData);
    tamaraConfig = getTamaraPaymentConfigData || [];
  } catch (error) {

  }

  
  

  // console.log("getCartItemsgetCartItems++++",getCartItems)

  //   if((getCartItems && getCartItems.length == 0 ) || (getCartItems.status == 404)){
  //     redirect(`/`);
  //   }

 
      return (
        <>

          <PageHeader headerName="Payment"/>
          <PageStepTracker stepCount={3} />
          <PaymentPageProvider cartItemsResp={getCartItems}>
              <Payment cartData={getCartItems} paymentModes={paymentModes} tamaraConfig={tamaraConfig}/>
          </PaymentPageProvider>
          
        </>
      )
    }
    