'use client';
import React ,{useState,useEffect} from 'react'
import { useRouter} from 'next/navigation';
import styles from './banner.module.scss';
export default function Banner({mobileImage,desktopImage,imageRedirection}) {

  const router = useRouter();
  

 


  return (
    <>
     <div className='' onClick={()=>router.push(imageRedirection)}>
     <div className={styles.mobBanner}>
        <img src={mobileImage} alt="top-banner"/>
      </div>
      <div className={styles.desktopBanner}>
        <img src={desktopImage} alt="top-banner"/>
      </div>
     </div>
    </>

  )
}
