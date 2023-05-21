'use client';
import React,{useState,useEffect} from 'react';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import styles from './checkout-frames.module.scss';

export default function CheckoutFrames() {
      const [isDomReady , setDomReady ] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [isCardNumValid ,setIsCardNumValid ]= useState(false);
      const [isExpiryValid ,setIsExpiryValid ]= useState(false);
      const [isCvvValid ,setIsCvvValid ]= useState(false);
      const [isTrigged, setIsTriggered] = useState(false);
      const [currency, setCurrency] = useState("");
     
  

      const PUBLIC_KEY = 'pk_sbox_y4kryfiio2emn57e2pdayxfpre5';

      const cardNumber = "Card Number";
      const expiryDate="Expiry Date";
      const cvvTxt = "CVV";
      const placeHolderExpiryDate = "MM";
      const placeholderExpiryYY = "YY";
      const loadCheckoutScript = () => {
        let checkoutScript = document.createElement("script");
        checkoutScript.setAttribute("src", "https://cdn.checkout.com/js/framesv2.min.js");
        document.body.appendChild(checkoutScript);
      }
      useEffect(()=>{
        loadCheckoutScript()
        try{
          let contentElem = document.getElementsByClassName('content-wrap');
          if(contentElem && contentElem[0] ){
            contentElem[0].scrollIntoView()
          }
        }catch(e){
      
        }
        
      },[])
  
      return (
        <div className={styles['checkout-frames-wrapper']}>
             <Frames
        config={{
            debug: true,
            publicKey: PUBLIC_KEY,
            localization: {
                cardNumberPlaceholder: '**** **** **** ****',
                expiryMonthPlaceholder: `${placeHolderExpiryDate}    `,
                expiryYearPlaceholder: `    ${placeholderExpiryYY}`,
                cvvPlaceholder: cvvTxt,
            },
            style: {
                base: {
                    fontSize: '13px',
                    letterSpacing: '0.5px',
                    fontWeight:'400',
                },
                placeholder:{
                    base:{
                        fontSize: '12px',
                        opacity:'0.5',
                        letterSpacing: '0.5px',
                    }
                }
            },
        }}
        ready={() => {
            setDomReady(true)
        }}
        frameActivated={(e) => {
        }}
        frameFocus={(e) => {}}
        frameBlur={(e) => {}}
        frameValidationChanged={(data) => {
          const {element='',isValid = false } = data || {};
          if(element  === 'expiry-date'){
            setIsExpiryValid(isValid)
          }else if(element === "cvv"){
            setIsCvvValid(isValid)
          }else if(element === "card-number"){
            setIsCardNumValid(isValid)
          }
        }}
        paymentMethodChanged={(e) => {}}
        cardValidationChanged={(e) => {}}
        cardSubmitted={() => {}}
        cardTokenized={(data) => {
            // const { token =''} = data
            // orderPayment(token)
            // call place Order Api
            // placeOrder(token)
            // onCardPayment(token);
            // setIsLoading(false);

        }}
        cardTokenizationFailed={(e) => {}}
        cardBinChanged={(e) => {}}
    >
      <div  className={styles['checkout-frames-container']}>
        <div  className={styles['checkout-frame-details']}>
        <div  className={styles['frames-card-number-container']}>
          {/* <div  className={styles['card-number-txt']} >{cardNumber}</div> */}
          <CardNumber placeholder="ww**" />
        </div>
        <div  className={styles['frames-card-details-container']}>
            <div className={styles['frames-expiry-date-container']}>
              {/* <div  className={styles['card-number-txt']} >{expiryDate}</div> */}
              <ExpiryDate />
            </div>
            <div  className={styles['frames-cvv-container']}>
              {/* <div  className={styles['card-number-txt']} >{cvvTxt}</div> */}
              <Cvv/>
            </div>
        </div>
        </div>
      </div>
    </Frames>
        </div>
      )
    }
    