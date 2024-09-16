'use client'

import React,{useState,useEffect} from "react"
import style from "./productSection.module.scss"
import ProductCard from "@/app/[lng]/components/ProductCard/ProductCard"
import Loader from "@/app/[lng]/components/Loader/Loader"
import { addToCart, addGoogleEvent } from "@/services"
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import { mappingDealProducts ,mappingHomeSearchDealProducts } from "@/services"
import { mixPanelTrackEvent } from "@/app/[lng]/page"
import { useAuth } from "@/context/userDetail"
import { useLanguage } from "@/context/languageDetails"
import NotifyEmailPopup from "@/app/[lng]/components/NotifyEmailPopup/NotifyEmailPopup"
import NotifySuccessPopup from "@/app/[lng]/components/NotifySuccessPopup/NotifySuccessPopup"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import DescriptionSection from "../descriptionSection/DescriptionSection"


const ProductSection = ({ resposneValue = [] ,isDealPage , description=null}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    // console.log("resposneValue",resposneValue[0])
    // console.log("ahavha",isDealPage)
    const [isLodaing, setIsLoading] = useState(false);
    const clevertapEvent = useCleverTapEvents();
    const {isLogin=false, userData={}} = useAuth();
    let trackData={};
    const [remainingDays, setRemainingDays] = useState("00")
    const [remainingHour, setRemainingHour] = useState("00")
    const [remainingMin, setRemainingMin] = useState("00")
    const [remainingSec, setRemainingSec] = useState("00")

    const [isShowNotifySuccessPopup, setIsShowNotifySuccessPopup] = useState(false);
    const [isShowNotifyEmailPopup, setIsShowNotifyEmailPopup] = useState(false);
    const [emailId,setEmailId] = useState("")
    const [nonloginProductId,setNonLoginProductId] = useState("");
    const [nonLoginVariantId,setNonLoginVariantId] = useState("");
    const emailAddress = userData && userData.emailAddress;
    const [timer, setTimer] = useState(0); 
    const searchParams = useSearchParams();
    const searchKey = searchParams.get('search_key') || "";
    console.log("searchKey",searchKey)
    const onAddToCart = async (data) => {
        // const trackingData = {
        //     "product Name": data.productName,
        //     "quantity": 1,
        //     "product Id":data.product,
        //     "Page URL":window.location.href,
        //     "Screen":"Collection"
        //   }
        try {
            setIsLoading(true)
            const res = await addToCart(data);
            addGoogleEvent(trackData)
            setIsLoading(false)
            clevertapEvent.onCleverTapEvent("kuwa_add_to_cart", trackData);
            if(isLogin){
                mixPanelTrackEvent("kuwa_add_to_cart",trackData,userData.id )
               }
               else{
                mixPanelTrackEvent("kuwa_add_to_cart",trackData )
               }
            window.location.href = '/cart';
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
        }
    }
    let currentTimerValue = resposneValue[0]?.currentTimerValue
    // console.log("currentTimerValue", currentTimerValue)
    useEffect(() => {
        if (currentTimerValue) {
          const data = currentTimerValue.match(/\d+/g); // Extract digits from the string
          const [days, hours, minutes] = data && data.length === 3 ? data.map(Number) : [0, 0, 0];
          const totalSeconds = days * 24 * 3600 + hours * 3600 + minutes * 60;
          setTimer(totalSeconds);
        } else {
          setTimer(0);
        }
      }, [currentTimerValue]);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
          if(timer > 0) {
              setTimer(prevTimer => prevTimer - 1);
          }
      
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [timer]);

  useEffect(() => {
    if (timer === 1) {
      
        window.location.reload();
      }
    if (timer > 0) {
        const days = Math.floor(timer / (24 * 3600));
        const hours = Math.floor((timer % (24 * 3600)) / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        setRemainingDays(days.toString().padStart(2, '0'));
        setRemainingHour(hours.toString().padStart(2, '0'));
        setRemainingMin(minutes.toString().padStart(2, '0'));
        setRemainingSec(seconds.toString().padStart(2, '0'));
    }
}, [timer]);

const handleNonLogin = (id,variantId)=>{
    console.log("id, variantId", id, variantId);
     setIsShowNotifyEmailPopup(true);
     setNonLoginProductId(id);
     setNonLoginVariantId(variantId);
  }
  
  const handleNotify = async() =>{
    const payload={
         productId:nonloginProductId|| null,
         variantId:nonLoginVariantId || null,
         email: emailId 
       }
       try {
        setIsLoading(true)
         const res = await fetch(`/api/out-of-stock`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(payload),
         });
         if(res.status == 200){
          setIsLoading(false)
           setIsShowNotifySuccessPopup(true);
         }
         else{
          setIsLoading(false)
          console.log(error)
         }
         
         
       } catch (error) {
        setIsLoading(false)
         console.error('Error:', error);
       }
     }
  
     const handleNotifyMe = async(productId, variantId)=>{
      console.log("variantId",variantId)
      const payload={
        productId:productId || null,
        variantId:variantId || null,
        email: emailAddress 
      }
      try {
        setIsLoading(true)
        const res = await fetch(`/api/out-of-stock`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if(res.status == 200){
          setIsLoading(false)
          setIsShowNotifySuccessPopup(true);
        }
        else{
          setIsLoading(true)
          console.log(error)
        }
       
        
      } catch (error) {
        setIsLoading(false)
        console.error('Error:', error);
      }
    }
    if (resposneValue && resposneValue.length > 0) {
        return (
            <>
            <div  className={style.productSectionContainer}>
        {isDealPage  &&
              <div className={style.headingContent}>
              <div className={style.dealHeading}>{isArabic ? resposneValue[0]?.dealHeadingArabic : resposneValue[0]?.dealHeading}</div>
              {resposneValue[0]?.isTimerActive
               && 
               resposneValue[0]?.currentTimerStatus == "in-between" 
               && 
              (
                  <div className={style.timeDurationDiv}>
                      <div className={style.timeTxt}>{isArabic ? "صالح حتى" : "Valid till"}</div>
                      <div className={style.dealTimeDuration}>
                          <div className={style.timerDiv}>{remainingDays}d</div>
                          <div className={style.timerDiv}>{remainingHour}h</div>
                          <div className={style.timerDiv}>{remainingMin}m</div>
                          <div className={style.timerDiv}>{remainingSec}s</div>
                      </div>
                  </div>
              )}
              </div>}
                <div className={style.allProduct}>
                    {resposneValue.map((item, index) => {
                        // const { id = '', image = '', name = '', price = {}, seoUrl = '', title = '' } = item || {};
                        // const { finalPrice = '', retailPrice = '', currency = '', discount = '', discountType = '' } = price || {}
                        // const cardData = {
                        //     productName: name,
                        //     finalPrice: finalPrice,
                        //     retailPrice: retailPrice,
                        //     currency: currency,
                        //     discount: discount,
                        //     discountType: discountType,
                        //     image: image || "",
                        //     id: id || "",
                        //     seoUrl:seoUrl || ""
                        // }
                        const cardData = mappingHomeSearchDealProducts(item);
                        console.log("allProduct",cardData)
                        const productName = cardData.productName;
                        const productId = cardData.id;
                        const dealId = cardData.dealId;
                        const variantId = cardData.variantId;
                        const isVariant = variantId ? true : false;
                        const dealPrice = cardData.dealFinalPrice
                         trackData = {
                            "product Name": productName,
                            "quantity": 1,
                            "product Id": productId,
                            "Page URL":window.location.href,
                            "Screen":"Collection"
                        }
                        return (
                            <div className={style.product}>
                                <ProductCard style={{width:'unset'}} key={index} cardData={cardData} addToCart={() => onAddToCart({ product: productId, quantity: 1,dealId:dealId,variantId:variantId,isVariant,dealPrice:dealPrice,productName })} handleNotifyMe={()=>handleNotifyMe(productId,variantId)} handleNonLogin={()=>handleNonLogin(productId,variantId)} searchKey={searchKey} />
                            </div>
                        )
                    })}
                </div>
                <DescriptionSection description={description} />

                <Loader isShow={isLodaing} />
            </div>
                    <div style={{position:"absolute"}} className={style.NotifySuccessPopup}>{isShowNotifySuccessPopup && <NotifySuccessPopup setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}/>}</div>
                    <div style={{position:"absolute"}}>{isShowNotifyEmailPopup && <NotifyEmailPopup setIsShowNotifyEmailPopup={setIsShowNotifyEmailPopup} setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}  emailId={emailId} setEmailId={setEmailId} handleNotify={handleNotify}/>}</div>
                    </>
        )
    } else {
        return <></>
    }
}
export default ProductSection
