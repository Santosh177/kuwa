'use client'
import { useState } from 'react';
import styles from './cancel-request.module.scss';
import { useRouter, useParams,useSearchParams } from 'next/navigation';


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
  const params = useParams();
  const router = useRouter();


  
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



  return (
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

  )
}
