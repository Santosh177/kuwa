'use client'
import { useRouter,useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from './pages.module.scss';
import {useState, useEffect } from 'react';
import { useCountry } from '@/context/contryDetails';
import SocialMedia from './social-media/SocialMedia';
import { useAddressData } from "@/context/address";
import DeliveryAddress from './delivery-address/DeliveryAddress';
import PriceDetailsContainer from './price-details-Container/PriceDetailsContainer';
import AccountDetails from './account-details/AccountDetails';
import ProductCard from './product-card/ProductCard';
import SuccessPopUp from './successPopUp/SuccessPopUp';
import moment from 'moment' 
import { useAuth } from '@/context/userDetail';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  console.log("searchParamssearchParams",searchParams.get('orderId'))
  const { selectedCountry = {} } = useCountry();
  const { name = "", id = "", currency="" }=selectedCountry||{}
  const orderId = searchParams.get('orderId')
  const totalPurchaseValue = searchParams.get('totalPurchaseValue')
  const couponDiscount = searchParams.get('couponDiscount');
  const [isSuccessPopUp ,setIsSuccessPopup] = useState(false);
  const [orderDetailsData,setOrderDetailsData] = useState({});
  const [isThankYouPage ,setIsThankYouPage] = useState(false)
  
  const {isLogin=false , userData = {}} = useAuth() || {};


  const {shippingAddress } = orderDetailsData || {};
  const {orderProducts} = orderDetailsData || []

  const {orderCreatedAt=" "} =  orderDetailsData || {};
const orderCreateDate = orderCreatedAt?.split(" ");
console.log("orderCreateDate",orderCreateDate)
  const orderCreate =moment(orderCreateDate[0]).format("MMM DD") + " " +  moment(orderCreateDate[1], "HH:mm:ss.S").format("h:mm A");;

 

    useEffect(()=>{
      deleteAllItem();
      if(window && window.clevertap){
        window.clevertap.setMultiValuesForKey("cart_items", []);
      }
    
    },[])


    useEffect(()=>{
      getListOfOrder();
    },[])

    useEffect(()=>{
      getOrderDetails();
    
    },[])
   
   

    const getOrderDetails = async()=>{
      const orderDetails = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/order-summary/${orderId}`,{
        method:'GET'
      })
      const orderDetailsData = await orderDetails.json();
      console.log("orderDetailsData",orderDetailsData)
      setOrderDetailsData(orderDetailsData);
      
    }

    const getListOfOrder = async() =>{
      const listOfMyOrderResp  =  await fetch(`/api/list-of-orders`, {
        method: 'GET',
      })
      const listOfMyOrder = await listOfMyOrderResp.json();
      if(listOfMyOrder && listOfMyOrder.length > 0){
        const isFirstOrder = listOfMyOrder.length >1;
        if(!isFirstOrder){
          const listOfOrder = listOfMyOrder[0];
          const track = {
            productId: listOfOrder.productId,
            productName: listOfOrder.productName,
            orderId:listOfOrder.orderId,
            orderProductId:listOfOrder.orderProductId
         }
         if(window && window.clevertap){
          window.clevertap.setMultiValuesForKey("cart_items", []);
        }
          window.clevertap.event.push("kuwa_order_confirmed_first_purchase", track);
        }else{
          // const isFirstOrder = listOfMyOrder.length >1;
          // if(!isFirstOrder){
            const listOfOrder = listOfMyOrder[0];
            const track = {
              productId: listOfOrder.productId,
              productName: listOfOrder.productName,
              orderId:listOfOrder.orderId,
              orderProductId:listOfOrder.orderProductId
           }
           if(window && window.clevertap){
            window.clevertap.setMultiValuesForKey("cart_items", []);
          }
            window.clevertap.event.push("kuwa_order_confirmed", track);
        // }
      }
    }
  }

    const deleteAllItem = async() =>{
      const res = await fetch('/api/delete-all-item', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
  
      return (
        <>
         <script type="text/javascript" src="/fresh-chat.js" async></script>
        <div id="thankYouPage">
        <PageHeader backButtonAction={()=>window.location.href = '/'} />
        <div  className={styles.thankYouPage}>
          <div className={styles.leftSection}>
        <div className={styles.paymentSuceesContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/success.png' alt=''/>
          <div className={styles.txt}>Order placed </div>
          {orderId && <div className={styles.orderId}>Order ID : #{orderId}</div>}
          <div className={styles.subTxt}>Thanks for your purchase!
          <br/> Confirmation email with details coming soon.</div>
         
        </div>

       {!isLogin &&  <AccountDetails setIsSuccessPopup={setIsSuccessPopup}/>}
        <div className={styles.productContainer}>
          <div className={styles.productTitle}>Product Details</div>
        {
          orderProducts?.map((data,index)=>{
            return (
              <ProductCard  data={data} currency={currency} key={index} index={index} />
            )
          })
        }
        </div>
        </div>
        
      <div className={styles.rightSection}>
        <div className={styles.deliveryContainer}><DeliveryAddress shippingAddress={shippingAddress} /></div>
        <div className={styles.priceDetailsContainer}><PriceDetailsContainer orderDetailsData={orderDetailsData} /></div>
        <div className={styles.btn} onClick={()=>window.location.href='/'}>Continue Shopping</div>
        <div className={styles.socialMedialContainer}><SocialMedia/></div>
      </div>
        </div>
        </div>
        {isSuccessPopUp &&  <SuccessPopUp/>}
       
       
         
        
        
        </>
        
      )
    }
    