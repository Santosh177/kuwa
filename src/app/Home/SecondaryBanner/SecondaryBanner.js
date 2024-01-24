'use client'
import React ,{ useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './secondary-banner.module.scss';

import Glider from 'react-glider';
import "glider-js/glider.min.css";

const SecondaryBanner = ({data}) => {
    const router = useRouter();
    return(

        <>
        <div className={styles.secondaryBannerMob}>
            <Glider  slidesToShow={1} scrollLock  draggable>
                {
                    data.map((data,index)=> <img style={{cursor:'pointer'}} onClick={()=> router.push(data.redirectionLink)} src={data.image} alt={index} key={index}/>)
                }
            </Glider>
        </div>
       <div className={styles.secondaryBannerDesktop}>
                {
                    data.map((data,index)=> <img style={{cursor:'pointer'}} onClick={()=> router.push(data.redirectionLink)} src={data.image} alt={index} key={index}/>)
                }
       </div>
       </>
    )
}


export default SecondaryBanner;

  