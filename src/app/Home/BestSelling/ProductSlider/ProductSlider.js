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

const ProductSlider = ({data}) => {
  const router = useRouter();
  const { product = [], headerTitle = "" } = data || {};
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const clevertapEvent = useCleverTapEvents();
  useEffect(() => {
    setWidth(window.innerWidth);
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
                    "productImage":image || "",
                    "seoUrl":seoUrl || "",
                    "dealListPrice":dealListPrice,
                  'dealFinalPrice':dealFinalPrice,
                  'discountType':"fixed",
                  "dealDiscountPrice":dealDiscountPrice || 0,
                  "currency":currency,
                  "dealInventory":dealInventory,
                  "tag":dealTag,
                  "tagIconUrl":dealIconUrl,
                  "isDealActive":isDealActive,
                  "isTimerActive":isTimerActive,
                  "currentTimerStatus":currentTimerStatus,
                  "currentTimerValue":currentTimerValue,
                  "currentDateTime":currentDateTime
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
                  image: data?.image || "",
                  id: data?.id || "",
                  seoUrl: data?.seoUrl || ""
                }
              }
                trackData = {
                  "product Name": data && data.name,
                  "quantity": 1,
                  "product Id": data?.id,
                }
                return (
                  <ProductCard key={index} cardData={cardData} addToCart={() => onAddToCart({ product: data.id, quantity: 1 })} />
                )
              })
            }
          </Glider>
        </div>
        </div>
  )
}

export default ProductSlider