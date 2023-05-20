
import styles from './company.module.scss';



const CompanyInfo = ({number,image}) => {

    return(
        <div className={styles.companyInfoWrapper}>
            <div className={styles.companyInfoContainer}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/member.png' alt=''/>
                <div className={styles.txt}>10,000+</div>
                <div className={styles.subTxt}>Satisfied Customers</div>
            </div>
            <div className={styles.verticalLine}></div>
            <div className={styles.companyInfoContainer}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/fda-approved.png' alt=''/>
                <div className={styles.txt}>FDA Approved</div>
                <div className={styles.subTxt}>Safe & Effective</div>
            </div>
        </div>
    )



}


export default CompanyInfo;

  