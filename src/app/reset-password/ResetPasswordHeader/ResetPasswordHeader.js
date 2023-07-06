'use client';
import { useRouter } from 'next/navigation';
import styles from './reset-password-header.module.scss';


export default function ResetPasswordHeader() {

  const router = useRouter()
 
  
      return (
        <>
        <div className={styles.headerWrapper}>
          <div className={styles.headerWrap}>
          <img className={styles.backArrow} onClick={()=>router.back()} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow_signup.png' alt='back-arrow'/>
            <div className={styles.headerContainer}>
                <div className={styles.kuwaLogo}>
                  <img src='https://d25uasl7utydze.cloudfront.net/kuwa/kuwa_logo_login.png' alt='kuwa-logo'/>
                </div>
            </div>
          </div>
          </div>
        </>
      )
    }
    