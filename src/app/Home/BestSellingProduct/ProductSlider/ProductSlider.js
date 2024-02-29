'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import ProductCard from '@/components/ProductCard/ProductCard';
import { addToCart } from '@/services'
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import useCleverTapEvents from '@/hooks/useCleverTapEvents';

const ProductSlider = ({ backgroundColor, topColor, design, data, headerTextStyle = {} }) => {
  const router = useRouter();
  const { product = [], headerTitle = "" } = data || {};
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  const clevertapEvent = useCleverTapEvents();
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);
  let trackData = {};
  const onAddToCart = async (data) => {
    try {
      setIsLoading(true);
      const res = await addToCart(data);
      setIsLoading(false);
      clevertapEvent.onCleverTapEvent("kuwa_add_to_cart", trackData);
      window.location.href = '/cart';
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
    }
  }
  return (
    <div className={styles.bestSellingProductSlider}>
      <div className={styles.sliderTopDecorationDesktop} >
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/desktop_top.png' alt='background' />
      </div>
      <div className={styles.sliderTopDecorationMob} >
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/top+(1).png' alt='background' />
      </div>
      <div className={styles.container} style={{ backgroundImage: backgroundColor }}>
        <div className={styles.headerTxt} style={{...headerTextStyle}}>{headerTitle}</div>
        <div className={styles.sliderContainer}>
          <Glider
            slidesToShow={4.5}
            slidesToScroll={4}
            hasDots={width > 990}
            draggable
            gap={20}
            exactWidth={true}
            itemWidth={(width > 990) ? 204 : 138}
            iconLeft={
              <img style={{ width: 38, height: 64 ,}} src='https://d25uasl7utydze.cloudfront.net/assets/left.png' alt='left-icon' />
            }
            iconRight={
              <img style={{ width: 38, height: 64, }} src='https://d25uasl7utydze.cloudfront.net/assets/right.png' alt='right-icon' />
            }
          >
            {
              product.map((data, index) => {
                const { variants=[]} = data  || {}
                const { finalPrice = "", retailPrice = "", currency = "", discount = "", discountType = "" } = data && data.price || {}
                let cardData = {}
                console.log("bestSellingProduct",data)
                if(variants && variants.length > 0  && data.variants[0].variantPrices.length>0) {
                  const { variantPrices = [] ,name="",image=""} = data.variants[0] || {};
                  if(variantPrices[0].dealId && variantPrices[0].isDealActive && variantPrices[0].isTimerActive
                     && variantPrices[0].currentTimerStatus == "in-between" ){
                    cardData = {
                      dealId:variantPrices[0].dealId,
                      productName: data && data.name || "",
                      finalPrice: variantPrices[0].dealFinalPrice,
                      retailPrice: variantPrices[0].dealListPrice,
                      currency: currency,
                      discount: variantPrices[0].dealDiscountPrice,
                      discountType: discountType || "",
                      image: image || "",
                      id: variantPrices[0].variantId || "",
                      seoUrl: data.seoUrl || "",
                      currentTimerStatus:variantPrices[0].currentTimerStatus,
                      currentTimerValue:variantPrices[0].currentTimerValue,
                      tag:variantPrices[0].dealTag,
                      tagIconUrl:variantPrices[0].dealIconUrl,
                    }
                  }
                  else{
                    cardData = {
                      productName: data && data.name || "",
                      finalPrice: variantPrices[0].finalPrice,
                      retailPrice: variantPrices[0].retailPrice,
                      currency: currency,
                      discount: variantPrices[0].discount,
                      discountType: discountType || "",
                      image: image || "",
                      id: variantPrices[0].variantId || "",
                      seoUrl: data.seoUrl || ""
                    }
                  }
                }else{
                  if(
                    data.dealId && data.isDealActive && data.isTimerActive
                    && data.currentTimerStatus == "in-between"
                  ){
                    cardData={
                      "dealId":data.dealId || "",
                      "id":data.id || "",
                      "productName":data.name,
                      "productImage":data.image || "",
                      "seoUrl":data.seoUrl || "",
                      "dealListPrice":data.dealListPrice,
                    'dealFinalPrice':data.dealFinalPrice,
                    'discountType':"fixed",
                    "dealDiscountPrice":data.dealDiscountPrice || 0,
                    "currency":currency,
                    "tag":data.dealTag,
                    "tagIconUrl":data.dealIconUrl,
                    "dealInventory":data.dealInventory,
                    "isDealActive":data.isDealActive,
                    "isTimerActive":data.isTimerActive,
                    "currentTimerStatus":data.currentTimerStatus,
                    "currentTimerValue":data.currentTimerValue,
                    "currentDateTime":data.currentDateTime
                    }
                  }

                  else{
                    cardData = {
                      productName: data && data.name || "",
                      finalPrice: finalPrice,
                      retailPrice: retailPrice,
                      currency: currency,
                      discount: discount,
                      discountType: discountType,
                      image: data.image || "",
                      id: data.id || "",
                      seoUrl: data.seoUrl || ""
                    }
                  }
                 
                }
                trackData = {
                  "product Name": data && data.name,
                  "quantity": 1,
                  "product Id": data?.id,
                }

                let addToCartPayload = {  }

                if(variants && variants.length > 0){
                  const { variantPrices = [] ,name="",image="",id=""} = data.variants[0] || {};
                  let variantId = id;
                  let variantDealPrice = "";
                  let variantDealId = ''
                
                  if(variantPrices && variantPrices.length > 0){
                    variantId = variantPrices[0].variantId;
                    variantDealPrice = variantPrices[0].dealFinalPrice;
                    variantDealId = variantPrices[0].dealId;
                  }
                  if( variantPrices[0]?.dealId &&  variantPrices[0]?.isDealActive && variantPrices[0]?.isTimerActive
                    && variantPrices[0].currentTimerStatus == "in-between"
                 ){
                  addToCartPayload= {"product":data.id,"quantity":1,"isVariant":true,"variantId":variantId,dealId:variantDealId,dealPrice:variantDealPrice}
                 }
                 else{
                  addToCartPayload= {"product":data.id,"quantity":1,"isVariant":true,"variantId":variantId}
                 }


                }
                else{
                  if(data.dealId && data.isTimerActive && data.isDealActive
                    && data.currentTimerStatus == "in-between"
                  ){
                    addToCartPayload = { product: data.id, quantity: 1,dealId:data.dealId ,dealPrice:data.dealFinalPrice}
                  }
                  else{
                    addToCartPayload = { product: data.id, quantity: 1 }
                  }
                  
                }

                return (
                  <ProductCard key={index} cardData={cardData} addToCart={() => onAddToCart(addToCartPayload)} />
                )
              })
            }
          </Glider>
        </div>
      </div>
      <div className={styles.sliderBottomDecorationDesktop} >
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/desktop_bottom.png' alt='background' />
      </div>
      <div className={styles.sliderBottomDecorationMob} >
        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/bottom+(1).png' alt='background' />
      </div>
      <Loader isShow={isLoading} />
    </div>
 
  );




}


export default ProductSlider;

