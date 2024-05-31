'use client';

import styles from './submit-btn.module.scss';
import { useLanguage } from '@/context/languageDetails';


export default function SubmitBtn({onSaveAddress={}}) {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  
      return (
        <>
            <div className={styles.submitBtnWrapper} onClick={()=>onSaveAddress()}>
                <div className={styles.submitBtn} >{isArabic ? "حفظ العنوان والمتابعة" :"Save Address & Proceed"}</div>
            </div>
          
        </>
      )
    }
    