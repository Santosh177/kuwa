
'use client';
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { updateCartItem } from '@/services'
import { useCountryList } from '@/context/countryList';
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetailsInfo from "@/components/PriceDetails/PriceDetails";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails } from "@/utils";
import EmptyCart from "./EmptyCart/EmptyCart";
import Loader from "@/components/Loader/Loader";
import { deleteCartItem , getCartItem } from '@/services';
import styles from './cart-page.module.scss';


export default  function Cart(props) {

  console.log("props.card",props.cartData)
    const router = useRouter();
    const countryList = useCountryList();
    const deliveryFeesConfig = countryList.find((data) => data.code == "AE" || data.code == "AF")
    const [ data , setData ] = useState(props.cartData);
    const [ cartItems , setCartItems ] = useState([]);
    const [ priceDetails , setPriceDetails ] = useState({});
    const [ haveAddress, setHaveAddress] = useState(false);
    const [ isLoading , setIsLoading ] = useState(false);
    const [isEmptyCart, setIsEmptyCart] = useState(false)

    useEffect(()=>{
      getAddress()
    },[])


    useEffect(()=>{
        if(data && Object.keys(data).length > 0 ){
                if(data['products']){
                    getData();
                }
                
        }
    },[data]);


    const getData = async() => {
        const getCartItem = await getCartItemDetails(data['products']);
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
        cartItemCount: cartItems && cartItems.length,
        subTotal: subtotal,
        totalAmount: finalAmount,
        savedAmount: total - subtotal,
        discountAmount:total - subtotal,
        currency:currency,
        deliveryFees: (total < minThreshold) ? deliveryFeesConfig.deliveryFee : 0
      }
      setPriceDetails(priceDetailsData)
    }
    
      

    const onUpdateItem = async(data) => {
      console.log("datadata",data)
      setIsLoading(true)
      const cartItem = await updateCartItem(data);
      if(cartItem && cartItem.data){
        console.log("cartItem.datacartItem.data",cartItem.data)
        getCartItem()
      }
    }


    const getAddress = async() => {
      const getAddressResp  =  await fetch('/api/get-address', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const addressData = await getAddressResp.json();
      console.log("Address+++",addressData)
      const haveAddress = addressData && addressData['shippingAddress'] && addressData['shippingAddress'] .length > 0;
      if(haveAddress){
        setHaveAddress(haveAddress);
      }
    }
      


    const onProceed = () => {
      if(haveAddress){
        router.push('/order-summary');
      }else{
        router.push('/address/add-address');
      }
    }

      
     const onDeleteItem = async (data) => {
      setIsLoading(true)
         const deleteData = {
          cartItemId: data.id
         }
      const cartItem = await deleteCartItem(deleteData);
      if(cartItem && cartItem.status == 200) {
        setIsLoading(false);
        getCartItem()
      }
     }

     const getCartItem = async() => {
      const getCartItemDetails = await getCartItem();
      console.log("getCartItemDetails++",getCartItemDetails);
      if(getCartItemDetails && getCartItemDetails.status === 404){
        setIsLoading(false);
       router.refresh();
      }else{
        setData(getCartItemDetails);
        setIsLoading(false);
        setIsEmptyCart(false)
      }
      
     }
        
  

     if(isEmptyCart)
       return <EmptyCart />
      return (
        <>
          <div className={styles.cartPage}>
            <div className={styles.cartItemsContainer}>
              <div className={[styles.headerTxt,styles.cartHeaderTxt].join(" ")}> Cart Items </div>
              {
                cartItems.map((data, index)=>{
                  return(
                    <CartItemCard data={data} key={index} onUpdateItem={onUpdateItem} onDeleteItem={()=>onDeleteItem(data)} />
                  )
                })
              }
            </div>
            <div className={styles.priceDetailsContainer}>
              <div className={styles.headerTxt}>Price Details</div>
              <div className={styles.priceInfo}>
                <PriceDetailsInfo data={priceDetails} />
              </div>
              <CompanyInfo />
            </div>
          </div>
          <PaymentFooterBtn btnName="Proceed to checkout" totalPrice={priceDetails.currency+" "+priceDetails.totalAmount} onProceed={onProceed} />
          <Loader isShow={isLoading}/>
        </>
      )
    }
    