'use client'
import React, { useEffect, useState } from 'react'
import OrderItemList from './OrderItemList';
// import OrderItemList from './OrderItemList';
const itemList={
    "orderProducts": [
        {
            "childOrderId": 13659,
            "productId": 13659,
            "image": "https://dcngmd8umaj1u.cloudfront.net/Products_Picture_902_451_1688738409185.PNG",
            "name": "Arthred Collagen Formula",
            "quantity": 1,
            "price": 710,
            "specialPrice": 710,
            "status": "CANCELED"
        },
        {
            "childOrderId": 13659,
            "productId": 13659,
            "image": "https://dcngmd8umaj1u.cloudfront.net/Products_Picture_902_451_1688738409185.PNG",
            "name": "Arthred Collagen Formula",
            "quantity": 1,
            "price": 710,
            "specialPrice": 710,
            "status": "CANCELED"
        },
        {
            "childOrderId": 13659,
            "productId": 13659,
            "image": "https://dcngmd8umaj1u.cloudfront.net/Products_Picture_902_451_1688738409185.PNG",
            "name": "Arthred Collagen Formula",
            "quantity": 1,
            "price": 710,
            "specialPrice": 710,
            "status": "CANCELED"
        },
        {
            "childOrderId": 13659,
            "productId": 13659,
            "image": "https://dcngmd8umaj1u.cloudfront.net/Products_Picture_902_451_1688738409185.PNG",
            "name": "Arthred Collagen Formula",
            "quantity": 1,
            "price": 710,
            "specialPrice": 710,
            "status": "CANCELED"
        }
    ],
        "price": 710,
        "discount": 0,
        "deliveryFee": 0,
        "total": 710,
        "currency": "BHD",
        "address": {
        "billingAddress": {
            "id": 45556,
                "firstName": "abhi",
                    "lastName": "kr",
                        "email": "abhi@amail.com",
                            "mobNumber": "+9731234567890",
                                "company": null,
                                    "apartment": "madivaal",
                                        "address": "madivala",
                                            "city": null,
                                                "stateProvince": null,
                                                    "country": "Bahrain",
                                                        "shippingAddress": true,
                                                            "isDefaultAddress": true,
                                                                "customerId": 7442617500303,
                                                                    "createdAt": null,
                                                                        "modifiedAt": null,
                                                                            "isActive": true,
                                                                                "deviceId": null,
                                                                                    "zone": null
        },
        "shippingAddress": {
            "id": 45559,
                "firstName": "abhi",
                    "lastName": "kr",
                        "email": "abhi@amail.com",
                            "mobNumber": "+9731234567890",
                                "orderUpdate": null,
                                    "sameAddressForBilling": true,
                                        "company": null,
                                            "apartment": "madivaal",
                                                "address": "madivala",
                                                    "city": null,
                                                        "stateProvince": null,
                                                            "country": "Bahrain",
                                                                "billingAddress": true,
                                                                    "isDefaultAddress": true,
                                                                        "customerId": 7442617500303,
                                                                            "createdAt": null,
                                                                                "modifiedAt": null,
                                                                                    "zone": null,
                                                                                        "isActive": true,
                                                                                            "deviceId": null,
                                                                                                "asoBillingAddress": 45556
        }
    },
    "parentOrderId": 5443151103014
}

const ItmeListForCancellation=()=> {
    const [listOfMyOrder, setListOfMyOrder] = useState({});
    // useEffect(() => {
    //    const fetchData=async ()=>{
    //     //    try {
               
    //     //        const customHeader = await authHeader();
    //     //        const orderDetailsResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/detail-order/${13658}`, {
    //     //            method: 'GET',
    //     //            headers: {
    //     //                ...customHeader
    //     //            },
    //     //            cache: 'no-store'
    //     //        })
    //     //        const orderDetailData = await orderDetailsResp.json();
    //     //        setListOfMyOrder([ ...orderDetailData])
    //     //        // orderDetails = orderDetailData;
    //     //        console.log("orderDetailsResporderDetailsResporderDetailsResp", orderDetailData)
   
    //     //    } catch (error) {
   
    //     //    }
    //        setListOfMyOrder({});
    //    }
    //     fetchData()
    // }, [])
    useEffect(()=>{
        setListOfMyOrder({ ...itemList }) 

    },[])
    console.log("listorder", listOfMyOrder)
    return (
        <div>
            {listOfMyOrder.orderProducts && listOfMyOrder.orderProducts.length > 0 && listOfMyOrder.orderProducts.map((data, index) =>{
                return  (
                    <OrderItemList data={data} key={index} />
            )
                }
            )
            }
        </div>
    )
}
export default ItmeListForCancellation;