'use client'
import React , {useRef,useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import EmptyOrderAnimation from './empty_bag.json'
import Lottie from "react-lottie";
import styles from './empty-order.module.scss';
console.log("santo",EmptyOrderAnimation)


export default function EmptyOrder(){
    const router = useRouter();

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
                <div className={styles.btn} onClick={()=>router.push("/")}>Continue Shopping</div>
            </div>
        </>
      )
    }
    


