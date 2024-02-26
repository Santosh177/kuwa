import React from 'react';
import styles from './notify-success-Popup.module.scss'

const NotifySuccessPopup = ({setIsShowNotifySuccessPopup}) => {
  return (
    <div className={styles.NotifyOverlay}>
    <div className={styles.NotifySuccessPopup}>
        <div className={styles.content}>
            <div className={styles.rightArrowImg}><img src='https://d25uasl7utydze.cloudfront.net/assets/check_uncheck.svg'></img></div>
            <div className={styles.txt}>We will notify you once the product is back in stock.</div>
            <div className={styles.btn} onClick={()=>setIsShowNotifySuccessPopup(false)}>Okay</div>
        </div>

    </div>

    </div>
  )
}

export default NotifySuccessPopup