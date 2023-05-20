
import styles from './page-info-ticker.module.scss';


const Ticker = ({text}) => {
    return(
        <div className={styles.pageInfoTicker}>
        <div className={styles.pageInfoContainer}>
             <div className={styles.pageInfoItem}>
                 <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/address.png' alt='icon'/>
             </div>
             <div className={styles.txt}>{text}</div>
        </div>
    </div>
    )
}


const PageInfoTicker = ({}) => {
    const steps = [
        {
          label: 'Address',
          step: 1,
        },
        {
          label: 'Order Summary',
          step: 2,
        },
        {
          label: 'Payment',
          step: 3,
        },
      ]
    return(
    <div className={styles.MainContainer} id="rrr">
      <div className={styles.StepContainer} >
        {steps.map(({ step, label }) => (
          <div className={styles.StepWrapper} key={step}>
            <div className={[styles.StepStyle,(step==3)?styles.StepStyle3:""].join(" ")}>
              {/* {activeStep > step ? (
                <CheckMark>L</CheckMark>
              ) : ( */}
                <div className={styles.StepCount}>{step}</div>
              {/* )} */}
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

  