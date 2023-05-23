
import PageHeader from "@/components/PageHeader/PageHeader";
import {getCartItemDetails} from "@/utils";
import CartPage from './cartPage';
import { authHeader } from "../../lib/auth-cookies";

export default async function Cart() {
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
          <PageHeader headerName="My Cart" />
          <CartPage cartData={getCartItems}/>
        </>
      )
    }
    