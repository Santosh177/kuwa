
import PageHeader from "@/components/PageHeader/PageHeader";
import {getCartItemDetails} from "@/utils";
import CartPage from './cartPage';
import EmptyCart from "./EmptyCart/EmptyCart";
import { authHeader } from "../../lib/auth-cookies";



export default async function Cart() {
  let getCartItems = []
  try {
    const customHeader = await authHeader();
    console.log("customHeadercustomHeader+++",customHeader)
    const getCartItemResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/cart`, {
      method: 'GET',
      headers:{
        ...customHeader
      },
      cache: 'no-store'
    })
     getCartItems = await getCartItemResp.json();
     if(getCartItems && getCartItems.status == 404){
      getCartItems = []
     }
  } catch (error) {
    getCartItems = []
  }

  console.log("getCartItems,",getCartItems)
  const isNonEmptyCart = getCartItems && Object.keys(getCartItems).length > 0 ;
      return (
        <>
          <PageHeader headerName="My Cart" />
          {isNonEmptyCart?<CartPage cartData={getCartItems}/>:<EmptyCart />}
        </>
      )
    }
    