'use client';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import CheckoutFrames from '../components/CheckoutFrames/CheckoutFrames';
import { usePaymentPageData } from '@/context/payment';
import styles from './payment-method.module.scss';
import { useEffect, useState } from 'react';
import { useCountry } from '@/context/contryDetails';


const CheckBox = ({isChecked=false}) => {
  return(
    <div className={styles['payment-options-checkbox']}>
      <div className={styles['checkbox-container']}>
          {!isChecked?<span className={styles.checkmark}></span>:
          <img className={styles.checked}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/check_uncheck.png' alt='check'/>}
        </div>
    </div>
  )
}

const CardOption = ({isCheckoutCard=false , isTapCard=false,onPayment={}}) => {
  const {selectedPaymentMethod , setSelectedPaymentMethod} = usePaymentPageData();
  const [ isShowCard , setIsShowCard] = useState(false);

  useEffect(()=>{
    const isShowCard = (selectedPaymentMethod === "CHECKOUT_CARD" )
    if(!isShowCard)
    setIsShowCard(false);
  },[selectedPaymentMethod])
  
  return(
    <div className={styles.creditCardOption}>
        <div className={styles.paymentTypeHeaderTxt}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
                <div className={styles.txt}>Pay with Credit or Debit card</div>
            </div>
            <div className={styles.paymentInfoWrapper} >
              <div className={styles.paymentInfoContainer} onClick={(e)=>{
                if(isCheckoutCard){
                  setIsShowCard(true)
                  setSelectedPaymentMethod("CHECKOUT_CARD")
                }else if(isTapCard){
                  setSelectedPaymentMethod("TAP")
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


const PayWithEmi = ({ paymentMethodConfig={}, isTamara=false,isTabby=false,price=0,onPayment={}}) =>{
  const {selectedPaymentMethod , setSelectedPaymentMethod} = usePaymentPageData();
  const { selectedCountry={} } = useCountry();
  const currency =  selectedCountry.currency || ""
  const { maxLimit:tamaraMaxLimit,minLimit:tamaraMinLimit,installment:tamaraInstallment } = paymentMethodConfig && paymentMethodConfig['tamara'] || {};

  const splittedPrice = (parseFloat(price) / tamaraInstallment).toFixed(2);
  const isShow = (parseFloat(price) > 0)&&(parseFloat(price) >= parseFloat(tamaraMinLimit)) && (parseFloat(price) <= parseFloat(tamaraMaxLimit));
  
  const tabbyInstallment = 4;
  const tabbyMinLimit = 100;
  const tabbyMaxLimit = 2000;

  const splittedPriceTabby = (parseFloat(price) / tabbyInstallment).toFixed(2);
  const isShowTabby = (parseFloat(price) > 0)&&(parseFloat(price) >= parseFloat(tabbyMinLimit)) && (parseFloat(price) <= parseFloat(tabbyMaxLimit));
  

  if((isTamara && isShow) && (isTabby && isShowTabby) ){
    return(
      <div className={styles.payWithEmi}>
        <div className={styles.headerContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
          <div className={styles.txt}>Pay with Emi</div>
        </div>
        <div className={styles.paymentOptionsList}>
            {(isTamara && isShow) && <div className={styles.paymentOptionItem} onClick={()=> setSelectedPaymentMethod("TAMARA")}>
                <div className={styles.paymentOptionInfo}>
                  <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tamaraLogo.png' alt='logo'/>
                  <div className={styles.desc}>
                    <div className={styles.txt}>Just pay {currency} {splittedPrice} now</div>
                    <div className={styles.subTxt}>Rest in {tamaraInstallment - 1} interest free payments of {currency} {splittedPrice}</div>
                  </div>
                </div>
                <CheckBox  isChecked={selectedPaymentMethod === 'TAMARA'}/>
            </div>}
          {(isTabby && isShowTabby) && <div className={styles.paymentOptionItem} onClick={()=>setSelectedPaymentMethod("TABBY")}>
                <div className={styles.paymentOptionInfo}>
                  <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tabby.png' alt='logo'/>
                  <div className={styles.desc}>
                    <div className={styles.txt}>Just pay  {currency} {splittedPriceTabby} now</div>
                    <div className={styles.subTxt}>Rest in {tabbyInstallment - 1} interest free payments of {currency} {splittedPriceTabby}</div>
                  </div>
                </div>
                <CheckBox  isChecked={selectedPaymentMethod === 'TABBY'}/>
            </div>}
          
        </div>
      </div>
    )
  }else{
    return null;
  }
}

const OtherPaymentMethod = ({isApplePay="",isCod="",onPayment={}}) => {
  const {selectedPaymentMethod , setSelectedPaymentMethod} = usePaymentPageData();



  return(
  <div className={styles.payWithEmi}>
      <div className={styles.headerContainer}>
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
        <div className={styles.txt}>Other payment option</div>
      </div>
      <div className={styles.paymentOptionsList}>
         {isApplePay && <div className={styles.paymentOptionItem} onClick={()=> setSelectedPaymentMethod("APPLE_PAY")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/apple_pay.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>Apple Pay</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'APPLE_PAY'}/>
          </div>}
          <div className={styles.paymentOptionItem} onClick={()=>setSelectedPaymentMethod("COD")}>
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




export default  function PaymentMethod({paymentMethodConfig,price=0,onPayment={}}) {

    const isCheckoutCard = paymentMethodConfig['card_checkout']['isEnable'];
    const isTapCard = paymentMethodConfig['card_tap']['isEnable'];
    const isTamara =  paymentMethodConfig['tamara']['isEnable'];
    const isTabby =  paymentMethodConfig['tabby']['isEnable'];
    const isApplePay =  paymentMethodConfig['applePay']['isEnable'];
    const isCod =  paymentMethodConfig['cod']['isEnable'];

   
      return (
        <div className={styles.paymentMethodWrapper}>
            <div className={styles.headerTxt}>Payment Method</div>
            <div className={styles.headerSubTxt}>Shop with confidence knowing all transactions are securely encrypted for your protection.</div>
            {(isCheckoutCard || isTapCard) &&<CardOption isCheckoutCard={isCheckoutCard} isTapCard={isTapCard} onPayment={onPayment} />}
            {(isTamara || isTabby) && <PayWithEmi paymentMethodConfig={paymentMethodConfig} price={price} isTamara={isTamara} isTabby={isTabby}  />}
            {(isApplePay || isCod) && <OtherPaymentMethod isApplePay={isApplePay} isCod={isCod}  />}
        </div>
      )
    }
    