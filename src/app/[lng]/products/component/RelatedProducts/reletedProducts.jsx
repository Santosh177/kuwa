"use client"
import React, { useRef, useState } from "react"
import style from './relatedProduct.module.scss'
// import ProductCard from "@/app/[lng]/components/ProductCard/ProductCard"
import ProductCard from "@/app/[lng]/components/ProductCard/ProductCard"
// import Loader from "@/app/[lng]/components/Loader/Loader"
import Loader from "@/app/[lng]/components/Loader/Loader"
import { addToCart } from "@/services"
import useCleverTapEvents from "@/hooks/useCleverTapEvents"
// import { mixPanelTrackEvent } from "@/app/page"
import { mixPanelTrackEvent } from "@/app/[lng]/page"
import { useAuth } from "@/context/userDetail"
import { useLanguage } from "@/context/languageDetails"
import NotifyEmailPopup from "@/app/[lng]/components/NotifyEmailPopup/NotifyEmailPopup"
import NotifySuccessPopup from "@/app/[lng]/components/NotifySuccessPopup/NotifySuccessPopup"




const RelatedProducts = ({ productData = {} }) => {
    const { relatedProduct = [] } = productData || {};
    console.log("relatedProduct",relatedProduct)
    const [isLodaing, setIsLoading] = useState(false);
    const leftArrow = useRef(null);
    const clevertapEvent = useCleverTapEvents();
    const { isLogin=false ,userData = {}} = useAuth();
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


    
    const [emailId,setEmailId] = useState("")
    const [nonloginProductId,setNonLoginProductId] = useState("");
    const [nonLoginVariantId,setNonLoginVariantId] = useState("");
    const [isShowNotifySuccessPopup, setIsShowNotifySuccessPopup] = useState(false);
    const [isShowNotifyEmailPopup, setIsShowNotifyEmailPopup] = useState(false);

    const emailAddress = userData && userData.emailAddress;
    let trackData={}
    const onAddToCart = async (data) => {
        const trackingData = {
            "product Name": data.productName,
            "quantity": 1,
            "product Id":data.product
          }
        try {
            setIsLoading(true)
            const res = await addToCart(data);
            setIsLoading(false)
            clevertapEvent.onCleverTapEvent("kuwa_add_to_cart",trackData);  
            if(isLogin){
                mixPanelTrackEvent("kuwa_add_to_cart",trackingData,userData.id )
               }
               else{
                mixPanelTrackEvent("kuwa_add_to_cart",trackingData )
               }
            window.location.href = '/cart';
        } catch (error) {
            console.error('An unexpected error happened occurred:', error)
        }
    }
    const handelArrow = (shift) =>{
        leftArrow.current.scrollLeft += shift;
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

    if (relatedProduct && relatedProduct.length > 0) {
        return (
            <div className={style.relatedProductContiner}>
                <div className={style.relatedProduct}>
                    <div className={style.relatatedTxt}>{isArabic ? "منتجات ذات صلة" :"Related Products"}</div>
                    <div className={style.productContainer}>
                        <div className={`${style.leftArrow} ${isArabic ? style['leftArrow-ar'] : style['leftArrow-en']}` } onClick={()=>handelArrow(-220)}>
                            <img src="https://d25uasl7utydze.cloudfront.net/kuwa/right%20arrow.png" alt="" />
                        </div>
                        <div ref={leftArrow} className={style.allProducts}>
                            {relatedProduct.map((item, index) => {
                                const { id = '', image = '', name = '',nameArabic='', price = {}, seoUrl = '', title = '' } = item || {};
                                const {dealId, isTimerActive,isDealActive,currentTimerStatus='',dealInventory='',dealIconUrl='',dealTag='',dealDiscountPrice='',dealFinalPrice='',dealListPrice='',normalQuantity=""}= item || {}
                                const { finalPrice = '', retailPrice = '', currency = '', discount = '', discountType = '' } = price || {}
                                const cardData = {
                                    productName: name,
                                    productNameArabic: nameArabic,
                                    finalPrice: finalPrice,
                                    retailPrice: retailPrice,
                                    currency: currency,
                                    discount: discount,
                                    discountType: discountType,
                                    image: image || "",
                                    id: id || "",
                                    seoUrl:seoUrl || "",
                                    dealId:dealId || "",
                                    isTimerActive: isTimerActive,
                                    isDealActive:isDealActive,
                                    currentTimerStatus:currentTimerStatus,
                                    dealInventory:dealInventory,
                                    tagIconUrl:dealIconUrl,
                                    tag:dealTag,
                                    dealDiscountPrice:dealDiscountPrice,
                                    dealFinalPrice:dealFinalPrice,
                                    dealListPrice:dealListPrice,
                                    normalInventory:normalQuantity
                                }
                                console.log("cardData", cardData)
                                trackData = {
                                    "product Name": name,
                                    "quantity": 1,
                                    "product Id": id,
                                }
                                let addToCartPayload = {};
                                if(dealId && isDealActive && isTimerActive,currentTimerStatus=="in-between"){
                                     addToCartPayload= {"product":id,"quantity":1,"dealId":dealId,dealPrice:dealFinalPrice,productName:name}
                                }
                                else{
                                    addToCartPayload = {"product":id, "quantity":1,productName:name}
                                }
                                return (
                                    <ProductCard key={index} cardData={cardData} addToCart={() => onAddToCart(addToCartPayload)} handleNotifyMe={()=>handleNotifyMe(id)} handleNonLogin={()=>handleNonLogin(id)} />
                                )
                            })}
                        </div>
                        <div className={`${style.rightArrow} ${isArabic ? style['rightArrow-ar'] : style['rightArrow-en']}` } onClick={()=>handelArrow(220)} >
                            <img src="https://d25uasl7utydze.cloudfront.net/kuwa/left%20arrow.png" alt="left arrow" />
                        </div>
                    </div>
                </div>
                <div className={style.NotifySuccessPopup}>{isShowNotifySuccessPopup && <NotifySuccessPopup setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}/>}</div>
                <div>{isShowNotifyEmailPopup && <NotifyEmailPopup setIsShowNotifyEmailPopup={setIsShowNotifyEmailPopup} setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}  emailId={emailId} setEmailId={setEmailId} handleNotify={handleNotify}/>}</div>
                <Loader isShow={isLodaing} />
            </div>
        )
    } else {
        return <></>
    }
}

export default RelatedProducts