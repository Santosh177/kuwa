'use client';
import { useRouter,useSearchParams } from 'next/navigation';
import styles from './create-account-box.module.scss';


export default function CreateAccountBox() {

    const router = useRouter();

  
      return (
        <>
          <div className={styles.createAccountBox} onClick={()=>router.push('/sign-up?referer=/address/add-address')}> 
                <div className={styles.createAccountItem}>
                    <div className={styles.newHereTxt}>New here ?</div>
                    <div className={styles.createAccountTxt}>Create an account</div>
                </div>
                <div className={styles.createAccountBtn}>Create account</div>
          </div>
        </>
      )
    }
    