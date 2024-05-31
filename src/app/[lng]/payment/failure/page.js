'use client'
import { useRouter } from 'next/navigation';
import styles from './pages.module.scss';

export default function PaymentFailure() {

  const router = useRouter();


  
      return (
        <div className={styles.paymentFailureContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentFailure.png' alt=''/>
          <div className={styles.txt}>Payment failed</div>
          <div className={styles.subTxt}>Your payment couldn't go through.Please make sure that your payment details are correct, your card is not expired and/or your account contains sufficient funds.</div>
          <div className={styles.btn} onClick={()=>router.replace('/payment')}>Retry</div>
        </div>
      )
    }
    