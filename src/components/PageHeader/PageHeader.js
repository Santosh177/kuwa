
import styles from './page-header.module.scss';

const PageHeader = ({headerName=""}) => {

    return(
        <div className={styles.pageHeader}>
            <img className={styles.headerBackgroundImg} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/header_background_desktop.png' />
            <img className={styles.mobHeaderBackgroundImg} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/header_background+(1).png' />
            <div className={styles.headerContent}>
                <img className={styles.backArrow} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/back_arrow+%281%29.png' alt='back-arrow'/>
                <div className={styles.headerTxt}>{headerName}</div>
                <img className={styles.kuwaLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/kuwa_logo.png' alt='kuwa-logo'/>
            </div>
           
        </div>
    )
}


export default PageHeader;

  