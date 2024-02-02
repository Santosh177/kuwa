'use client'
import React from 'react';
import styles from './price-details-container.module.scss'
import { useCountry } from '@/context/contryDetails';

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
    deliveryFee=0,
    prepaidDiscountAmount = "",
codCharge=0 } = orderDetailsData
    const { selectedCountry={} } = useCountry();
    const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || ""
    const discountAmount = parseFloat(discount).toFixed(2);
    const totalQuantity = orderProducts.reduce((sum, data) => {
        return sum + data.productQuantity;
    }, 0);
   
    return(
        <div className={styles.header}>
            <div classname={styles.headerTxt} >Price Details</div>
       <div className={styles.priceDetailsWrapper}>
       
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Price ({totalQuantity} items)</div>
                <div className={styles.rowItemRightText}>{ currency +" " + allProductsPrice }</div>
            </div>
           { <>
            {discount > 0 &&<div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Coupon Discount</div>
                <div  className={[styles.rowItemLeftText,styles.discount].join(" ")}>- {currency + " "+ discountAmount}
                <div className={styles.couponCode}>({couponType=="Percentage"?coupon +" " + "-" + " " + (couponPercentage + ""+ "%"):(coupon +" " + "-" + " " + discountAmount + ""+" " + currency)})</div> </div>
            </div>}
            {prepaidDiscountAmount>0 && <div className={styles.rowItemContainer}>
               <div  className={`${styles.rowItemLeftText} ${styles.extraPayment}`}>{prePaidDiscount}% Extra Off on paying online applied</div>
               <div  className={[styles.rowItemRightText,styles.extradiscountAmount].join(" ")}>- {currency + " "+ parseFloat(prepaidDiscountAmount).toFixed(2)} </div>
           </div>}
           {codCharge>0 && <div className={styles.rowItemContainer}>
               <div  className={`${styles.rowItemLeftText} ${styles.codChargeTxt}`}>Additional COD Charges</div>
               <div  className={[styles.rowItemRightText,styles.codChargeAmount].join(" ")}>- {currency + " "+ parseFloat(codCharge)} </div>
           </div>}
            <div className={styles.rowItemContainer}>
                <div className={styles.rowItemLeftText}>Delivery Fee</div>
                <div className={[styles.rowItemRightText,styles.freeDeliveryTxt].join(" ")}> {deliveryFee>0 ? (<span className={styles.price}>+ {currency + " "+ deliveryFee}</span>):(<span>Free</span>)}</div>
            </div>
           
            {discount> 0 &&  <AmountSavedInfo savedAmount={discountAmount} currency={currency}/>}
            <div className={styles.rowItemContainer}>
                <div className={[styles.rowItemLeftText,styles.totalAmountTxt].join(" ")}>Total Amount</div>
                <div className={[styles.rowItemRightText,styles.totalAmountPrice].join(" ")}>{currency + " " + parseFloat(finalAmount).toFixed(2)}</div>
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