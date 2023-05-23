
'use client';
import React, { useEffect, useState ,useContext} from "react"
import { useRouter } from 'next/navigation';
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetailsInfo from "@/components/PriceDetails/PriceDetails";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails } from "@/utils";
import { useAuth } from '../../context/userDetail';
import styles from './cart-page.module.scss';


export default  function Cart(props) {
    const router = useRouter();
    const [ data , setData ] = useState(props.cartData);
    const [ cartItems , setCartItems ] = useState([]);
    const [ priceDetails , setPriceDetails ] = useState({});
    const [ haveAddress, setHaveAddress] = useState(false);

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
        getPriceDetails()

      }

    },[cartItems]);

    const getPriceDetails = () => {
      const { total=0, subtotal=0, currency = "Dhs" } = data || {};
      const priceDetails2 = {
        cartItemCount: cartItems && cartItems.length,
        subTotal: subtotal,
        totalAmount: total,
        savedAmount: total - subtotal,
        discountAmount:total - subtotal,
        currency:currency
      }
      setPriceDetails(priceDetails2)
    }
    
      

    const onUpdateItem = async(data) => {
      console.log("datadata",data)
      const updateItemResp  =  await fetch('/api/update-cart-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + "didToken",
          },
          body:JSON.stringify(data)
      })
      const cartItem = await updateItemResp.json();
      if(cartItem && cartItem.data){
        console.log("cartItem.datacartItem.data",cartItem.data)
        setData(cartItem.data)
      }

        // console.log("updateItemResp",datas);
        

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
      const haveAddress = addressData && addressData['billingAddresses'] && addressData['billingAddresses'] .length > 0;
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

      
     
        
  
      return (
        <>
          <div className={styles.cartPage}>
            <div className={styles.cartItemsContainer}>
              <div className={[styles.headerTxt,styles.cartHeaderTxt].join(" ")}> Cart Items </div>
              {
                cartItems.map((data, index)=>{
                  return(
                    <CartItemCard data={data} key={index} onUpdateItem={onUpdateItem} />
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
          <PaymentFooterBtn btnName="Proceed to checkout" totalPrice={priceDetails.totalAmount} onProceed={onProceed} />
        </>
      )
    }
    