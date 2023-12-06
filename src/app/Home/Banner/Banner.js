'use client';
import React ,{useState,useEffect} from 'react'
import { useRouter} from 'next/navigation';
import styles from './banner.module.scss';
export default function Banner({bannerBackground,mobileImage,desktopImage,imageRedirection}) {

  const router = useRouter();
  

 


  return (
    <>
     <div className='' onClick={()=>router.push(imageRedirection)}>
     <div className={styles.mobBanner} style={{background:bannerBackground}}>
        <img src={mobileImage} alt="top-banner"/>
      </div>
      <div className={styles.desktopBanner} style={{background:bannerBackground}}>
        <img src={desktopImage} alt="top-banner"/>
      </div>
     </div>
    </>

  )
}
