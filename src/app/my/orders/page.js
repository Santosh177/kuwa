import PageHeader from '@/components/PageHeader/PageHeader';
import OrderItemList from './OrderItemList/OrderItemList';
import { authHeader } from "../../../lib/auth-cookies";
import styles from './page.module.scss';

import EmptyOrder from './EmptyOrders/EmptyOrders';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'
export default async function MyOrders({}) {

    const token = cookies().get('token');
    if(token && token.value){
    }else{
        redirect("/sign-up?referer=/my/orders")
    }
let listOfMyOrder = []
let groupedOrders = {};
  try {
    
    const customHeader = await authHeader();
    console.log("customHeadercustomHeader",customHeader)
    const listOfMyOrderResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/list-my-order`, {
      method: 'GET',
      headers:{
        ...customHeader
      },
      cache: 'no-store'
    })
     listOfMyOrder = await listOfMyOrderResp.json()||[];
     console.log("listOfMyOrderlistOfMyOrder",listOfMyOrder)
       groupedOrders = listOfMyOrder && listOfMyOrder.length>0 && listOfMyOrder.reduce((acc, order) => {
          const orderId = order.orderId;

          // Check if the orderId already exists in the accumulator
          if (acc[orderId]) {
              // If it exists, push the current order to the existing array
              acc[orderId].push(order);
          } else {
              // If it doesn't exist, create a new array with the current order
              acc[orderId] = [order];
          }

          return acc;
      }, {});
  } catch (error) {
    
  }

  const isNonEmptyOrder = listOfMyOrder.length > 0 ;
  return (
    <>
      
  <PageHeader headerName="My Orders" />

  {isNonEmptyOrder ? (
              Object.values(groupedOrders) && Object.values(groupedOrders).length > 0 && Object.values(groupedOrders).map((order,index)=>{
       return (
           <div className={styles.orderProducts} 
        //    style={{ borderRadius: "16px", background: "#FFF", boxShadow:"0px 6px 7px 0px rgba(173, 173, 173, 0.16)",margin:"20px auto",width:"90%"}}
           >
                {order && order.length > 0 && order.map((data,index)=>(
                    <OrderItemList data={data} key={index} index={index} />
                ))
                 }
        </div>
       )
    })
    // listOfMyOrder.map((data, index) => (
    //   <OrderItemList data={data} key={index} />
    // ))
  ) : (
    <EmptyOrder />
  )}


         
    </>

  )
}
