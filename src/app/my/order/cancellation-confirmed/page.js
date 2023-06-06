'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import CancellationAnimation from './sad-email.json'
import Lottie from "react-lottie";
import styles from './page.module.scss';

export default function CancellationRequest({}) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: CancellationAnimation,
      };

  return (
    <>
      <PageHeader ishideBackButton={true} isHideLogo={true} onCrossIcon={()=>window.location.href='/'} />
      <div className={styles.cancellationConfirmed}>
        <div className={styles.animationContainer}>
            <Lottie options={defaultOptions}/>
        </div>
        <div className={styles.headerTxt}>Cancellation Confirmed</div>
        <div className={styles.txt}>We're Sorry to See You Go</div>
        <div className={styles.subTxt}>Please share your feedback with us to help us improve our product/service.</div>
      </div>
 
    </>

  )
}
