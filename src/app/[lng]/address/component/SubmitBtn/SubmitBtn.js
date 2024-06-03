'use client';

import styles from './submit-btn.module.scss';
import { useLanguage } from '@/context/languageDetails';


export default function SubmitBtn({btnName="",onClick={},isUpdateSuccess=false}) {

  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

      return (
        <>
            <div className={styles.submitBtnWrapper} onClick={()=>onClick()}>
           {isUpdateSuccess &&  <div className={styles.updateTxt}>{isArabic ?  "تم التحديث بنجاح" : "Updated Successfully"}!</div>}
                <div className={styles.submitBtn} >{btnName}</div>
            </div>
          
        </>
      )
    }
    