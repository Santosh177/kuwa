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

const CardOption = ({selectedPaymentMethod="",onSelectedPaymentMethod={},onPayment={} , isCheckoutCard=false , isTapCard=false}) => {

  const [ isShowCard , setIsShowCard] = useState(false)

  return(
    <div className={styles.creditCardOption}>
        <div className={styles.paymentTypeHeaderTxt}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
                <div className={styles.txt}>Pay with Credit or Debit card</div>
            </div>
            <div className={styles.paymentInfoWrapper} >
              <div className={styles.paymentInfoContainer} onClick={(e)=>{
                if(isCheckoutCard){
                  setIsShowCard(!isShowCard)
                  onSelectedPaymentMethod("CHECKOUT_CARD")
                }else if(isTapCard){
                  onSelectedPaymentMethod("TAP")
                }
               
            } }>
                <div className={styles.paymentInfo}>
                    <img className={styles.visa} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/visa.png'/>
                    <img className={styles.masterCard} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/mastercard.png' />
                  </div>
                  <CheckBox isChecked={selectedPaymentMethod === "CHECKOUT_CARD" || selectedPaymentMethod==="TAP"} />
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


const PayWithEmi = ({selectedPaymentMethod="",onSelectedPaymentMethod={}, isTamara=false,isTabby=false}) =>{

  return(
    <div className={styles.payWithEmi}>
      <div className={styles.headerContainer}>
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
        <div className={styles.txt}>Pay with Emi</div>
      </div>
      <div className={styles.paymentOptionsList}>
          {isTamara && <div className={styles.paymentOptionItem} onClick={()=> onSelectedPaymentMethod("TAMARA")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tamaraLogo.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Just pay AED 20 now</div>
                   <div className={styles.subTxt}>Rest in 2 interest free payments of AED 20</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'TAMARA'}/>
          </div>}
         {isTabby && <div className={styles.paymentOptionItem} onClick={()=>onSelectedPaymentMethod("TABBY")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tabby.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Just pay AED 20 now</div>
                   <div className={styles.subTxt}>Rest in 2 interest free payments of AED 20</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'TABBY'}/>
          </div>}
         
      </div>
    </div>
  )
}

const OtherPaymentMethod = ({selectedPaymentMethod="",onSelectedPaymentMethod={}}) => {
  return(
  <div className={styles.payWithEmi}>
      <div className={styles.headerContainer}>
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
        <div className={styles.txt}>Other payment option</div>
      </div>
      <div className={styles.paymentOptionsList}>
          <div className={styles.paymentOptionItem} onClick={()=> onSelectedPaymentMethod("APPLE_PAY")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/apple_pay.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Apple Pay</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'APPLE_PAY'}/>
          </div>
          <div className={styles.paymentOptionItem} onClick={()=>onSelectedPaymentMethod("COD")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cash_on_delivery.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Cash on delivery</div>
                   <div className={styles.subTxt}>Pay when you receive your order</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'COD'}/>
          </div>
      </div>
    </div>
    )
}


const getPaymentOption = (paymentModes=[], data={}) => {
  let paymentOptionStatus = false
  for (const index in paymentModes) {
    const { paymentMode = "", paymentGateway="" } = paymentModes[index] || {};
    if(paymentMode == data.paymentMode && paymentGateway == data.paymentGateway){
      paymentOptionStatus = true;
      break;
    }
  }
  return paymentOptionStatus;
}



export default  function PaymentMethod({selectedPaymentMethod="",onSelectedPaymentMethod={},onPayment={},paymentModes=[]}) {


    const isCheckoutCard = getPaymentOption(paymentModes,{"paymentMode":"CARD","paymentGateway":"CHECKOUT"});
    const isTapCard = getPaymentOption(paymentModes,{"paymentMode":"CARD","paymentGateway":"TAP"});
    const isTamara =  getPaymentOption(paymentModes,{"paymentMode":"TAMARA","paymentGateway":"TAMARA"});
    const isTabby =  getPaymentOption(paymentModes,{"paymentMode":"TABBY","paymentGateway":"TABBY"});
    const isApplePayCheckout =  getPaymentOption(paymentModes,{"paymentMode":"APPLE_PAY","paymentGateway":"CHECKOUT"});
    const isApplePayTap =  getPaymentOption(paymentModes,{"paymentMode":"APPLE_PAY","paymentGateway":"TAP"});

  
      return (
        <div className={styles.paymentMethodWrapper}>
            <div className={styles.headerTxt}>Payment Method</div>
            <div className={styles.headerSubTxt}>Shop with confidence knowing all transactions are securely encrypted for your protection.</div>
          {(isCheckoutCard || isTapCard) &&<CardOption isCheckoutCard={isCheckoutCard} isTapCard={isTapCard} selectedPaymentMethod={selectedPaymentMethod} onSelectedPaymentMethod={onSelectedPaymentMethod} onPayment={(data)=>onPayment(data)}/>}
          { (isTamara || isTabby) && <PayWithEmi isTamara={isTamara} isTabby={isTabby} selectedPaymentMethod={selectedPaymentMethod} onSelectedPaymentMethod={onSelectedPaymentMethod}/>}
            <OtherPaymentMethod isApplePayCheckout={isApplePayCheckout} isApplePayTap={isApplePayTap}  selectedPaymentMethod={selectedPaymentMethod} onSelectedPaymentMethod={onSelectedPaymentMethod} />
        </div>
      )
    }
    