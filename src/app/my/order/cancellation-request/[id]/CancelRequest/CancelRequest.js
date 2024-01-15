'use client'
import { useEffect, useState } from 'react';
import styles from './cancel-request.module.scss';
import { useRouter, useParams,useSearchParams } from 'next/navigation';
import ItmeListForCancellation from './ItmeListForCancellation';
const itemList = {
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

const CheckBox = ({ isChecked=false }) => {
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={isChecked} />
        <span className={styles.checkmark}></span>
      </div>
    );
  };
const ReasonCard = ({data,onSelect,cancelReason}) => {

   const isSelected = data.reason == cancelReason;
    return(
        <div className={styles.reasonCard} onClick={()=>onSelect(data)} style={(isSelected)?{backgroundColor:'#F1FAF8'}:{}}>
            <CheckBox isChecked={isSelected}/>
            <div className={styles.reasonTxt}>{data.reason}</div>
        </div>
    )
}


export default  function CancelRequest({cancelReasonData=[]}) {
  const [ cancelReason , setCancelReason ] = useState("");
  const [payloadData, setPayloadData] = useState([]);
  const [isSelectAll,setIsSelectAll]=useState(false);
  const params = useParams();
  const router = useRouter();

useEffect(()=>{
  if(isSelectAll){
    let dummyPayload=[]
    itemList && itemList.length > 0 && itemList.map((data)=>{
      dummyPayload.push({
        status: 'CANCELED',
        cancelReason: '',
        product: data.productId //this is orderProductId

      })
    })
  }
},[isSelectAll])
  
  const onCancelRequest = async() => {
    if(cancelReason){
      let data ={
        productId: params.id,
        cancelReason:cancelReason
      }
      const updateCartItemResp = await fetch('/api/order-cancellation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
    // const updateCartItemData = await updateCartItemResp.json();
    router.replace('/my/order/cancellation-confirmed')
    // return updateCartItemData;
    }
  }
const handleItemList=(item)=>{
 
}

  console.log("payloadData", payloadData)
  return (
    <>
      <ItmeListForCancellation setIsSelectAll={setIsSelectAll} setPayloadData={setPayloadData} payloadData={payloadData||[]} />
    <div className={styles.cancelRequest}>
        <div className={styles.headerTxt}>Reason for cancellation</div>
        <div className={styles.cancelReasonItemList}>
          {
            cancelReasonData.map((data,index)=>{
              return(
                <ReasonCard  data={data} onSelect={(data)=>setCancelReason(data.reason)} cancelReason={cancelReason}/>  
              )
            })
          }
          <div className={styles.submitRequest} onClick={onCancelRequest}>Submit Request</div>
        </div>

    </div>
    </>

  )
}
