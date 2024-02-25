'use client'

import React,{useState,useEffect} from "react"
import style from "./productSection.module.scss"
import ProductCard from "@/components/ProductCard/ProductCard"
import Loader from "@/components/Loader/Loader"
import { addToCart } from "@/services"
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import { mappingDealProducts } from "@/services"

const ProductSection = ({ resposneValue = [] ,isDealPage }) => {
    const [isLodaing, setIsLoading] = useState(false);
    const clevertapEvent = useCleverTapEvents();
    let trackData={};
    const [remainingDays, setRemainingDays] = useState("")
    const [remainingHour, setRemainingHour] = useState("")
    const [remainingMin, setRemainingMin] = useState("")
    const [remainingSec, setRemainingSec] = useState("")

    const [timer, setTimer] = useState(0); 
    const onAddToCart = async (data) => {
        try {
            setIsLoading(true)
            const res = await addToCart(data);
            setIsLoading(false)
            clevertapEvent.onCleverTapEvent("kuwa_add_to_cart", trackData);
            window.location.href = '/cart';
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
        }
    }
    let currentTimerValue = resposneValue[0]?.currentTimerValue

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
    if (resposneValue && resposneValue.length > 0) {
        return (
            <div className={style.productSectionContainer}>
        {isDealPage  &&
              <div className={style.headingContent}>
              <div className={style.dealHeading}>{resposneValue[0]?.dealHeading}</div>
              {resposneValue[0]?.isTimerActive
               && 
               resposneValue[0]?.currentTimeStatus == "in-between" 
               && 
              (
                  <div className={style.timeDurationDiv}>
                      <div className={style.timeTxt}>Valid till</div>
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
                        const cardData = mappingDealProducts(item);
                        // console.log("allProduct",cardData)
                        const productName = cardData.productName;
                        const productId = cardData.productId;
                        const dealId = cardData.dealId;
                        const variantId = cardData.variantId;
                        const isVariant = variantId ? true : false;
                        const dealPrice = cardData.dealFinalPrice
                         trackData = {
                            "product Name": productName,
                            "quantity": 1,
                            "product Id": productId,
                        }
                        return (
                            <div className={style.product}>
                                <ProductCard style={{width:'unset'}} key={index} cardData={cardData} addToCart={() => onAddToCart({ product: productId, quantity: 1,dealId:dealId,variantId:variantId,isVariant,dealPrice:dealPrice })} />
                            </div>
                        )
                    })}
                </div>
                <Loader isShow={isLodaing} />
            </div>
        )
    } else {
        return <></>
    }
}
export default ProductSection
