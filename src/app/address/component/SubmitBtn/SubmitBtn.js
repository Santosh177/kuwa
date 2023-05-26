'use client';

import styles from './submit-btn.module.scss';


export default function SubmitBtn({btnName="",onClick={}}) {

  
      return (
        <>
            <div className={styles.submitBtnWrapper} onClick={()=>onClick()}>
                <div className={styles.submitBtn} >{btnName}</div>
            </div>
          
        </>
      )
    }
    