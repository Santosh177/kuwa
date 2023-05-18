'use client';

import styles from './create-account-box.module.scss';


export default function CreateAccountBox() {



  
      return (
        <>
          <div className={styles.createAccountBox}> 
                <div className={styles.createAccountItem}>
                    <div className={styles.newHereTxt}>New here ?</div>
                    <div className={styles.createAccountTxt}>Create an account and enjoy 20AED off your first order!</div>
                </div>
                <div className={styles.createAccountBtn}>Create account</div>
          </div>
        </>
      )
    }
    