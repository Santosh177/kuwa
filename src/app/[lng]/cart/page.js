
// import PageHeader from "@/app/[lng]/components/PageHeader/PageHeader";
import PageHeader from "../components/PageHeader/PageHeader";
import {getCartItemDetails} from "@/utils";
import CartPage from './cartPage';
import EmptyCart from "./EmptyCart/EmptyCart";
// import { authHeader } from "../../lib/auth-cookies";
// import { authHeader } from "../../../lib/auth-cookies";
import { authHeader } from "../../../lib/auth-cookies"
import { cookies } from "next/headers";


export default async function Cart() {
  const nextCookies  = cookies();
  const language_code = nextCookies.get('language_code')?.value
  let cartItems = [];
  try {
    const customHeader = await authHeader();
    const getCartItemResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/cart`, {
      method: 'GET',
      headers: {
        ...customHeader,
      },
      cache: 'no-store',
    });
    cartItems = await getCartItemResp.json();
    if (cartItems && cartItems.status === 404) {
      cartItems = [];
    }
  } catch (error) {
    cartItems = [];
  }

  const isNonEmptyCart = cartItems && Object.keys(cartItems).length > 0;

  return (
    <>
      <PageHeader headerName={language_code == "ar" ? "سلة التسوق" : "My Cart"} />
      {isNonEmptyCart ? <CartPage cartData={cartItems} /> : <EmptyCart />}
    </>
  );
}
    