'use client'
import { useEffect, useState } from 'react';
import styles from './cancel-request.module.scss';
import { useRouter, useParams,useSearchParams } from 'next/navigation';
import ItmeListForCancellation from './ItmeListForCancellation';
import { useLanguage } from '@/context/languageDetails';

const CheckBox = ({ isChecked=false }) => {
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={isChecked} />
        <span className={styles.checkmark}></span>
      </div>
    );
  };


const ReasonCard = ({data,onSelect,cancelReason}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


   const isSelected = data.reason == cancelReason;
    return(
        <div className={styles.reasonCard} onClick={()=>onSelect(data)} style={(isSelected)?{backgroundColor:'#F1FAF8'}:{}}>
            <CheckBox isChecked={isSelected}/>
            <div className={styles.reasonTxt}>{ isArabic ? data.reasonArabic: data.reason}</div>
        </div>
    )
}


export default  function CancelRequest({cancelReasonData=[]}) {
  const [ cancelReason , setCancelReason ] = useState("");
  const [payloadData, setPayloadData] = useState([]);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);
  const params = useParams();
  const router = useRouter();
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  
  const onCancelRequest = async() => {
    if (cancelReason && payloadData && payloadData.length>0 &&!isSubmitDisabled){
      setSubmitDisabled(true);
      let data=[];
        payloadData && payloadData.length > 0 && payloadData.map((item,index)=>{
          item["cancelReason"]=cancelReason;
          data.push(item);
      })
      // let data ={
      //   productId: params.id,
      //   cancelReason:cancelReason
      // }
      // return;
      const updateCartItemResp = await fetch('/api/order-cancellation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
    const updateCartItemData = await updateCartItemResp.json();
    router.replace('/my/order/cancellation-confirmed')
    // return updateCartItemData;
    }
  }
const handleItemList=(item)=>{
 
}
  return (
    <>
    <div className={styles.CancelRequestMain}>
      <ItmeListForCancellation setPayloadData={setPayloadData} payloadData={payloadData||[]} />
    <div className={`${styles.cancelRequest} ${styles.subContainer}`}>
        <div className={styles.headerTxt}>{isArabic ? "سبب الإلغاء" : "Reason for cancellation"}</div>
        <div className={styles.cancelReasonItemList}>
          {
            cancelReasonData.map((data,index)=>{
              return(
                <ReasonCard  data={data} onSelect={(data)=>setCancelReason(data.reason)} cancelReason={cancelReason}/>  
              )
            })
          }
            <div className={styles.submitRequest} style={{ cursor: (!cancelReason || payloadData.length==0) ? 'not-allowed' : "", opacity: (!cancelReason || payloadData.length==0 || isSubmitDisabled)?"0.5":""}} onClick={onCancelRequest}>{isArabic ? "تقديم الطلب" : "Submit Request"}</div>
        </div>

    </div>
    </div>
    </>

  )
}
