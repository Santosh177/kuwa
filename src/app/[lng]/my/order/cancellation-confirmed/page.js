'use client';
import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import CancellationAnimation from './sad-email.json'
import Lottie from "react-lottie";
import styles from './page.module.scss';
import { useLanguage } from '@/context/languageDetails';

export default function CancellationRequest({}) {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

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
        <div className={styles.headerTxt}>{isArabic ? "تأكيد الإلغاء" : "Cancellation Confirmed"}</div>
        <div className={styles.txt}>{isArabic ? "نأسف لرحيلك" : "We're Sorry to See You Go"}</div>
        <div className={styles.subTxt}>{isArabic ?  "يرجى مشاركة تعليقاتك معنا لمساعدتنا على تحسين منتجنا/خدمتنا" : "Please share your feedback with us to help us improve our product/service"}.</div>
      </div>
 
    </>

  )
}
