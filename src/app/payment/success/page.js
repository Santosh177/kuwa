'use client'
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from './pages.module.scss';
import { useEffect } from 'react';

export default function PaymentSuccess() {


    useEffect(()=>{
      deleteAllItem()
    },[])

    const deleteAllItem = async() =>{
      const res = await fetch('/api/delete-all-item', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    }
  
      return (
        <>
        <PageHeader backButtonAction={()=>window.location.href = '/'} />
        <div className={styles.paymentSuceesContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/success.png' alt=''/>
          <div className={styles.txt}>Order placed</div>
          <div className={styles.subTxt}>Thanks for your purchase! Confirmation email with details coming soon. Contact us if you have any questions.</div>
          <div className={styles.btn} onClick={()=>window.location.href='/'}>Continue Shopping</div>
        </div>
        </>
      )
    }
    