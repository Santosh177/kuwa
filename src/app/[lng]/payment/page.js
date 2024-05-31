import { PaymentPageProvider } from "@/context/payment";
import PageHeader from "@/app/[lng]/components/PageHeader/PageHeader";
import PageStepTracker from "@/app/[lng]/components/PageStepTracker/PageStepTracker";
import Payment from "./payment";
import EmptyCart from "../cart/EmptyCart/EmptyCart";
// import { authHeader } from "../../lib/auth-cookies";
import { authHeader } from "../../../lib/auth-cookies"
import { redirect } from 'next/navigation';
import styles from './pages.module.scss';
import { cookies } from "next/headers";

export default async function PaymentPage() {
  let getCartItems = [];
  let paymentModes = [];
  let tamaraConfig = [];
  const nextCookies = cookies();
  const language_code = nextCookies.get('language_code')?.value 
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
     console.log("paymentGetcartItem",getCartItems)
    
  } catch (error) {
    
  }

  const isNonEmptyCart = getCartItems && Object.keys(getCartItems).length > 0;


  console.log("getCartItemsgetCartItems++++",getCartItems)

    // if((getCartItems && getCartItems.length == 0 ) || (getCartItems.status == 404)){
    //   redirect(`/`);
    // }
  

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


  if (!isNonEmptyCart)
    return <EmptyCart />
 
      return (
        <>

          <PageHeader headerName={language_code == "ar" ? "الدفع" : "Payment"}/>
          <PageStepTracker stepCount={2} />
          <PaymentPageProvider cartItemsResp={getCartItems}>
          <Payment cartData={getCartItems} paymentModes={paymentModes} tamaraConfig={tamaraConfig}/>
          </PaymentPageProvider>
          
        </>
      )
    }
    