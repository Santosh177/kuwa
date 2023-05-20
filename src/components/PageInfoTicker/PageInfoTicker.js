
import styles from './page-info-ticker.module.scss';





const PageInfoTicker = ({}) => {
    const steps = [
        {
          label: 'Address',
          icon:"",
          step: 1,
        },
        {
          label: 'Order Summary',
          icon:"",
          step: 2,
        },
        {
          label: 'Payment',
          icon:"",
          step: 3,
        },
      ]
    return(
    <div className={styles.MainContainer} id="rrr">
      <div className={styles.StepContainer} >
        {steps.map(({ step, label }) => (
          <div className={styles.StepWrapper} key={step}>
            <div className={[styles.StepStyle,(step==3)?styles.StepStyle3:""].join(" ")}>
                <div className={styles.StepCount}>
                    <img className={styles.stepIcon} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tick.png' />
                 
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

  