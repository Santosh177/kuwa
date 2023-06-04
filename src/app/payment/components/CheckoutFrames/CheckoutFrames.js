'use client';
import React,{useState,useEffect} from 'react';
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import styles from './checkout-frames.module.scss';

export default function CheckoutFrames({onPayment}) {
      const [isDomReady , setDomReady ] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [isCardNumValid ,setIsCardNumValid ]= useState(false);
      const [isExpiryValid ,setIsExpiryValid ]= useState(false);
      const [isCvvValid ,setIsCvvValid ]= useState(false);
      const [isTrigged, setIsTriggered] = useState(false);
      const [currency, setCurrency] = useState("");
     
  

      const PUBLIC_KEY = 'pk_sbox_y4kryfiio2emn57e2pdayxfpre5';


      const cvvTxt = "Security code";
      const placeHolderExpiryDate = "MM";
      const placeholderExpiryYY = "YY";
    
  
      return (
        <div className={styles['checkout-frames-wrapper']}>
             <Frames
        config={{
            debug: true,
            publicKey: PUBLIC_KEY,
            localization: {
                cardNumberPlaceholder: 'Card number',
                expiryMonthPlaceholder: `${placeHolderExpiryDate}    `,
                expiryYearPlaceholder: `    ${placeholderExpiryYY}`,
                cvvPlaceholder: cvvTxt,
            },
            style: {
                base: {
                    fontSize: '14px',
                    letterSpacing: '0.5px',
                    fontWeight:'400',
                    height:'48px',
                    fontWeight: 500
                },
                placeholder:{
                    base:{
                      fontSize: '14px',
                      fontWeight: 500,
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
        cardTokenized={(e) => {
          console.log("TOKENN",e.token)
          onPayment({token:e.token})
      }}
        cardTokenizationFailed={(e) => {}}
        cardBinChanged={(e) => {}}
    >
      <div  className={styles['checkout-frames-container']}>
        <div  className={styles['checkout-frame-details']}>
        <div  className={styles['frames-card-number-container']} style={(isDomReady)?{}:{width:'366px'}}>
          <CardNumber placeholder="Card number" style={{height:'48px'}} />
        </div>
        <div  className={styles['frames-card-details-container']}>
            <div className={styles['frames-expiry-date-container']}>
              <ExpiryDate style={{height:'48px'}}  />
            </div>
            <div  className={styles['frames-cvv-container']}>
              <Cvv style={{height:'48px'}} />
            </div>
        </div>
        </div>
      </div>
    </Frames>
        </div>
      )
    }
    