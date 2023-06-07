
import styles from './order-delivery-status.module.scss';





const OrderDeliveryStatus = ({stepCount=2}) => {


  // SHIPPED
  //FULFILLED
   const orderStatus = "CREATED"
    const steps = [
        {
          label: 'Order Received',
          step: 1,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
        {
          label: 'Shipped',
          step: 2,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
        {
          label: 'Delivered',
          step: 3,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
      ]



    return(
    <div className={styles.deliveryStatusContainer}>
    <div className={styles.MainContainer}>
      <div className={styles.StepContainer} >
        {steps.map(({ step, label,icon,icon_white, tickIcon }) => (
          <div className={styles.StepWrapper} key={step}>
            <div className={[styles.StepStyle,(step==3)?styles.StepStyle3:"", (step<=stepCount)?styles.StepStyleActive:'' , (step + 1 <= stepCount)?styles.StepStyleActiveTracker:''].join(" ")}>
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
    </div>
    )

  



}


export default OrderDeliveryStatus;

  