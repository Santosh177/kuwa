'use client'
import { useRouter,useSearchParams } from 'next/navigation';
import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
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
import CodOtpCard from './cod-otp-card/CodOtpCard';

import { useAuth } from '@/context/userDetail';
// import { mixPanelTrackEvent } from '@/app/page';
import { mixPanelTrackEvent } from '../../page';
import { useLanguage } from '@/context/languageDetails';
import Script from 'next/script';
import useCleverTapEvents from '@/hooks/useCleverTapEvents';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  
  const { selectedCountry = {} } = useCountry();
  const { name = "", id = "", currency="" }=selectedCountry||{}
  const orderId = searchParams.get('orderId')
  const totalPurchaseValue = searchParams.get('totalPurchaseValue')
  const couponDiscount = searchParams.get('couponDiscount');
  const paymentType = searchParams.get('paymentMode')
  const isIndividualProduct = searchParams.get('isIndividualProduct');
  const [isSuccessPopUp ,setIsSuccessPopup] = useState(false);
  const [orderDetailsData,setOrderDetailsData] = useState({});
  const [isThankYouPage ,setIsThankYouPage] = useState(false)
  
  const {isLogin=false,userData={} } = useAuth() || {};


  const {shippingAddress } = orderDetailsData || {};
  const {orderProducts} = orderDetailsData || []
  const totalPurchaseAmount = orderDetailsData && orderDetailsData.finalAmount || 0;
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const {mobNumber=""} = shippingAddress || {}
  const clevertapEvent = useCleverTapEvents();
 

    useEffect(()=>{
      if(!isIndividualProduct){
        deleteAllItem();
      }
   
      if(window && window.clevertap){
        window.clevertap.setMultiValuesForKey("cart_items", []);
      }
    
    },[])

    const getOrderDetails = async()=>{
      const orderDetails = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/order-summary/${orderId}`,{
        method:'GET'
      })
      const orderDetailsData = await orderDetails.json();
      setOrderDetailsData(orderDetailsData);
      
    }

    useEffect(()=>{
      getOrderDetails();
    },[])

    useEffect(()=>{
      if(orderDetailsData && Object.keys(orderDetailsData).length>0){
        // getListOfOrder();
        getOrderTrackData();
      }
    },[orderDetailsData])

    const getOrderTrackData = () =>{
      console.log("orderDetailsData",orderDetailsData)
      const {orderProducts = [],isFirstOrder="",orderId,paymentType,finalAmount} = orderDetailsData || {}

      const productNameList =  orderProducts.map((product)=>{
        return product.productName
      })
      const productIdList =  orderProducts.map((product)=>{
        return product.productId
      })
      const variantIdList =  orderProducts.map((product)=>{
        return product.variantId
      })
      const orderProductIdList =  orderProducts.map((product)=>{
        return product.orderProductId
      })
      const track = {
        first_order: isFirstOrder ,
        orderId:orderId,
        paymentMode:paymentType,
        country:selectedCountry.name,
        productIdList: productIdList.join() || null ,
        variantIdList: variantIdList.join() || null,
        productNameList:productNameList.join() || "",
        orderProductIdList:orderProductIdList.join() || null,
       
      }
      try {
        window.dataLayer.push({
          'event': 'kuwa_order_confirmed',
          'pagePath': window.location.pathname,
          'pageTitle': document.title,
          'productId':productIdList.join() || null,
          'productName':productNameList.join() || null,
          'orderId':orderId,
          'orderProductId':orderProductIdList.join(),
          'paymentMode':paymentType,
          'purchaseValue':finalAmount || 0
      });

      } catch (error) {
          console.log("ERROR", error)
      }
      if(window && window.clevertap){
        window.clevertap.setMultiValuesForKey("cart_items", []);
      }
      setTimeout(()=>{
        clevertapEvent.onCleverTapEvent("kuwa_order_confirmed", track);
     
      if(isLogin){
        mixPanelTrackEvent("kuwa_order_confirmed", track,userData.id)
      }
      else{
        mixPanelTrackEvent("kuwa_order_confirmed", track)
      }
    },2000)
    }
   

  //   const getListOfOrder = async() =>{
      
      
  //     const listOfMyOrderResp  =  await fetch(`/api/list-of-orders`, {
  //       method: 'GET',
  //     })
  //     const listOfMyOrder = await listOfMyOrderResp.json();
    
  //     console.log("productNameList",productNameList.join())
  //   if(listOfMyOrder && listOfMyOrder.length > 0){
  //     // const isFirstOrder = listOfMyOrder.length == 1;
  //     const listOfOrder = listOfMyOrder[0];
  //     const track = {
  //       first_order: isFirstOrder ,
  //       orderId:orderId,
  //       paymentMode:paymentType,
  //       country:selectedCountry.name,
  //       productId: productIdList.join() || null ,
  //       variantId: variantIdList.join() || null,
  //       productName:productNameList.join() || "",
  //       orderProductId:orderProductIdList.join() || null,
       
  //     }
  //     try {
  //       window.dataLayer.push({
  //         'event': 'kuwa_order_confirmed',
  //         'pagePath': window.location.pathname,
  //         'pageTitle': document.title,
  //         'productId':listOfOrder.productId,
  //         'productName':listOfOrder.orderProductName,
  //         'orderId':listOfOrder.orderId,
  //         'orderProductId':listOfOrder.orderProductId,
  //         'paymentMode':paymentType,
  //         'purchaseValue':totalPurchaseAmount?totalPurchaseAmount:0

  //         // Add more data as needed
  //     });

  //     } catch (error) {
  //         console.log("ERROR", error)
  //     }
  //     if(window && window.clevertap){
  //       window.clevertap.setMultiValuesForKey("cart_items", []);
  //     }
  //     setTimeout(()=>{
  //       window.clevertap?.event?.push("kuwa_order_confirmed", track);
  //     },2000)
  //     if(isLogin){
  //       mixPanelTrackEvent("kuwa_order_confirmed", track,userData.id)
  //     }
  //     else{
  //       mixPanelTrackEvent("kuwa_order_confirmed", track)
  //     }
  //   }
  // }

    const deleteAllItem = async() =>{
      const res = await fetch('/api/delete-all-item', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
  
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(deliveryDate.getDate() + 4);
  
    const day = deliveryDate.getDate();
    const monthIndex = deliveryDate.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[monthIndex];
    const deliveryDateString = `${month} ${day}`;
      return (
        <>
          <head>
        <Script
          id="google-ads-conversion"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {
                'send_to': 'AW-10835495332/9uzKCNbz5Y4DEKST4q4o',
                'value': ${totalPurchaseAmount},
                'currency': ${selectedCountry.currency},
                'transaction_id': ${orderId}
              });
            `,
          }}
        />
          </head>
         <script type="text/javascript" src="/fresh-chat.js" async></script>
       
        <div id="thankYouPage">
        <PageHeader backButtonAction={()=>window.location.href = '/'} />
        <div  className={styles.thankYouPage}>
          <div className={styles.leftSection}>
        <div className={styles.paymentSuceesContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/success.png' alt=''/>
          <div className={styles.txt}>{isArabic ? "تم تأكيد الطلب" : "Order placed"} </div>
          <div className={styles.deliveryDate}>{isArabic ? "التوصيل المتوقع بحلول" : "Expect delivery by "}<span> {deliveryDateString}</span></div>
          {orderId && <div className={styles.orderId}>{isArabic ? "رقم الطلب" : "Order ID"} : #{orderId}</div>}
          <div className={styles.subTxt}>{isArabic ? "شكرًا لشرائك" : "Thanks for your purchase "}!
          <br/> {isArabic ? "سيتم إرسال بريد إلكتروني للتأكيد مع التفاصيل قريبًا" : "Confirmation email with details coming soon"}.</div>
         
        </div>

       {!isLogin && paymentType!= "COD" && <AccountDetails setIsSuccessPopup={setIsSuccessPopup}/>}
       <div className={styles.otpSection}>
      {paymentType=="COD" && <CodOtpCard orderId={orderId} setIsSuccessPopup={setIsSuccessPopup} mobileNumber={mobNumber}/>}
      </div>
        <div className={styles.productContainer}>
          <div className={styles.productTitle}>{isArabic ? "تفاصيل المنتج" : "Product Details"}</div>
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
        <div className={`${styles.btn} ${isArabic ? styles['btn-ar'] : styles['btn-en']}` } onClick={()=>window.location.href='/'}>{isArabic ? "استمر في التسوق" : "Continue Shopping"}</div>
        <div className={styles.socialMedialContainer}><SocialMedia/></div>
      </div>
        </div>
        </div>
        {isSuccessPopUp &&  <SuccessPopUp/>}
       
       
         
        
        
        </>
        
      )
    }
    
