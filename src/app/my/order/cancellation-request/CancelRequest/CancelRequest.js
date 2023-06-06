'use client'
import { useState } from 'react';
import styles from './cancel-request.module.scss';


const CheckBox = ({ isChecked=false }) => {
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={isChecked} />
        <span className={styles.checkmark}></span>
      </div>
    );
  };
const ReasonCard = ({data,onSelect,cancelId}) => {

   const isSelected = data.id == cancelId;
    return(
        <div className={styles.reasonCard} onClick={()=>onSelect(data)} style={(isSelected)?{backgroundColor:'#F1FAF8'}:{}}>
            <CheckBox isChecked={isSelected}/>
            <div className={styles.reasonTxt}>{data.reason}</div>
        </div>
    )
}


export default  function CancelRequest({cancelReasonData=[]}) {
  const [ cancelId , setCancelId ] = useState("");


  
  const onCancelRequest = () => {
    if(cancelId){
      alert("cancel request")
    }
  }



  return (
    <div className={styles.cancelRequest}>
        <div className={styles.headerTxt}>Reason for cancellation</div>
        <div className={styles.cancelReasonItemList}>
          {
            cancelReasonData.map((data,index)=>{
              return(
                <ReasonCard  data={data} onSelect={(data)=>setCancelId(data.id)} cancelId={cancelId}/>  
              )
            })
          }
          <div className={styles.submitRequest} onClick={onCancelRequest}>Submit Request</div>
        </div>

    </div>

  )
}
