
import styles from './page-info-ticker.module.scss';


const Ticker = ({text}) => {
    return(
        <div className={styles.pageInfoTicker}>
        <div className={styles.pageInfoContainer}>
             <div className={styles.pageInfoItem}>
                 <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/address.png' alt='icon'/>
             </div>
             <div className={styles.txt}>{text}</div>
        </div>
    </div>
    )
}


const PageInfoTicker = ({}) => {

    return(
        <div className={styles.pageInfoWrapper}>
            <Ticker text="Address" />
            <div className={styles.horizontalLine}></div>
            <Ticker text="Order summary" />
            <div className={styles.horizontalLine}></div>
            <Ticker text="Payment"/>
        </div>
    )

  



}


export default PageInfoTicker;

  