import React from 'react'
import styles from './out-of-stock-popup.module.scss';
import CartItemCard from '../CartItemCard/CartItemCard';

const OutOfStockProductsPopUp = ({outOfStockProducts,setIsShowOutOfStockProductsPopUp,haveAddress }) => {
    console.log("outOfStockProducts+++",outOfStockProducts)
    const handleProceed = ()=>{
        if(haveAddress) {
            window.location.href = './payment'
    }
    else{
        window.location.href = '/address/add-address';
    }
}
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
                <div className={styles.button} onClick={()=> handleProceed()} >Yes, Continue</div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default OutOfStockProductsPopUp
