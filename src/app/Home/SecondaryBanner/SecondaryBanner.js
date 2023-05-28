'use client'
import React ,{ useState,useEffect } from 'react';
import styles from './secondary-banner.module.scss';

import Glider from 'react-glider';
import "glider-js/glider.min.css";

const SecondaryBanner = () => {
   
    return(

        <>
        <div className={styles.secondaryBannerMob}>
            <Glider  slidesToShow={1} scrollLock  hasDots draggable>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/banner_multiple.png' alt='secondary'></img>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/banner_multiple.png' alt='secondary'></img>
            </Glider>
        </div>
       <div className={styles.secondaryBannerDesktop}>
            <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/banner_multiple.png' alt='secondary'></img>
            <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/banner_multiple.png' alt='secondary'></img>
       </div>
       </>
    )
}


export default SecondaryBanner;

  