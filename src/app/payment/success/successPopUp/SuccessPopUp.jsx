"use client";
import React from 'react';
import styles from './success-popup.module.scss';
import Lottie from "react-lottie";
import successAnimation from './succees-animatiom.json'

const SuccessPopUp = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
  };
  return (
    <div className={styles.popUpContainer}>
    <div className={styles.successPopUp}>
      <div className={styles.successAnimation}>
      <Lottie options={defaultOptions}/>
      </div>
        <div className={styles.content}>
            <div className={styles.title}>Hey there, New Friend!</div>
            <div className={styles.txt}>You're officially part of our health tribe. Got questions? We're here 24/7. Let's make healthy happen together!"</div>
            <div className={styles.button} onClick={()=>window.location.href='/'}>Back to homepage</div>
        </div>


    </div>
    </div>
  )
}

export default SuccessPopUp