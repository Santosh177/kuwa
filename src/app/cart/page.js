
import PageHeader from "@/components/PageHeader/PageHeader";
import {getCartItemDetails} from "@/utils";
import CartPage from './cartPage';
import EmptyCart from "./EmptyCart/EmptyCart";
import { authHeader } from "../../lib/auth-cookies";

export default async function Cart() {
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


  
      return (
        <>
          <PageHeader headerName="My Cart" />
          {getCartItems && getCartItems.length > 0?<CartPage cartData={getCartItems}/>: <EmptyCart />}
        </>
      )
    }
    