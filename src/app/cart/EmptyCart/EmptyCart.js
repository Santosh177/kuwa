'use client'
import { useRouter } from 'next/navigation';
import styles from './empty-cart.module.scss';

export default async function EmptyCart() {
    const router = useRouter();

  
      return (
        <>
            <div className={styles.emptyCartWrapper}>
                <div className={styles.txt}>Your cart is empty</div>
                <div className={styles.subTxt}>You don’t have any items in your cart now start adding items to get exciting offers.</div>
                <div className={styles.btn} onClick={()=>router.push("/")}>Continue Shopping</div>
            </div>
        </>
      )
    }
    