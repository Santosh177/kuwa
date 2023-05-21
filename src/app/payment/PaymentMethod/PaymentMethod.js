'use client';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import CheckoutFrames from '../components/CheckoutFrames/CheckoutFrames';
import styles from './payment-method.module.scss';


const CheckBox = ({isChecked=false}) => {
  return(
    <div className={styles['payment-options-checkbox']}>
      <div className={styles['checkbox-container']}>
          <input type="checkbox" checked={isChecked}/>
          <span className={styles.checkmark}></span>
        </div>
    </div>
  )
}

const CreditCardOption = () => {
  return(
    <div className={styles.creditCardOption}>
        <div className={styles.paymentTypeHeaderTxt}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/payment.png' alt=''/>
                <div className={styles.txt}>Pay with Credit or Debit card</div>
            </div>
            <div className={styles.paymentInfoContainer}>
                <div className={styles.paymentInfo}>
                  <img className={styles.visa} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/visa.png'/>
                  <img className={styles.masterCard} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/mastercard.png' />
                </div>
                
                <CheckBox />

            </div>

            <CheckoutFrames />
    </div>
  )
}


const PayWithEmi = () =>{

  return(
    <div className={styles.payWithEmi}>
      <div className={styles.headerContainer}>
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/payment.png' alt=''/>
        <div className={styles.txt}>Pay with Emi</div>
      </div>
      <div className={styles.paymentOptionsList}>

          <div className={styles.paymentOptionItem}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tamaraLogo.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Just pay AED 20 now</div>
                   <div className={styles.subTxt}>Rest in 2 interest free payments of AED 20</div>
                </div>
              </div>
              <CheckBox />
          </div>
          <div className={styles.paymentOptionItem}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tamaraLogo.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Just pay AED 20 now</div>
                   <div className={styles.subTxt}>Rest in 2 interest free payments of AED 20</div>
                </div>
              </div>
              <CheckBox />
          </div>
      </div>
    </div>
  )
}



export default function PaymentMethod() {



  
      return (
        <div className={styles.paymentMethodWrapper}>
            <div className={styles.headerTxt}>Payment Method</div>
            <div className={styles.headerSubTxt}>Shop with confidence knowing all transactions are securely encrypted for your protection.</div>
            <CreditCardOption />
            <PayWithEmi />
        </div>
      )
    }
    