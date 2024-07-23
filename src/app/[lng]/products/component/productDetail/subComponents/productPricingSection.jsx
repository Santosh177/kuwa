"use client"
import React, { useEffect, useState } from "react";
import styles from './ProductPricingSection.module.scss'
import IncrimentBar from "@/app/[lng]/components/IncrimnetBar/incrimentBar";
import Varients from "./productVarients";
import { getTamaraPaymentTypes } from '@/services';
import { useCountryList } from '@/context/countryList';
import { useCountry } from '@/context/contryDetails';
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import NotifySuccessPopup from "@/app/[lng]/components/NotifySuccessPopup/NotifySuccessPopup";
import NotifyEmailPopup from "@/app/[lng]/components/NotifyEmailPopup/NotifyEmailPopup";
import { useAuth } from '@/context/userDetail';
import { useLanguage } from "@/context/languageDetails";
const ProductPricingSection = ({ pricingSectionVariables, isAddedToCart=false, onChangeItemQty={} ,onResetViewCartState={} ,isDealActive,isTimerActive,currentTimerStatus,isVariantCurrenTimeStatus,isVariantDealActive,isVariantTimeActive,variantdealId,avgRating="",totalRating="",showProductReview }) => {
    const { currency = "", name = "", numberOfProductReview = "", title = "", variants = [], setselectedVarients ={}, selectedVarients = "", retailPrice = 0, finalPrice = 0, discount = 0,onHandleApplePay={}, handelAddToCart={}, handelBuyNow ={}, handelShareOption = {}, setNoOfProduct = {}, noOfProduct = 0 , handelViewCart={},mininmumDeliveryThreshold,normalInventory,productId,selectedVariantQuantity,shortDescription=""} = pricingSectionVariables;
    const {nameArabic="",titleArabic="",shortDescriptionArabic=""} = pricingSectionVariables || {}
    console.log("pricingSectionVariables",pricingSectionVariables)
    console.log("selectedVarients",selectedVarients)
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    const countryList = useCountryList();
    const { selectedCountry={} } = useCountry();
    const clevertapEvent = useCleverTapEvents();
    const [tamaraConfig, setTamaraConfig] = useState({});
    const deliveryFeesConfig = countryList.find((data) => data.code == "BH" || data.code == "BH") || {};
    const prePaidDiscount = selectedCountry?.prepaidDiscountPercentage || "";

    // const [stockQuantity,setStockQuantity] = useState(normalInventory-1);
    const [isShowNotifySuccessPopup, setIsShowNotifySuccessPopup] = useState(false);
    const [isShowNotifyEmailPopup, setIsShowNotifyEmailPopup] = useState(false);
    const [emailId,setEmailId] = useState("");
    // const [deliveryDate,setDeliveryDate] = useState("");
    const { isLogin=false ,userData = {}} = useAuth();
    const emailAddress = userData && userData.emailAddress


    console.log("normalInventory",normalInventory)
    console.log("selectedVariantQuantity",selectedVariantQuantity)
    useEffect(()=>{
        getTamaraConfig()
    },[])

    const getTamaraConfig = async() => {
        const selectedCountryCode = selectedCountry && selectedCountry.code || "BH"
        const tamaraPaymentConfig = await getTamaraPaymentTypes(selectedCountryCode);
        if(tamaraPaymentConfig && Object.keys(tamaraPaymentConfig).length > 0){
            setTamaraConfig(tamaraPaymentConfig)
        }
        
    }

    useEffect(()=>{
        if(window && window.TamaraProductWidget && Object.keys(tamaraConfig).length > 0 ){
            window.TamaraProductWidget.render()
        }
    },[(typeof window !== "undefined") && window && window.TamaraProductWidget,finalPrice,currency,tamaraConfig,noOfProduct])


    const tamaraMinAmount = tamaraConfig && Object.keys(tamaraConfig).length> 0 ? tamaraConfig&&tamaraConfig[0] && tamaraConfig[0].min_limit && tamaraConfig[0].min_limit.amount:0
    const tamaraMaxAmount = tamaraConfig && Object.keys(tamaraConfig).length> 0 ? tamaraConfig&&tamaraConfig[0] && tamaraConfig[0].max_limit && tamaraConfig[0].max_limit.amount:0
    
    const getStarImage = (index) => {
      const rating = avgRating - index;
      if (rating >= 0.75) {
          return "https://d25uasl7utydze.cloudfront.net/assets/star-filled.svg"; 
      } else if (rating >= 0.25) {
          return "https://d25uasl7utydze.cloudfront.net/assets/star-halft.svg"; 
      } else {
          return "https://d25uasl7utydze.cloudfront.net/assets/star.svg"; 
      }
  };

    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        const starImage = getStarImage(i);
        stars.push(
          <div className={styles.reviewStar} key={i}>
            <img src={starImage} alt="star" />
          </div>
        );
      }
      return stars;
    };

    const handleNotify = async() =>{
     const payload={
          productId:productId,
          variantId:selectedVarients,
          email: emailId 
        }
        try {
          const res = await fetch(`/api/out-of-stock`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          if(res.status == 200){
            setIsShowNotifySuccessPopup(true);
          }
         else{

         }
          
        } catch (error) {
          console.error('Error:', error);
        }
      }

      const handleNotifyMe = async()=>{
        const payload={
          productId:productId,
          variantId:selectedVarients,
          email: emailAddress 
        }
        try {
          const res = await fetch(`/api/out-of-stock`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          if(res.status == 200){
            setIsShowNotifySuccessPopup(true);
          }
       
          else{
            
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

      const currentDate = new Date();
      const deliveryDate = new Date(currentDate);
      deliveryDate.setDate(deliveryDate.getDate() + 4);

      const day = deliveryDate.getDate();
      const monthIndex = deliveryDate.getMonth();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = monthNames[monthIndex];
      console.log("Delivery Date: " + deliveryDate)
      const deliveryDateString = `${month} ${day}`;
    return (
      <>
        <div className={styles.pricingSectionContainer}>
        {
       selectedVariantQuantity == null ?
        (normalInventory <= 15 && normalInventory >= 1 && <div className={styles.normalInventory}>{normalInventory} {isArabic ? "المتبقي في المخزون" : "left in stock"}</div>) : 
        (
        <>
        {selectedVariantQuantity <= 15 && selectedVariantQuantity >= 1 && <div className={styles.normalInventory}>{selectedVariantQuantity} {isArabic ? "المتبقي في المخزون" : "left in stock"}</div>}
        </>
        )
        }
            <h1 className={styles.title}>{isArabic? titleArabic : title}</h1>
            <h2 className={styles.shortDescription}>{isArabic ? shortDescriptionArabic : shortDescription}</h2>
            {/* {numberOfProductReview && <div className={styles.reviewContainer}>
                <div className={styles.imageReview}><img src="" alt="" /></div>
                {numberOfProductReview && <div className={styles.numberOfReview}>({numberOfProductReview})</div>}
            </div>} */}
           {avgRating > 0 && totalRating > 0 && <div className={styles.ratingSection}>
           <div className={styles.avgRatingValue}>{`${parseFloat(avgRating).toFixed(2)}`}</div>
              <div className={styles.avgRating}>{renderStars()}</div>
              <div className={styles.totalNumberRating} onClick={showProductReview}>{`(${totalRating} ${isArabic ? "التقييمات" : "ratings"})`}</div>
            </div>}
            <div className={styles.pricingConatiner}>
            <div className={styles.price}>
              {
              (isDealActive && isTimerActive
               &&
              currentTimerStatus=="in-between"
              ) ||
              (isVariantDealActive && isVariantTimeActive 
                && isVariantCurrenTimeStatus == "in-between")
              ? 
              <><div className={styles.finalPrice}>{isArabic ? " حصرياً في" : ("Only at") + " " +currency + " " + finalPrice }</div>
             {discount>0 && <div className={styles.retailPrice}>{currency + " " + retailPrice}</div>}</>
              :
                <><div className={styles.finalPrice}>{currency +" " + finalPrice }</div>
               {discount> 0 &&  <div className={styles.retailPrice}>{currency + " " + retailPrice}</div>}</>}
                </div>
                <div className={styles.incriment}>
                    <IncrimentBar noOfProduct={noOfProduct} setNoOfProduct={setNoOfProduct} onResetViewCartState={onResetViewCartState} selectedVariantQuantity={selectedVariantQuantity} normalInventory={normalInventory}/>
                </div>
            </div>
            {discount > 0 && <div className={styles.discount}>{isArabic ? " حفظ" : "Save"} {currency +" " + parseFloat(discount.toFixed(2))}</div>}
            {variants.length>0 ? <div className={styles.packOf}>{isArabic ? "عدد العبوات" : "Pack of"}</div>:""}  
            <Varients currency={currency} variants={variants} setselectedVarients={setselectedVarients} selectedVarients={selectedVarients} onResetViewCartState={onResetViewCartState}/>
           {variants.find(data=> data.variants.name==3) && <div className={styles.variantRecommendedTxt}>{isArabic ? "" : "Recommended pack of 3 for better result"}</div>}
          {(normalInventory >0 || selectedVariantQuantity > 0) && <div className={styles.deliveryDate}>{isArabic ? "اطلب الآن واحصل عليه بحلول" : "Order now and get it by"}<span> {deliveryDateString}</span></div>}
            <div className={styles.freeShippingSection}>
              <div className={styles.freeShippingDiv}>
                <div className={styles.truckImg}><img src={isArabic ? "https://d25uasl7utydze.cloudfront.net/assets/truck_green.svg" : "https://d25uasl7utydze.cloudfront.net/assets/truck.svg"}></img></div>
                <div className={styles.text}>{isArabic ? "توصيل مجاني للطلبات أعلى من" :"Free Delivery above "}<span>{currency + " " +mininmumDeliveryThreshold}</span></div>
                
                </div>
                </div>
                <div className={styles.addToCartContainer}>
                {selectedVariantQuantity == null ? (
           normalInventory <= 0 ? (
      <div className={styles.notifyBtn} onClick={() => (isLogin ? handleNotifyMe() : setIsShowNotifyEmailPopup(true))}>
        {isArabic ? "اعلمني " :"NotifyMe"}
      </div>
    ) : (
      <>
        {isAddedToCart ? (
          <div className={styles.addToCart} onClick={() => handelViewCart()}>
            <span>{isArabic ? "عرض السلة" :"View Cart"}</span>
          </div>
        ) : (
          <div className={styles.addToCart} onClick={() => handelAddToCart()}>
            <span>{isArabic ? "أضف إلى السلة" :"Add to Cart"}</span>
          </div>
        )}
        <div className={styles.buyNow} onClick={() => handelBuyNow()}>
          <span>{isArabic ? "اشترِ الآن" :"Buy Now"}</span>
        </div>
      </>
    )
  ) : (
    selectedVariantQuantity <= 0 ? (
      <div className={styles.notifyBtn} onClick={() => (isLogin ? handleNotifyMe() : setIsShowNotifyEmailPopup(true))}>
        {isArabic ? "اعلمني " :"NotifyMe"}
      </div>
    ) : (
      <>
        {isAddedToCart ? (
          <div className={styles.addToCart} onClick={() => handelViewCart()}>
            <span>{isArabic ? "عرض السلة" : "View Cart"}</span>
          </div>
        ) : (
          <div className={styles.addToCart} onClick={() => handelAddToCart()}>
            <span>{isArabic ? "أضف إلى السلة" :"Add to Cart"}</span>
          </div>
        )}
        <div className={styles.buyNow} onClick={() => handelBuyNow()}>
          <span>{isArabic ? "اشترِ الآن" :"Buy Now"}</span>
        </div>
      </>
    )
  )}
</div>


            
           { window && window.ApplePaySession && <div style={{marginTop:'24px',cursor:normalInventory <=0 || selectedVariantQuantity<=0 ? 'not-allowed':'pointer'}}
            onClick={()=>{
              if(normalInventory > 0 || selectedVariantQuantity > 0){
                onHandleApplePay()
              }
            }
           }>
               <img style={{width:'100%'}} src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/default.png" alt="apple-pay"></img>
            </div>}
            { window && window.ApplePaySession && prePaidDiscount > 0 && <div className={styles.prepaidDiscount}>{isArabic ? "إضافي" : "Extra"} {prePaidDiscount}{isArabic ? "% خصم" : "% Off"}</div>}
            {/* <div className={styles.shareConatiner}>
                <div className={styles.Share} >Share:</div>
                <div className={styles.shareLogo}>
                    <img onClick={() => handelShareOption("WhatsApp")} src="https://d25uasl7utydze.cloudfront.net/kuwa/whatsapp.svg" alt="whatsapp" />
                    <img onClick={() => handelShareOption("FaceBook")} src="https://d25uasl7utydze.cloudfront.net/kuwa/facebook%20(1).svg" alt="facebook" />
                </div>
            </div> */}
             <div id="tabbyDetail" className={styles.tabbyDetailMain}></div>
             <div
                className="tamara-product-widget"
                data-lang= {isArabic ? "ar" : "en"}
                data-price={finalPrice * noOfProduct}
                data-currency={currency}
                data-number-of-installments="3"
                data-payment-type="installment"
                data-disable-installment="false"
                data-disable-paylater="false"
                data-installment-minimum-amount= {tamaraMinAmount}
                data-installment-maximum-amount= {tamaraMaxAmount}
                data-installment-available-amount={tamaraMinAmount}
                />
              <div className={styles.benefitsLogoSection}>
                  <div className={styles.logoDiv}>
                    <img src="https://d25uasl7utydze.cloudfront.net/assets/kuwa_cash.svg" alt="benefits-logo" />
                    <div className={styles.logoTxt}>{isArabic ? "الدفع عند الاستلام" : "Cash on delivery"}</div>
                  </div>
                  <div className={styles.logoDiv}>
                    <img src="https://d25uasl7utydze.cloudfront.net/assets/kuwa_lock.svg" alt="benefits-logo" />
                    <div className={styles.logoTxt}>{isArabic ? "دفع آمن" :"Secure payment"}</div>
                  </div>
                  <div className={styles.logoDiv}>
                    <img src="https://d25uasl7utydze.cloudfront.net/assets/kuwa_offer.svg" alt="benefits-logo" />
                    <div className={styles.logoTxt}>{isArabic ? "منتجات أصلية 100%" : "100% authentic"}</div>
                  </div>
                </div> 
        </div>
       {isShowNotifySuccessPopup&& <NotifySuccessPopup setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup}/>}
       {isShowNotifyEmailPopup && <NotifyEmailPopup setIsShowNotifyEmailPopup={setIsShowNotifyEmailPopup} setIsShowNotifySuccessPopup={setIsShowNotifySuccessPopup} handleNotify={handleNotify} setEmailId={setEmailId} emailId={emailId} />}
        </>
    )
}

export default ProductPricingSection