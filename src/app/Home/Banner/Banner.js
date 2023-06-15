'use client';
import React ,{useState,useEffect} from 'react'
import styles from './banner.module.scss';
export default function Banner({mobileImage,desktopImage,imageRedirection}) {
console.log(mobileImage,desktopImage)
  
const handleAction=()=>{
  window.location.href = imageRedirection;
}
 


  return (
    <>
     <div className='' onClick={()=>{handleAction()}}>
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
