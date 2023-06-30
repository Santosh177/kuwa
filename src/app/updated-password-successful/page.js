'use client'
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader/PageHeader';
import styles from './page.module.scss';
// import { useEffect } from 'react';


export default function UpdatedPasswordSuccessful() {
  const router = useRouter();

  return (
    <>
      <PageHeader ishideBackButton={true}   />
      <div className={styles.passwordSuceesContainer}>
        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/success.png" alt="" />
        <div className={styles.txt}>Password Reset Successfully</div>

        <div className={styles.subTxt}>Your password has been reset successfully. Login to your account </div>
        <div className={styles.btn} onClick={() => router.push('/login')}>Redirect to website</div>
      </div>
    </>
  );
}
    