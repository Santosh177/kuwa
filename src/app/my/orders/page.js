import PageHeader from '@/components/PageHeader/PageHeader';
import OrderItemList from './OrderItemList/OrderItemList';
import { authHeader } from "../../../lib/auth-cookies";

import EmptyOrder from './EmptyOrders/EmptyOrders';


export default async function MyOrders({}) {

    
  let listOfMyOrdser = [
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/aadarweight1_1684936717918.jpg",
        "orderStatus": null,
        "productName": "AADAR WEIGHT NO MORE | Natural Weight Loss Supplement",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/super-vitaminn-B_1684936837824.jpg",
        "orderStatus": null,
        "productName": "Allergy Research  Super Vitamin B Complex 120Caps",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/aadarpower_1684937409032.jpg",
        "orderStatus": null,
        "productName": "AADAR POWER BUILD - 30 Capsules",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/super-vitaminn-B_1684936837824.jpg",
        "orderStatus": null,
        "productName": "Allergy Research  Super Vitamin B Complex 120Caps",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/ARG176_1684938855042.jpg",
        "orderStatus": null,
        "productName": "Allergy Research  ProGreens 265 g",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/aadarweight1_1684936717918.jpg",
        "orderStatus": null,
        "productName": "AADAR WEIGHT NO MORE | Natural Weight Loss Supplement",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/super-vitaminn-B_1684936837824.jpg",
        "orderStatus": null,
        "productName": "Allergy Research  Super Vitamin B Complex 120Caps",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/aadarpower_1684937409032.jpg",
        "orderStatus": null,
        "productName": "AADAR POWER BUILD - 30 Capsules",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2250,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/aadarweight1_1684936717918.jpg",
        "orderStatus": null,
        "productName": "AADAR WEIGHT NO MORE | Natural Weight Loss Supplement",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/super-vitaminn-B_1684936837824.jpg",
        "orderStatus": null,
        "productName": "Allergy Research  Super Vitamin B Complex 120Caps",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/aadarpower_1684937409032.jpg",
        "orderStatus": null,
        "productName": "AADAR POWER BUILD - 30 Capsules",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/super-vitaminn-B_1684936837824.jpg",
        "orderStatus": null,
        "productName": "Allergy Research  Super Vitamin B Complex 120Caps",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/ARG176_1684938855042.jpg",
        "orderStatus": null,
        "productName": "Allergy Research  ProGreens 265 g",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/aadarweight1_1684936717918.jpg",
        "orderStatus": null,
        "productName": "AADAR WEIGHT NO MORE | Natural Weight Loss Supplement",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/super-vitaminn-B_1684936837824.jpg",
        "orderStatus": null,
        "productName": "Allergy Research  Super Vitamin B Complex 120Caps",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/aadarpower_1684937409032.jpg",
        "orderStatus": null,
        "productName": "AADAR POWER BUILD - 30 Capsules",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    },
    {
        "orderId": 2300,
        "productImage": "https://dcngmd8umaj1u.cloudfront.net/1_1684934586079.jpg",
        "orderStatus": null,
        "productName": "AADAR BALD NO MORE Hair Capsule for Men ",
        "expDelivery": null
    }
]

let listOfMyOrder = []
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
     listOfMyOrder = await listOfMyOrderResp.json();
     console.log("listOfMyOrderlistOfMyOrder",listOfMyOrder)
    
  } catch (error) {
    
  }

  const isNonEmptyOrder = listOfMyOrder.length > 0 ;

  return (
    <>
      
  <PageHeader headerName="My Orders" />

  {isNonEmptyOrder ? (
    listOfMyOrder.map((data, index) => (
      <OrderItemList data={data} key={index} />
    ))
  ) : (
    <EmptyOrder />
  )}


         
    </>

  )
}
