'use client';

import styles from './submit-btn.module.scss';


export default function SubmitBtn({onSaveAddress={}}) {

  
      return (
        <>
            <div className={styles.submitBtnWrapper} onClick={()=>onSaveAddress()}>
                <div className={styles.submitBtn} >Save address & proceed</div>
            </div>
          
        </>
      )
    }
    