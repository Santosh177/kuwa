'use client';
import { useRouter } from 'next/navigation';
import styles from './sign-up-header.module.scss';
import { useLanguage } from '@/context/languageDetails';


export default function SignUpHeader() {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const router = useRouter()
  
      return (
        <div className={styles.headerWrapper}>
          <div className={styles.headerWrap}>
              <img className={styles.backArrow} onClick={()=>router.back()} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow_signup.png' alt='back-arrow'/>
              <div className={styles.headerContainer}>
                  <div className={styles.kuwaLogo}>
                    <img src='https://d25uasl7utydze.cloudfront.net/kuwa/kuwa_logo_login.png' alt='kuwa-logo'/>
                    <div className={styles.txt}>{isArabic ? "مرحبًا" : "Welcome"} !</div>
                  </div>
              </div>
            </div>
        </div>
      )
    }
    