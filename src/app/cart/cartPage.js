
'use client';
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { useCountryList } from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import { useCartItems } from '@/context/cartItems';
import CartItemCard from "@/components/CartItemCard/CartItemCard"
import PriceDetailsInfo from "@/components/PriceDetails/PriceDetails";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import PaymentFooterBtn from "@/components/PaymentFooterBtn/PaymentFooterBtn";
import { getCartItemDetails } from "@/utils";
import Loader from "@/components/Loader/Loader";
import { deleteCartItem , updateCartItem } from '@/services';
import styles from './cart-page.module.scss';
export default  function Cart({cartData}) {
    const router = useRouter();
    const countryList = useCountryList();
    const {setCartItemCount={} } = useCartItems();
    const { selectedCountry={} } = useCountry();
    const deliveryFeesConfig = selectedCountry;
    const [ data , setData ] = useState(cartData);
    const [ cartItems , setCartItems ] = useState([]);
    const [ priceDetails , setPriceDetails ] = useState({});
    const [ haveAddress, setHaveAddress] = useState(false);
    const [ isLoading , setIsLoading ] = useState(false);
    const countryName = selectedCountry && selectedCountry.name || ""

    useEffect(()=>{
      setData(cartData);

      if(cartData && cartData.quantity){
        setCartItemCount(cartData.quantity)
      }
      
    },[cartData])


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

    useEffect(() => {
      if ( cartData && cartData.products && cartData.products.length > 0) {
          let trackData = []
          cartData.products.map((item) => {
              const productId = item && item.id || "";
              const productName = item && item.description && item.description.name || "";
              const qty = item && item.quantity || 1;
              let variantId = null;
              let track = {
                  productId: productId,
                  productName: productName,
                  quantity: qty,
              }
              if(item && item.variants && item.variants.variants){
                 variantId = item.variants.variants.id;
              }
              if(variantId){
                track['variantId'] = variantId;
              }
              trackData.push(track)
          })
          try {
              if (clevertap) {
                  window.clevertap.setMultiValuesForKey("cart_items", trackData);
              }
          } catch (error) {
              console.log(error, "not work for older user")
          }
      }
  }, [cartData,(typeof window !== "undefined") && window.clevertap]);


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
    
      

    const onUpdateItem = async(data) => {
      setIsLoading(true)
      const cartItem = await updateCartItem(data);
      refreshData()
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
      
  let trackData = []
  function trcakcData() {
    if (cartData && cartData.products && cartData.products.length > 0) {
      cartData.products.map((item) => {
        const productId = item && item.id || "";
        const productName = item && item.description && item.description.name || "";
        const qty = item && item.quantity || 1;
        let variantId = null;
        let track = {
          productId: productId,
          productName: productName,
          quantity: qty,
        }
        if (item && item.variants && item.variants.variants) {
          variantId = item.variants.variants.id;
        }
        if (variantId) {
          track['variantId'] = variantId;
        }
        trackData.push(track)
      })
      try {
        if (clevertap) {
          window.clevertap.setMultiValuesForKey("kuwa_add_to_cart_checkout", trackData);
        }
      } catch (error) {
        console.log(error, "not work for older user")
      }
    }
  }

    const onProceed = () => {
      if(haveAddress){
        router.push('/order-summary');
      }else{
        router.push('/address/add-address');
      }
      trcakcData();
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
     const refreshData = () => {
      router.refresh()
      setTimeout(()=>{
        setIsLoading(false);
      },500)
    }
     
  

    const totalPrice =(priceDetails && priceDetails.totalAmount)? priceDetails.currency +" "+priceDetails.totalAmount :""
 
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
              {/* <div className={styles.headerTxt}>Price Details</div> */}
              <div className={styles.priceInfo}>
                <PriceDetailsInfo data={priceDetails} />
              </div>
              <CompanyInfo />
            </div>
          </div>
          <PaymentFooterBtn btnName="Proceed To Checkout" totalPrice={totalPrice} onProceed={onProceed} />
          <Loader isShow={isLoading}/>
        </>
      )
    }
    