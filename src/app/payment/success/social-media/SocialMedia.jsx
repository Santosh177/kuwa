'use client';
import React ,{useState,useEffect} from 'react'
import styles from './social-media.module.scss'

const SocialMedia = () => {
  const [isOpenChat,setIsOpenChat] = useState(false)

  const openChatLive = ()=>{
    const fcWidget = window.fcWidget;

    if (isOpenChat) {
      fcWidget.hide();
    } else {
    
      fcWidget.show();
      fcWidget.open();
    }

  
    setIsOpenChat(!isOpenChat);
  }
  return (
    <div className={styles.socialMediaContainer}>
      <div className={styles.mediaSection}>
        <div className={styles.iconDiv}>
     
          <div className={styles.whatsAppDiv} onClick={openChatLive}>
            <div className={styles.whatsAppIcon}>
              <img src="https://d25uasl7utydze.cloudfront.net/assets/chat.svg"></img>
            </div>
            <div className={styles.whatsAppTxt} >
            Chat with us
            </div>
            </div>
            <a href="mailto:support@getkuwa.com"><div className={styles.mailDiv} >
            <div className={styles.mailIcon}>
              <img src="https://d25uasl7utydze.cloudfront.net/assets/mail.svg"></img>
            </div>
            
           <div className={styles.mailTxt}>
            support@getkuwa.com
            </div>
       

        </div>
        </a>
        </div>
        <div className={styles.iconContainer}>
         <a href='https://www.facebook.com/get.kuwa' > <div className={styles.icon}>
            <img src="https://d25uasl7utydze.cloudfront.net/assets/facebook.svg"></img>
          </div></a>
          <a href='https://www.instagram.com/get.kuwa/'><div className={styles.icon}>
            <img src="https://d25uasl7utydze.cloudfront.net/assets/instagram.svg"></img>
          </div></a>

         <a href='https://www.tiktok.com/@kuwasupplements'><div  className={styles.icon}>
            <img src="https://d25uasl7utydze.cloudfront.net/assets/tiktok.svg"></img>
          </div></a> 


        </div>
      </div>


    </div>
  )
}

export default SocialMedia