'use client'
import { useRouter } from 'next/navigation';
import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import styles from './page.module.scss';
// import { useEffect } from 'react';
import { useLanguage } from '@/context/languageDetails';

export default function UpdatedPasswordSuccessful() {
  const router = useRouter();
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


  return (
    <>
      <PageHeader ishideBackButton={true}   />
      <div className={styles.passwordSuceesContainer}>
        <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/success.png" alt="" />
        <div className={styles.txt}>{isArabic ? "تم إعادة تعيين كلمة المرور بنجاح" : "Password Reset Successfully"}</div>

        <div className={styles.subTxt}>{isArabic ? "تم إعادة تعيين كلمة المرور الخاصة بك بنجاح. قم بتسجيل الدخول إلى حسابك" : "Your password has been reset successfully. Login to your account"} </div>
        <div className={styles.btn} onClick={() => router.push('/login')}>{isArabic ? "التوجيه إلى الموقع الإلكتروني" : "Redirect to website"}</div>
      </div>
    </>
  );
}
    