
import PageHeader from "@/components/PageHeader/PageHeader";
import CartPage from './cartPage';
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import {getCartItemDetails} from "@/utils";
import styles from './page.module.scss';

export default async function Cart() {
  
  const getCartItemResp  =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
    method: 'GET',
    headers:{
      'Content-Type': 'text/plain',
      'X-My-Custom-Header': 'value-v',
      'Authorization': 'Bearer ' + "token",
      "user":"10",
      "country":1
    },
  })
  const getCartItems = await getCartItemResp.json();
  // const cartItems = getCartItems.products || [];
  // const data = await getCartItemDetails(cartItems);


  // console.log("dfff",data)



      


const cartItemsd = [
  {

    "image":"https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
    "qty":1,
    "productName":"Korean Marine Collagen Peptides, 200 Gms",
    "retailPrice":500,
    'finalPrice':100,
    'discountType':"fixed",
    "discountAmount":50,
    "currency":"Dhs"
},
{

  "image":"https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png",
  "qty":1,
  "productName":"Korean Marine Collagen Peptides, 200 Gms",
  "retailPrice":500,
  'finalPrice':100,
  'discountType':"fixed",
  "discountAmount":50,
  "currency":"Dhs"
}
]



const priceDetails = {
  cartItemCount: 2,
  subTotal: 300,
  totalAmount: 300,
  savedAmount: 50,
  discountAmount:40,
  currency:'AED'
}
  
      return (
        <>
          <PageHeader headerName="My Cart" />
          <CartPage cartData={getCartItems}/>
          <PaymentFooterBtn btnName="Proceed to checkout" totalPrice="AED 350" />
        </>
      )
    }
    