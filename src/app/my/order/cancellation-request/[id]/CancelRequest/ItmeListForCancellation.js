'use client'
import React, { useEffect, useState } from 'react'
import OrderItemList from './OrderItemList';
// import OrderItemList from './OrderItemList';
import styles from './order-item-list.module.scss';

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
            "childOrderId": 13660,
            "productId": 13660,
            "image": "https://dcngmd8umaj1u.cloudfront.net/Products_Picture_902_451_1688738409185.PNG",
            "name": "Arthred Collagen Formula",
            "quantity": 1,
            "price": 710,
            "specialPrice": 710,
            "status": "CANCELED"
        },
        {
            "childOrderId": 13661,
            "productId": 13661,
            "image": "https://dcngmd8umaj1u.cloudfront.net/Products_Picture_902_451_1688738409185.PNG",
            "name": "Arthred Collagen Formula",
            "quantity": 1,
            "price": 710,
            "specialPrice": 710,
            "status": "CANCELED"
        },
        {
            "childOrderId": 13662,
            "productId": 13662,
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

const ItmeListForCancellation = ({ setIsSelectAll, setPayloadData, payloadData=[] })=> {
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
    const handleSelectAll=(event)=>{
        alert(event.target.checked)
      if(event.target.checked){
        setIsSelectAll(true);
      }
      else{
          setIsSelectAll(false)
      }
    }
    console.log("listorder", listOfMyOrder)
    return (
        <div>
            <div className={styles.selectItemTextHeader}>
                <div className={styles.selectItemCancel} >Select Item to cancel</div>
                <div className={styles.selectAll}>
                    <input type="checkbox" className={styles.checkboxAll} style={{color:"red",backgroundColor:"yellow"}} onChange={handleSelectAll} />
                    <span>Select all</span>
                </div>
            </div>
            {listOfMyOrder.orderProducts && listOfMyOrder.orderProducts.length > 0 && listOfMyOrder.orderProducts.map((data, index) =>{
                return  (
                    <OrderItemList data={data} key={index} setPayloadData={setPayloadData} payloadData={payloadData||[]} />
            )
                }
            )
            }
        </div>
    )
}
export default ItmeListForCancellation;