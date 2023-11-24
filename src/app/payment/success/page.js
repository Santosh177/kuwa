'use client'
import { useRouter,useSearchParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from './pages.module.scss';
import { useEffect } from 'react';
import { useCountry } from '@/context/contryDetails';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  console.log("searchParamssearchParams",searchParams.get('orderId'))
  const { selectedCountry = {} } = useCountry();
  const { name = "", id = "", currency="" }=selectedCountry||{}
  const orderId = searchParams.get('orderId')
  const totalPurchaseValue = searchParams.get('totalPurchaseValue')
  const couponDiscount = searchParams.get('couponDiscount')

    useEffect(()=>{
      deleteAllItem();
      if(window && window.clevertap){
        window.clevertap.setMultiValuesForKey("cart_items", []);
      }
      
    },[])


    useEffect(()=>{
      getListOfOrder();
    },[])

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
            const listOfOrder = listOfMyOrder[listOfMyOrder.length - 1];
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
        <PageHeader backButtonAction={()=>window.location.href = '/'} />
        <div className={styles.paymentSuceesContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/success.png' alt=''/>
          <div className={styles.txt}>Order placed</div>
          {orderId && <div className={styles.orderId}>Order ID : #{orderId}</div>}
          {totalPurchaseValue && <div className={styles.totalPurchaseValue}>Total Purchase Value :{totalPurchaseValue} {currency} </div>}
          {/* {couponDiscount && <div className={styles.couponDiscount}>Coupon Discount:{couponDiscount}</div>} */}
          <div className={styles.subTxt}>Thanks for your purchase! Confirmation email with details coming soon. Contact us if you have any questions.</div>
          <div className={styles.btn} onClick={()=>window.location.href='/'}>Continue Shopping</div>
        </div>
        </>
      )
    }
    