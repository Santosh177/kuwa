'use client'

import React,{useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard/ProductCard';
import { addToCart } from '@/services'
import { useCartItems } from '@/context/cartItems';
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import Loader from '@/components/Loader/Loader';
import "glider-js/glider.min.css";
import useCleverTapEvents from '@/hooks/useCleverTapEvents';

const ProductSlider = ({data}) => {
    console.log("newArrivals",data);
    const router = useRouter();
    const { product = [], headerTitle = "" } = data || {};
    const [isLoading, setIsLoading] = useState(false);
    const { setCartItemData={},setCartItemCount={} } = useCartItems();
    const [width, setWidth] = useState(0);
    const [isArrowVisible, setIsArrowVisible] = useState(false);
    const clevertapEvent = useCleverTapEvents();
    const handleResize = () => setWidth(window.innerWidth);
  const headerTitleupdate = headerTitle.split(" ");
  const firstWordHeder = headerTitleupdate[0]

    useEffect(() => {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [width]);

    let trackData={};
    const onAddToCart = async(data) =>{
        try{
            setIsLoading(true);
            const res = await addToCart(data);
            setIsLoading(false)
            clevertapEvent.onCleverTapEvent("kuwa_add_to_cart",trackData); 
            window.location.href =  '/cart';
        }
        catch (error){
            console.error('An unexpected error happened occurred:', error)
        }
    }
    const handleAllProduct = () =>{
      window.location.href = '/collections?category=&sort=new_arrivals'
    }
  return (
    <>
    {product && product.length > 0 && 
    <div className={styles.container}>
      <div className={styles.headerContainer}>
          <div className={styles.headerTxt} ><span>{firstWordHeder}</span> {headerTitleupdate.slice(1).join(" ") }</div>
    <div className={styles.seeAllDiv} onClick={handleAllProduct}>
      <div className={styles.txt}>See all</div>
      <div className={styles.arrowImg}><img src='https://d25uasl7utydze.cloudfront.net/assets/right%20arrow.svg'/></div>
    </div>
    </div>
    <div className={styles.sliderContainer}>
        <Glider
         hasArrows={(width>990)}
         slidesToShow={4.5}
         slidesToScroll={4}
        //  hasDots={width > 990}
         draggable
         gap={20}
         exactWidth={true}
         itemWidth={(width > 990) ? 204 : 138}
         iconLeft={
           <img style={{ width: 38, height: 64,position:"relative",right:"-58px" }} src='https://d25uasl7utydze.cloudfront.net/assets/left.png' alt='left-icon' />
         }
         iconRight={
           <img style={{ width: 38, height: 64, }} src='https://d25uasl7utydze.cloudfront.net/assets/right.png' alt='right-icon' />
         }
         >
         {
              product.map((data, index) => {
                const { finalPrice = "", retailPrice = "", currency = "", discount = "", discountType = "" } = data && data.price || {}
                const cardData = {
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
                trackData = {
                  "product Name": data && data.name || "",
                  "quantity": 1,
                  "product Id":data.id || "",
                }
                return (
                    <ProductCard key={index} cardData={cardData} addToCart={() => onAddToCart({ product: data.id, quantity: 1 })} />
                )
            })
         }
         </Glider>
         <Loader isShow={isLoading} />
    </div>
    </div>}
    </>
  )
}

export default ProductSlider