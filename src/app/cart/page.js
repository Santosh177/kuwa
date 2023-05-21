'use client';

import PageHeader from "@/components/PageHeader/PageHeader";
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import styles from './page.module.scss';

export default function Cart() {
const cartItems = [
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
          <div className={styles.cartPage}>
            <div className={styles.cartItemsContainer}>
              <div className={[styles.headerTxt,styles.cartHeaderTxt].join(" ")}> Cart Items </div>
              {
                cartItems.map((data, index)=>{
                  return(
                    <CartItemCard data={data} />
                  )
                })
              }
            </div>
            <div className={styles.priceDetailsContainer}>
              <div className={styles.headerTxt}>Price Details</div>
              <div className={styles.priceInfo}>
                <PriceDetails data={priceDetails} />
              </div>
              <CompanyInfo />
            </div>
          </div>
          <PaymentFooterBtn btnName="Proceed to checkout" totalPrice="AED 350" />
        </>
      )
    }
    