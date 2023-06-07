
'use client';
import { useRouter,useSearchParams } from 'next/navigation';

import MyAccountForm from './Myaccount/Myaccount';
import styles from './page.module.scss';



const SignUpHeader =()=> {
  const router = useRouter()

      return (
        <>
            <div className={styles.headerWrapper}>
                <img className={styles.backArrow} onClick={()=>router.back()}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow.png' alt='back-arrow'/>
                <img className={styles.personalProfile} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/personal_profile.png' alt='personal-profile'/>
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
  