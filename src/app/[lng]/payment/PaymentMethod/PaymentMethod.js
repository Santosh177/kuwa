'use client';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import CheckoutFrames from '../components/CheckoutFrames/CheckoutFrames';
import { usePaymentPageData } from '@/context/payment';
import styles from './payment-method.module.scss';
import { useEffect, useState } from 'react';
import { useCountry } from '@/context/contryDetails';
import { useLanguage } from '@/context/languageDetails';


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

const CardOption = ({cardConfig={},isCheckoutCard=false , isTapCard=false,onPayment={}}) => {
  const {selectedPaymentMethod , setSelectedPaymentMethod} = usePaymentPageData();
  const [ isShowCard , setIsShowCard] = useState(false);
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const { selectedCountry={} } = useCountry();
  const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";

  useEffect(()=>{
    const isShowCard = (selectedPaymentMethod === "CHECKOUT_CARD" )
    if(!isShowCard)
    setIsShowCard(false);
  },[selectedPaymentMethod])
  
  return(
    <div className={styles.creditCardOption}>
        <div className={styles.paymentTypeHeaderTxt}>
                <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
                <div className={styles.txt}>{isArabic ? "الدفع ببطاقة الائتمان أو بطاقة الخصم" : "Pay with Credit card or Debit card"}</div>
            </div>
            <div className={styles.paymentInfoWrapper} >
            <div className={`${styles.prepaidDiscountInfo} ${isArabic ? styles['prepaidDiscountInfo-ar'] : styles['prepaidDiscountInfo-en']}` }>{isArabic ? "إضافي" : "Extra"} {prePaidDiscount}{isArabic ? "% خصم" : "% OFF"}</div>
            
              <div className={styles.paymentInfoContainer} onClick={(e)=>{
                if(isCheckoutCard){
                  setIsShowCard(true)
                  setSelectedPaymentMethod("CHECKOUT_CARD")
                }else if(isTapCard){
                  setSelectedPaymentMethod("TAP")
                }
            } }>
                <div className={styles.paymentInfo}>
                    <img className={styles.visa} src='https://d25uasl7utydze.cloudfront.net/assets/visa.png'/>
                    <img className={styles.masterCard} src='https://d25uasl7utydze.cloudfront.net/assets/master.png' />
                    <img className={styles.discover} src='https://d25uasl7utydze.cloudfront.net/assets/discover.png'/>
                    <img className={styles.jcb} src='https://d25uasl7utydze.cloudfront.net/assets/jcb.png'/>
                    <img className={styles.americanExpress} src='https://d25uasl7utydze.cloudfront.net/assets/amex.png'/>
                    <img className={styles.payLogo} src='https://d25uasl7utydze.cloudfront.net/assets/pay.png'/>

                  </div>
                  <CheckBox isChecked={selectedPaymentMethod === "CHECKOUT_CARD" || selectedPaymentMethod==="TAP"} />
              </div>
                {isShowCard && 
                <><CheckoutFrames publicKey ={cardConfig.publicKey || ""} onPayment={(data)=>onPayment(data)}/>
                <div className={styles.security}><img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/security.png' alt='safe' /> <span>{isArabic ? "آمن ومضمون" : "Safe & Secured"}</span></div>
                </>
                }
            </div>
    </div>
  )
}


