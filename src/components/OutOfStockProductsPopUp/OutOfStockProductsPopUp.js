import React from 'react'
import styles from './out-of-stock-popup.module.scss';
import CartItemCard from '../CartItemCard/CartItemCard';

const OutOfStockProductsPopUp = ({outOfStockProducts,setIsShowOutOfStockProductsPopUp }) => {
    console.log("outOfStockProducts+++",outOfStockProducts)
  return (
    <div className={styles.PopContainer}>
        <div className={styles.PopSection}>
          <div className={styles.crossIcon} onClick={()=>setIsShowOutOfStockProductsPopUp(false)}> <img src="https://d25uasl7utydze.cloudfront.net/assets/cross_icon%20(2).svg" alt="cross"/></div> 
        <div className={styles.content}>
            <div className={styles.heading}>Few supplements are out of stock</div>
            <div className={styles.productContent}>
                {
                    outOfStockProducts.map((data,index)=>{
                        return(
                            <CartItemCard data={data} key={index} outOfStockPopUp={true} />
                        )
                    })
                }
                <div></div>
            </div>
            <div className={styles.footer}>
                <div className={styles.subTxt}>Please continue with other available supplements.</div>
                <div className={styles.button} onClick={()=> window.location.href='./payment'} >Yes, Continue</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default OutOfStockProductsPopUp
