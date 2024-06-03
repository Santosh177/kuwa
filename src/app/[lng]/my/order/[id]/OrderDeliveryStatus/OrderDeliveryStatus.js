
import { useEffect, useState } from 'react';
import styles from './order-delivery-status.module.scss';
import { useLanguage } from '@/context/languageDetails';





const OrderDeliveryStatus = ({orderStatus=""}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    const [stepCount,setStepCount] = useState(1);
    useEffect(()=>{
      if (orderStatus === "FULFILLED"){
        setStepCount(2)
      } else if (orderStatus === "DELIVERED"){
        setStepCount(3)
      }
    },[orderStatus])

    const steps = [
        {
          label: isArabic ? "تم استلام الطلب" : 'Order Received',
          step: 1,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
        {
          label: isArabic ? "تم الشحن":  'Shipped',
          step: 2,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
        {
          label: isArabic ? "تم التوصيل" : 'Delivered',
          step: 3,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
      ]



    return(
      <>
       {orderStatus != "CANCELED" && <div className={styles.deliveryStatusContainer}>
        <div className={styles.headerTxt}>{isArabic ? "حالة التوصيل" : "Delivery Status"}</div>
          <div className={styles.MainContainer}>
            <div className={styles.StepContainer} >
              {steps.map(({ step, label,icon,icon_white, tickIcon }) => (
                <div className={styles.StepWrapper} key={step}>
                  <div className={
                    isArabic ? 
                    [styles.StepStyleAr,(step==3)?styles.StepStyle3:"", (step<=stepCount)?styles.StepStyleActive:'' , (step + 1 <= stepCount)?styles.StepStyleActiveTracker:''].join(" ")

                    :
                    [styles.StepStyle,(step==3)?styles.StepStyle3:"", (step<=stepCount)?styles.StepStyleActive:'' , (step + 1 <= stepCount)?styles.StepStyleActiveTracker:''].join(" ")}>
                      <div className={styles.StepCount}>
                          {(step<=stepCount) &&<img className={styles.stepIcon} src={(step<=stepCount)?tickIcon:""} />}
                      </div>
                  </div>
                  <div className={styles.StepsLabelContainer}>
                    <div className={styles.StepLabel} key={step}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>}
       {orderStatus ==="CANCELED" && <div className={styles.cancelledOrderContainer}>
                <img className={styles.crossIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cross_icon_cancel.png' alt='order-canceled'/>
                <div className={styles.txt}>{isArabic ? "تم إلغاء الطلب" : "Order Cancelled"}</div>
        </div>}
    </>
    )

  



}


export default OrderDeliveryStatus;

  