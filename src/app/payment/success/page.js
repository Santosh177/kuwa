'use client'
import PageHeader from '@/components/PageHeader/PageHeader';
import { useRouter } from 'next/navigation';
import styles from './pages.module.scss';

export default function PaymentSuccess() {


  const router = useRouter();
  
      return (
        <>
        <PageHeader />
        <div className={styles.paymentSuceesContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/success.png' alt=''/>
          <div className={styles.txt}>Order placed</div>
          <div className={styles.subTxt}>Thanks for your purchase! Confirmation email with details coming soon. Contact us if you have any questions.</div>
          <div className={styles.btn} onClick={()=>router.push('/')}>Continue Shopping</div>
        </div>
        </>
      )
    }
    