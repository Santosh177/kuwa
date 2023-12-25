'use client'
import React from 'react';
import styles from './price-details-container.module.scss'

const AmountSavedInfo = ({savedAmount=0,currency=""}) => {
    return(
        <div className={styles.amountSavedInfo}>You saved : {currency +" " + savedAmount}</div>
    )
}
const PriceDetailsContainer = ({orderDetailsData}) => {
    const { cartItemCount="",
    allProductsPrice="",
    couponType="",
    coupon="",
    couponPercentage="",
    paymentType="",
    orderProducts=[],
     finalAmount="",
     savedAmount="",
     discount="" ,
     currency="",
    deliveryFee=0 } = orderDetailsData
   
   
    return(
        <div className={styles.header}>
            <div classname={styles.headerTxt} >Price Details</div>
       <div className={styles.priceDetailsWrapper}>
       
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Price ({orderProducts.length} items)</div>
                <div className={styles.rowItemRightText}>{ currency +" " + allProductsPrice }</div>
            </div>
           { <>
            {discount > 0 &&<div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Coupon Discount</div>
                <div  className={[styles.rowItemLeftText,styles.discount].join(" ")}>- {currency + " "+ discount}
                <div className={styles.couponCode}>({couponType=="Percentage"?coupon +" " + "-" + " " + (couponPercentage + ""+ "%"):(coupon +" " + "-" + " " + discount + ""+" " + currency)})</div> </div>
            </div>}
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Delivery Fee</div>
                <div className={[styles.rowItemRightText,styles.freeDeliveryTxt].join(" ")}> {deliveryFee>0 ? (<span className={styles.price}>+ {currency + " "+ deliveryFee}</span>):(<span>Free</span>)}</div>
            </div>
            {discount> 0 &&  <AmountSavedInfo savedAmount={discount} currency={currency}/>}
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.totalAmountTxt].join(" ")}>Total Amount</div>
                <div className={[styles.rowItemRightText,styles.totalAmountPrice].join(" ")}>{currency + " " + finalAmount}</div>
            </div>
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.paymentTypeTxt].join(" ")}>Payment Method</div>
                <div className={[styles.rowItemRightText,styles.paymentType].join(" ")}>Using {paymentType}</div>
            </div>
            </>}
           
       </div>
       </div>
    )
}

export default PriceDetailsContainer