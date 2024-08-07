"use client"
import styles from './page-step-tracker.module.scss';

import { useLanguage } from '@/context/languageDetails';



const PageInfoTicker = ({stepCount=0}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    const steps = [
        {
          label: isArabic ? "العنوان" : 'Address',
          icon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/address+(1).png",
          icon_white:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/Group+42405.png",
          step: 1,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
        // {
        //   label: 'Order Summary',
        //   icon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/my_order.png",
        //   icon_white:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/my_order_white.png",
        //   step: 2,
        //   tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        // },
        {
          label: isArabic ? "الدفع" : 'Payment',
          icon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/payment+(1).png",
          icon_white:'https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/payment.png',
          step: 2,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
      ]



    return(
      <></>
    // <div className={styles.MainContainer}>
    //   <div className={styles.StepContainer} >
    //     {steps.map(({ step, label,icon,icon_white, tickIcon }) => (
    //       <div className={styles.StepWrapper} key={step}>
    //         <div className={ 
    //           isArabic ? 
    //           [styles.StepStyleAr,(step==2)?styles.StepStyle3:"", (step<=stepCount)?styles.StepStyleActive:'' , (step + 1 <= stepCount)?styles.StepStyleActiveTracker:''].join(" ")
    //           :
    //           [styles.StepStyle,(step==2)?styles.StepStyle3:"", (step<=stepCount)?styles.StepStyleActive:'' , (step + 1 <= stepCount)?styles.StepStyleActiveTracker:''].join(" ")}>
    //             <div className={styles.StepCount}>
    //                 <img className={`${styles.stepIcon} ${isArabic ? styles['stepIcon-ar'] : ''}`} src={(step<stepCount)?tickIcon:(step<=stepCount)?icon_white:icon} />
    //             </div>
    //         </div>
    //         <div className={styles.StepsLabelContainer}>
    //           <div className={styles.StepLabel} key={step}>{label}</div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    )

  



}


export default PageInfoTicker;

  