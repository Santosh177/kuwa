'use client';
import { useState } from 'react';
import styles from './find-my-order.module.scss';
import OrderItemList from '../../orders/OrderItemList/OrderItemList';
import Loader from '@/components/Loader/Loader';


export default  function FindMyOrder({setShowOrderInfo}) {

    const [ searchOrderId , setSearchOrderId ] = useState("");
    const [orderList,setOrderList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
  

    console.log("searchOrderIdsearchOrderId",searchOrderId)
   const getOrderList=async()=>{
    setIsLoading(true);
    const data = await fetch(`https://api.kuwa.bevaleo.dev/module/find-my-order/${searchOrderId}`)
   const res = await data.json()
    setOrderList(res)
    setIsLoading(false);
    setShowOrderInfo(false);
   }

  return (
    <>
    <div className={styles.findMyOrderWrapper}>
        <div className={styles.orderStatusTxt}>Order Status</div>
        <div className={styles.subTxt}>Enter your <span>'Order ID</span> to check the order status</div>
        <div className={styles.orderIdSearchContainer}>
            <div className={styles.orderIdInputContainer}>
                <input type='text' placeholder='Order ID' className={styles.orderIdInput} value={searchOrderId} onChange={(e)=>setSearchOrderId(e.target.value)} /> 
                {searchOrderId && <img onClick={()=>setSearchOrderId("")} className={styles.crossIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_find_my_order.png' alt='cross_icon'/>}
            </div>
            <div className={styles.findMyorderBtn} onClick={getOrderList}>Find my order</div>
            
        </div>
    </div>
 
    {isLoading ? (
        <Loader isShow={isLoading} /> 
      ) : (
        orderList.map((data, index) => {
          return <OrderItemList data={data} />;
        })
      )}
    </>
  )
}

