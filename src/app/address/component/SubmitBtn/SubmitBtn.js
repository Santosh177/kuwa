'use client';

import styles from './submit-btn.module.scss';


export default function SubmitBtn({btnName="",onClick={},isUpdateSuccess=false}) {

  
      return (
        <>
            <div className={styles.submitBtnWrapper} onClick={()=>onClick()}>
           {isUpdateSuccess &&  <div className={styles.updateTxt}>Updated Successfully!</div>}
                <div className={styles.submitBtn} >{btnName}</div>
            </div>
          
        </>
      )
    }
    