'use client';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import CheckoutFrames from '../components/CheckoutFrames/CheckoutFrames';
import styles from './payment-method.module.scss';
import { useState } from 'react';


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

const CardOption = ({selectedPaymentMethod="",onSelectedPaymentMethod={},onPayment={}}) => {

  const [ isShowCard , setIsShowCard] = useState(false)

  return(
    <div className={styles.creditCardOption}>
        <div className={styles.paymentTypeHeaderTxt}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/payment.png' alt=''/>
                <div className={styles.txt}>Pay with Credit or Debit card</div>
            </div>
            <div className={styles.paymentInfoWrapper} >
              <div className={styles.paymentInfoContainer} onClick={(e)=>{
                setIsShowCard(!isShowCard)
                onSelectedPaymentMethod("CHECKOUT_CARD")
            } }>
                <div className={styles.paymentInfo}>
                    <img className={styles.visa} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/visa.png'/>
                    <img className={styles.masterCard} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/mastercard.png' />
                  </div>
                  <CheckBox isChecked={selectedPaymentMethod === "CHECKOUT_CARD"} />
              </div>
                {isShowCard && 
                <><CheckoutFrames onPayment={(data)=>onPayment(data)}/>
                <div className={styles.security}><img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/security.png' alt='safe' /> <span>Safe & Secured</span></div>
                </>
                }
            </div>
    </div>
  )
}


const PayWithEmi = ({selectedPaymentMethod="",onSelectedPaymentMethod={}}) =>{

  return(
    <div className={styles.payWithEmi}>
      <div className={styles.headerContainer}>
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/payment.png' alt=''/>
        <div className={styles.txt}>Pay with Emi</div>
      </div>
      <div className={styles.paymentOptionsList}>
          <div className={styles.paymentOptionItem} onClick={()=> onSelectedPaymentMethod("TAMARA")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tamaraLogo.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Just pay AED 20 now</div>
                   <div className={styles.subTxt}>Rest in 2 interest free payments of AED 20</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'TAMARA'}/>
          </div>
          <div className={styles.paymentOptionItem} onClick={()=>onSelectedPaymentMethod("TABBY")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tabby.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Just pay AED 20 now</div>
                   <div className={styles.subTxt}>Rest in 2 interest free payments of AED 20</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'TABBY'}/>
          </div>
          <div className={styles.paymentOptionItem} onClick={()=>onSelectedPaymentMethod("TAP")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tabby.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Just pay AED 20 now</div>
                   <div className={styles.subTxt}>Rest in 2 interest free payments of AED 20</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'TAP'}/>
          </div>
      </div>
    </div>
  )
}



export default function PaymentMethod({selectedPaymentMethod="",onSelectedPaymentMethod={},onPayment={}}) {




  
      return (
        <div className={styles.paymentMethodWrapper}>
            <div className={styles.headerTxt}>Payment Method</div>
            <div className={styles.headerSubTxt}>Shop with confidence knowing all transactions are securely encrypted for your protection.</div>
            <CardOption selectedPaymentMethod={selectedPaymentMethod} onSelectedPaymentMethod={onSelectedPaymentMethod} onPayment={(data)=>onPayment(data)}/>
            <PayWithEmi selectedPaymentMethod={selectedPaymentMethod} onSelectedPaymentMethod={onSelectedPaymentMethod}/>
        </div>
      )
    }
    