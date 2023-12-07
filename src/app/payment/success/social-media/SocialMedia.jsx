'use client';
import React ,{useState} from 'react'
import styles from './Social-media.module.scss'

const SocialMedia = () => {
  return (
    <div className={styles.socialMediaContainer}>
      <div className={styles.mediaSection}>
        <div className={styles.iconDiv}>
     
          <div className={styles.whatsAppDiv}>
            <div className={styles.whatsAppIcon}>
              <img src="https://d25uasl7utydze.cloudfront.net/assets/Frame%2080.svg"></img>
            </div>
            <div className={styles.whatsAppTxt}>
            WhatsApp Us
            </div>
            </div>
            <div className={styles.mailDiv} >
            <div className={styles.mailIcon}>
              <img src="https://d25uasl7utydze.cloudfront.net/assets/mail.svg"></img>
            </div>
            <div className={styles.mailTxt}>
            support@getkuwa.com
            </div>
       

        </div>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.icon}>
            <img src="https://d25uasl7utydze.cloudfront.net/assets/facebook.svg"></img>
          </div>
          <div  className={styles.icon}>
            <img src="https://d25uasl7utydze.cloudfront.net/assets/linkedin.svg"></img>
          </div>
          <div  className={styles.icon}>
            <img src="https://d25uasl7utydze.cloudfront.net/assets/twitter.svg"></img>
          </div>
          <div  className={styles.icon}>
            <img src="https://d25uasl7utydze.cloudfront.net/assets/mail.svg"></img>
          </div>

        </div>
      </div>


    </div>
  )
}

export default SocialMedia