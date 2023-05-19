
import styles from './pages.module.scss';

export default function PaymentSuccess() {



  
      return (
        <div className={styles.paymentSuceesContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/success.png' alt=''/>
          <div className={styles.txt}>Order placed</div>
          <div className={styles.subTxt}>Thanks for your purchase! Confirmation email with details coming soon. Contact us if you have any questions.</div>
          <div className={styles.btn}>Continue Shopping</div>
        </div>
      )
    }
    