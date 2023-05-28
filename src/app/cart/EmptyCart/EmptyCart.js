'use client'
import React , {useRef,useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import EmptyCartAnimation from './empty_bag.json'
import Lottie from "react-lottie";
import styles from './empty-cart.module.scss';

export default async function EmptyCart() {
    const router = useRouter();
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: EmptyCartAnimation,
    };
      return (
        <>
            <div className={styles.emptyCartWrapper}>
            <div>
                <Lottie options={defaultOptions}/>
            </div>
                <div className={styles.txt}>Your cart is empty</div>
                <div className={styles.subTxt}>You don’t have any items in your cart now start adding items to get exciting offers.</div>
                <div className={styles.btn} onClick={()=>router.push("/")}>Continue Shopping</div>
            </div>
        </>
      )
    }
    