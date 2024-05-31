'use client'
import React , {useRef,useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import EmptyOrderAnimation from './empty_bag.json'
import Lottie from "react-lottie";
import styles from './empty-order.module.scss';
import { useLanguage } from '@/context/languageDetails';


export default function EmptyOrder(){
    const router = useRouter();
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    const defaultOptions ={
        loop: true,
        autoplay: true,
        animationData: EmptyOrderAnimation,
    }
    
    return (
        <>
            <div className={styles.emptyOrderWrapper}>
                <div>  <Lottie options={defaultOptions}/></div>
           
                <div className={styles.txt}>Oops! No Orders</div>
                <div className={styles.subTxt}>It seems like there are no orders to display at the moment.</div>
                <div className={styles.btn} onClick={()=>router.push("/")}>{isArabic ? "استمر في التسوق" :"Continue Shopping"}</div>
            </div>
        </>
      )
    }
    


