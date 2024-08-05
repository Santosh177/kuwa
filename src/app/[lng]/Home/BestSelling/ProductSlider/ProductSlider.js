'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/app/[lng]/components/Loader/Loader';
import ProductCard from '@/app/[lng]/components/ProductCard/ProductCard';
import { addToCart,addGoogleEvent} from '@/services'
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import NotifyEmailPopup from '@/app/[lng]/components/NotifyEmailPopup/NotifyEmailPopup';
import NotifySuccessPopup from '@/app/[lng]/components/NotifySuccessPopup/NotifySuccessPopup';
import { useAuth } from '@/context/userDetail';
import { mixPanelTrackEvent } from '../../../../[lng]/page'


const ProductSlider = ({data}) => {
  const router = useRouter();
  const { product = [], headerTitle = "" } = data || {};
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(0);

  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const [emailId,setEmailId] = useState("")
  const [nonloginProductId,setNonLoginProductId] = useState("");
  const [nonLoginVariantId,setNonLoginVariantId] = useState("");
  const [isShowNotifySuccessPopup, setIsShowNotifySuccessPopup] = useState(false);
  const [isShowNotifyEmailPopup, setIsShowNotifyEmailPopup] = useState(false);
  const clevertapEvent = useCleverTapEvents();
  const handleResize = () => setWidth(window.innerWidth);

  const { isLogin=false ,userData = {}} = useAuth();
  const emailAddress = userData && userData.emailAddress;
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);



  let trackData = {};
  const onAddToCart = async (data) => {
    const trackingData = {
      "product Name": data.productName,
      "quantity": 1,
      "product Id":data.product
    }
    try {
      setIsLoading(true);
      const res = await addToCart(data);
      addGoogleEvent(trackingData)
      setIsLoading(false);
      clevertapEvent.onCleverTapEvent("kuwa_add_to_cart", trackData);
      if(isLogin){
        mixPanelTrackEvent("kuwa_add_to_cart",trackingData,userData.id )
       }
       else{
        mixPanelTrackEvent("kuwa_add_to_cart",trackingData )
       }
      window.location.href = '/cart';
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
    }
  }

  
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
  return (
    <>
    <div className={styles.container}>
    <div className={styles.sliderContainer}>
          <Glider
           hasArrows={(width>990)}
            slidesToShow={4.5}
            slidesToScroll={4}
            // hasDots={width > 990}
            draggable
            gap={20}
            exactWidth={true}
            itemWidth={(width > 990) ? 204 : 138}
            iconLeft={
              <img style={{ width: 38, height: 64, }} src='https://d25uasl7utydze.cloudfront.net/assets/left.png' alt='left-icon' />
            }
            iconRight={
              <img style={{ width: 38, height: 64, }} src='https://d25uasl7utydze.cloudfront.net/assets/right.png' alt='right-icon' />
            }
          >
            {
              product.map((data, index) => {

               const {
                image= "",
                id= "",
                title="",
                name= "",
                nameArabic= "",
                countDownStartsAt="",
                countDownEndsAt="",
                dealId="",
                dealListPrice="",
                dealDiscountPrice="",
                dealFinalPrice= "",
                dealInventory="",
                rank="",
                seoUrl="",
                productListPrice= "",
                productFinalPrice = "",
                productDiscount = "",
                normalInventory = "",
                variantId="",
                variantName = "",
                variantImage = "",
                variantListPrice = "",
                variantFinalPrice = "",
                variantDiscount = "",
                isDealActive="",
                isTimerActive="",
                dealTag="",
                dealTagArabic="",
                dealIconUrl="",
                currentTimerStatus="",
                currentTimerValue="",
                currentDateTime=""} = data || {}

                console.log("dealData",data)
                const { finalPrice = "", retailPrice = "", currency = "", discount = "", discountType = "" } = data && data?.price || {}
                let cardData = {}
                if(dealId && isDealActive && isTimerActive &&  currentTimerStatus == "in-between"){
                   cardData={
                    "dealId":dealId || "",
                    "id":id || "",
                    "productName":name,
                    "productNameArabic":nameArabic,
                    "productImage":image || "",
                    "seoUrl":seoUrl || "",
                    "dealListPrice":dealListPrice,
                  'dealFinalPrice':dealFinalPrice,
                  'discountType':"fixed",
                  "dealDiscountPrice":dealDiscountPrice || 0,
                  "currency":currency,
                  "dealInventory":dealInventory,
                  "tag":dealTag,
                  "tagArabic":dealTagArabic,
                  "tagIconUrl":dealIconUrl,
                  "isDealActive":isDealActive,
                  "isTimerActive":isTimerActive,
                  "currentTimerStatus":currentTimerStatus,
                  "currentTimerValue":currentTimerValue,
                  "currentDateTime":currentDateTime,
                  "normalInventory":normalInventory
                  }
                }
                else{

                
                 cardData = {
                  "productName": data && data.name || "",
                  "productNameArabic":data && data.nameArabic || "",
                  "finalPrice": finalPrice,
                  "retailPrice": retailPrice,
                  "currency": currency,
                  "discount": discount,
                  "discountType": discountType,
                  "image": data?.image || "",
                  "id": data?.id || "",
                  "seoUrl": data?.seoUrl || "",
                  "normalInventory":normalInventory
                }
              }
                trackData = {
                  "product Name": data && data.name,
                  "quantity": 1,
                  "product Id": data?.id,
                }
               let addToCartPayload={}
               if(dealId && isDealActive && isTimerActive &&  currentTimerStatus == "in-between"){
                addToCartPayload = { product: data.id, quantity: 1,dealId:data.dealId,dealPrice:data.dealFinalPrice,productName:data.name }
              }
               else{
                addToCartPayload = { product: data.id, quantity: 1,productName:data.name}
               }
                return (
                  <ProductCard key={index} cardData={cardData} addToCart={() => onAddToCart(addToCartPayload)} handleNotifyMe={()=>handleNotifyMe(id)} handleNonLogin={()=>handleNonLogin(id)} />
                )
              })
            }
          </Glider>
        </div>
        </div>
        <div className={styles.NotifySuccessPopup}>{isShowNotifySuccessPopup && <NotifySuccessPopup setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}/>}</div>
          <div>{isShowNotifyEmailPopup && <NotifyEmailPopup setIsShowNotifyEmailPopup={setIsShowNotifyEmailPopup} setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}  emailId={emailId} setEmailId={setEmailId} handleNotify={handleNotify}/>}</div>
         <Loader isShow={isLoading} />
        </>
  )
}

export default ProductSlider