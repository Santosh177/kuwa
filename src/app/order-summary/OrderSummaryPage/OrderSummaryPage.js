'use client';
import { useRouter } from 'next/navigation';
import { useCountryList } from '@/context/countryList';
import { useCartItems } from '@/context/cartItems';
import DeliveryAddress from "../DeliveryAddress/DeliveryAddress";
import CartItemCard from "@/components/CartItemCard/CartItemCard";
import PriceDetails from "@/components/PriceDetails/PriceDetails";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { useAddressData } from "@/context/address";
import styles from './order-summary-page.module.scss';
import {getCartItemDetails} from "@/utils";
import Loader from '@/components/Loader/Loader';
import { useEffect, useState } from "react";
import { updateCartItem ,deleteCartItem} from '@/services';


export default function OrderSummaryPage({cartData}) {
  console.log("ORDER SSUMMARY OAF",cartData)
  const router = useRouter();
  const countryList = useCountryList();
  const {setCartItemCount={} } = useCartItems();
  const deliveryFeesConfig = countryList.find((data) => data.code == "AE" || data.code == "AF")
  const { listOfAddress=[], selectedAddress ={},setSelectedAddress={},setListOfAddress={}} = useAddressData();
  const [ data , setData ] = useState(cartData);
  const [ cartItems , setCartItems ] = useState([]);
  const [ priceDetails , setPriceDetails ] = useState({});
  const [isLoading, setIsLoading] = useState(false)  


  useEffect(()=>{
    setData(cartData);
    if(cartData && cartData.quantity){
      setCartItemCount(cartData.quantity)
    }
  },[cartData])

  useEffect(()=>{
    if(selectedAddress && Object.keys(selectedAddress).length == 0){
          const defaultAddress = listOfAddress.find((data) => data.isDefault);
          if(defaultAddress){
            setSelectedAddress(defaultAddress)
          }else{
            setSelectedAddress(listOfAddress[0])
          }
    }
  },[listOfAddress])



  useEffect(()=>{
    if(data && Object.keys(data).length > 0 ){
            if(data['products']){
                getData();
            }
            
    }
},[data]);


const getData = async() => {
    const getCartItem = await getCartItemDetails(data['products'],data.currency);
    setCartItems(getCartItem)
}

useEffect(()=>{
  if(cartItems && cartItems.length > 0){
    calculatePriceDetails()

  }

},[cartItems]);

const calculatePriceDetails = () => {
  const { total=0, subtotal=0, currency = "" } = data || {};
  const minThreshold = deliveryFeesConfig.minThreshold || 0;
  let  finalAmount = total;
  if(total < minThreshold){
    finalAmount = total + deliveryFeesConfig.deliveryFee
  }
   
  const priceDetailsData = {
    cartItemCount: cartData && cartData.quantity,
    subTotal: subtotal,
    totalAmount: finalAmount,
    savedAmount: total - subtotal,
    discountAmount:total - subtotal,
    currency:currency,
    deliveryFees: (total < minThreshold) ? deliveryFeesConfig.deliveryFee : 0
  }
  setPriceDetails(priceDetailsData)
}

const refreshData = () => {
  router.refresh()
  setTimeout(()=>{
    setIsLoading(false);
  },500)
}

 
const onUpdateItem = async(data) => {
  setIsLoading(true)
  const cartItem = await updateCartItem(data);
  refreshData()
}

const onDeleteItem = async (data) => {
  setIsLoading(true)
     const deleteData = {
      cartItemId: data.id
     }
  const cartItem = await deleteCartItem(deleteData);
  if(cartItem && cartItem.status == 200) {
    refreshData()
  }
 }

 
const onProceed = () => {
    router.push('/payment');
 
}
  
      return (
        <>
          <div className={styles.orderSummary}>
            <div className={styles.addressAndProductDetails}> 
              <div className={[styles.headerTxt,styles.addressTxt].join(" ")}>Address & product details</div>
              <DeliveryAddress />

              {
                cartItems.map((data,index)=>{
                  return(
                    <CartItemCard data={data} key={index} onUpdateItem={onUpdateItem} onDeleteItem={()=>onDeleteItem(data)}/>
                  )
                })
              }
              
            </div>
            <div className={styles.priceDetails}>
              {/* <div className={styles.headerTxt}>Price Details</div> */}
              <div className={styles.priceDetailsContainer}>
                <PriceDetails data={priceDetails} />
              </div>
            </div>
          </div>
          <PaymentFooterBtn btnName="Proceed to next"  totalPrice={priceDetails.currency+" "+priceDetails.totalAmount} onProceed={onProceed} />
          <Loader isShow={isLoading}/>
        </>
      )
    }
    