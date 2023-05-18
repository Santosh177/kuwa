
import styles from './page-header.module.scss';



const PageHeader = ({}) => {

    return(
        <div className={styles.pageHeader}>
            <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/header_background+(1).png'  />
            <div className={styles.headerInfo}>
                <img className={styles.backArrow} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow+%281%29.png' alt='back-arrow'/>
                <div className={styles.headerTxt}>Add Address</div>
            </div>
            
            <img className={styles.kuwaLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/kuwa_logo.png' alt='kuwa-logo'/>
        </div>
    )

  



}


export default PageHeader;

  