'use client';
import { useRouter } from 'next/navigation';
import styles from './sign-up-header.module.scss';


export default function SignUpHeader() {

  const router = useRouter()
  
      return (
        <>
            <div className={styles.headerWrapper}>
                <img className={styles.backArrow} onClick={()=>router.back()} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow.png' alt='back-arrow'/>
                <div className={styles.kuwaLogo}>
                  <img src='https://d25uasl7utydze.cloudfront.net/kuwa/kuwa_logo_login.png' alt='kuwa-logo'/>
                  <div className={styles.txt}>Welcome Back !</div>
                </div>
            </div>
        </>
      )
    }
    