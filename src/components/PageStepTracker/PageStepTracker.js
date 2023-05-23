
import styles from './page-step-tracker.module.scss';





const PageInfoTicker = ({stepCount=0}) => {
    const steps = [
        {
          label: 'Address',
          icon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/address+(1).png",
          step: 1,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
        {
          label: 'Order Summary',
          icon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/my_order.png",
          icon_white:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/my_order_white.png",
          step: 2,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
        {
          label: 'Payment',
          icon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/payment+(1).png",
          icon_white:'https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/payment.png',
          step: 3,
          tickIcon:"https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png"
        },
      ]



    return(
    <div className={styles.MainContainer}>
      <div className={styles.StepContainer} >
        {steps.map(({ step, label,icon,icon_white, tickIcon }) => (
          <div className={styles.StepWrapper} key={step}>
            <div className={[styles.StepStyle,(step==3)?styles.StepStyle3:"", (step<=stepCount)?styles.StepStyleActive:'' , (step + 1 <= stepCount)?styles.StepStyleActiveTracker:''].join(" ")}>
                <div className={styles.StepCount}>
                    <img className={styles.stepIcon} src={(step<stepCount)?tickIcon:(step<=stepCount)?icon_white:icon} />
                </div>
            </div>
            <div className={styles.StepsLabelContainer}>
              <div className={styles.StepLabel} key={step}>{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    )

  



}


export default PageInfoTicker;

  