
import PageHeader from "@/components/PageHeader/PageHeader";
import CartPage from './cartPage';
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import {getCartItemDetails} from "@/utils";
import styles from './page.module.scss';

export default async function Cart() {
  
  const getCartItemResp  =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
    method: 'GET',
    headers:{
      "user":9090,
      "country":1
    },
    next: { revalidate: 0} 
  })
  const getCartItems = await getCartItemResp.json();

  
      return (
        <>
          <PageHeader headerName="My Cart" />
          <CartPage cartData={getCartItems}/>
          {/* <PaymentFooterBtn btnName="Proceed to checkout" totalPrice="AED 350" /> */}
        </>
      )
    }
    