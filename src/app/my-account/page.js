
'use client';
import { useRouter,useSearchParams } from 'next/navigation';

import MyAccountForm from './Myaccount/Myaccount';
import styles from './page.module.scss';



const SignUpHeader =()=> {
  const router = useRouter()

      return (
        <>
            <div className={styles.headerWrapper}>
            <div className={styles.headerWrap}>
              <img className={styles.backArrow} onClick={()=>router.back()} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow_signup.png' alt='back-arrow'/>
              <div className={styles.headerContainer}>
                  <img className={styles.personalProfile} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/personal_profile.png' alt='personal-profile'/>
              </div>
            </div>
        </div>
        </>
      )
    }
    



export default function MyAccount() {

    return (
      <>
        <SignUpHeader />
        <MyAccountForm />
      </>
    )
  }
  