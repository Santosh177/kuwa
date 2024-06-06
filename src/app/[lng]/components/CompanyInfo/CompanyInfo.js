'use client'
import styles from './company.module.scss';
import { useLanguage } from '@/context/languageDetails';


const CompanyInfo = ({number,image}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    return(
        <div className={styles.companyInfoWrapper}>
            <div className={styles.companyInfoContainer}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/member.png' alt=''/>
                <div className={styles.txt}>10,000+</div>
                <div className={styles.subTxt}>{isArabic ? "عملاء راضون" : "Satisfied Customers"}</div>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.companyInfoContainer}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/fda-approved.png' alt=''/>
                <div className={styles.txt}>{isArabic ? "معتمد من قبل إدارة الغذاء والدواء (FDA)" : "FDA Approved"}</div>
                <div className={styles.subTxt}>{isArabic ? "آمن وفعال" : "Safe & Effective"}</div>
            </div>
        </div>
    )



}


export default CompanyInfo;

  