const PayWithEmi = ({ paymentMethodConfig={}, isTamara=false,isTabby=false,price=0,onPayment={}}) =>{
  const {selectedPaymentMethod , setSelectedPaymentMethod} = usePaymentPageData();
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const { selectedCountry={} } = useCountry();
  const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";
  const currency =  selectedCountry.currency || ""
  const { maxLimit:tamaraMaxLimit,minLimit:tamaraMinLimit,installment:tamaraInstallment } = paymentMethodConfig && paymentMethodConfig['tamara'] || {};

  const splittedPrice = (parseFloat(price) / tamaraInstallment).toFixed(2);
  const isShow = (parseFloat(price) > 0)&&(parseFloat(price) >= parseFloat(tamaraMinLimit)) && (parseFloat(price) <= parseFloat(tamaraMaxLimit));
  
  const tabbyInstallment = 4;
  const tabbyMinLimit = 10;
  const tabbyMaxLimit = 2000;

  const splittedPriceTabby = (parseFloat(price) / tabbyInstallment).toFixed(2);
  const isShowTabby = (parseFloat(price) > 0)&&(parseFloat(price) >= parseFloat(tabbyMinLimit)) && (parseFloat(price) <= parseFloat(tabbyMaxLimit));
  

  if((isTamara && isShow) || (isTabby && isShowTabby) ){
    return(
      <div className={styles.payWithEmi}>
        <div className={styles.headerContainer}>
          <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
          <div className={styles.txt}>{isArabic ? "الدفع بالتقسيط" : "Pay by installment"}</div>
        </div>
        <div className={styles.paymentOptionsList}>
        <div className={`${styles.prepaidDiscountInfo} ${isArabic ? styles['prepaidDiscountInfo-ar'] : styles['prepaidDiscountInfo-en']}` }>{isArabic ? "إضافي" : "Extra"} {prePaidDiscount}{isArabic ? "% خصم" : "% OFF"}</div>

            {(isTamara && isShow) && <div className={styles.paymentOptionItem} onClick={()=> setSelectedPaymentMethod("TAMARA")}>
                <div className={styles.paymentOptionInfo}>
                  <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tamaraLogo.png' alt='logo'/>
                  <div className={styles.desc}>
                    <div className={styles.txt}>{isArabic ? "ادفع فقط" : "Just pay"} {currency} {splittedPrice} {isArabic ?  "الآن" : "now"}</div>
                    <div className={styles.subTxt}>{isArabic ? "الباقي في" : "Rest in"} {tamaraInstallment - 1} {isArabic ?  "دفعات بدون فوائد من" : "interest free payments of"} {currency} {splittedPrice}</div>
                  </div>
                </div>
                <CheckBox  isChecked={selectedPaymentMethod === 'TAMARA'}/>
            </div>}
          {(isTabby && isShowTabby) && <div className={styles.paymentOptionItem} onClick={()=>setSelectedPaymentMethod("TABBY")}>
                <div className={styles.paymentOptionInfo}>
                  <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/tabby.png' alt='logo'/>
                  <div className={styles.desc}>
                    <div className={styles.txt}>{isArabic ? "ادفع فقط" : "Just pay"} {currency} {splittedPriceTabby} {isArabic ?  "الآن" : "now"}</div>
                    <div className={styles.subTxt}>{isArabic ? "الباقي في" : "Rest in"} {tabbyInstallment - 1}  {isArabic ?  "دفعات بدون فوائد من" : "interest free payments of"} {currency} {splittedPriceTabby}</div>
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
  const { selectedCountry={} } = useCountry();
  const codCharge = selectedCountry.codCharge || 0;
  const currency =  selectedCountry.currency || ""
  console.log("codCharge",codCharge)
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();



  return(
  <div className={styles.payWithEmi}>
      <div className={styles.headerContainer}>
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/paymentheaderimg.png' alt=''/>
        <div className={styles.txt}>{isArabic ? "خيارات دفع أخرى" : "Other Payment Options"}</div>
      </div>
      <div className={styles.paymentOptionsList}>
         {isApplePay && <div className={styles.paymentOptionItem} onClick={()=> setSelectedPaymentMethod("APPLE_PAY")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/apple_pay.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>{isArabic ? "أبل باي" : "Apple Pay"}</div>
                </div>
              </div>
              <CheckBox  isChecked={selectedPaymentMethod === 'APPLE_PAY'}/>
          </div>}
          <div className={styles.paymentOptionItem} onClick={()=>setSelectedPaymentMethod("COD")}>
              <div className={styles.paymentOptionInfo}>
                <img className={styles.paymentOptionLogo} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/cash_on_delivery.png' alt='logo'/>
                <div className={styles.desc}>
                   <div className={styles.txt}>{isArabic ? "الدفع عند الاستلام" : "Cash On Delivery"}</div>
                  {codCharge > 0 ? <div className={styles.codChargeTxt}>{isArabic ?  "إضافي" : "Additional"} {codCharge} {currency} {isArabic ? "رسوم مطبقة على الدفع عند الاستلام" : "fee applicable on COD"}</div> : <div className={styles.subTxt}>{isArabic ? "ادفع عند استلام طلبك" : "Pay when you receive your order"}</div> } 
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
    const isApplePay =  false
    const isCod =  paymentMethodConfig['cod']['isEnable'];
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


   
      return (
        <div className={styles.paymentMethodWrapper}>
            <div className={styles.headerTxt}>{isArabic ? "طرق الدفع" : "Payment Methods"}</div>
            <div className={styles.headerSubTxt}>{isArabic ? "تسوق بثقة، جميع المعاملات مشفرة بأمان لحمايتك." :"Shop with confidence knowing all transactions are securely encrypted for your protection."}</div>
            {(isCheckoutCard || isTapCard) &&<CardOption cardConfig={paymentMethodConfig['card_checkout']}  isCheckoutCard={isCheckoutCard} isTapCard={isTapCard} onPayment={onPayment} />}
            {(isTamara || isTabby) && <PayWithEmi paymentMethodConfig={paymentMethodConfig} price={price} isTamara={isTamara} isTabby={isTabby}  />}
            {(isApplePay || isCod) && <OtherPaymentMethod isApplePay={isApplePay} isCod={isCod}  />}
        </div>
      )
    }
    