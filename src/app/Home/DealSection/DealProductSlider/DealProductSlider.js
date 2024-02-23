import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation';
// import ProductCard from '@/components/ProductCard/ProductCard';
import ProductDealCard from '@/components/ProductDealCard/ProductDealCard';
import { addToCart } from '@/services'
import { useCartItems } from '@/context/cartItems';
import Glider from 'react-glider';
import Loader from '@/components/Loader/Loader';
import "glider-js/glider.min.css";
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import styles from './deal-product-slider.module.scss'
const DealProductSlider = ({data,tagIconUrl,tag,isDealActive,isTimerActive,currentTimeStatus}) => {
  console.log("sdbhsha",isDealActive)
  // let isDealActive = isDealActive || false;
    const [isLoading , setIsLoading] = useState(false);
    const [width, setWidth] = useState(0);
    const clevertapEvent = useCleverTapEvents();
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [width]);
    let trackData={};
  const onAddToCart = async(data) =>{
    try {
      setIsLoading(true)
      const res = await addToCart(data);
      setIsLoading(false)
      clevertapEvent.onCleverTapEvent("kuwa_add_to_cart",trackData);  
      window.location.href = '/cart'
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
}
  return (
    <>
       <div className={styles.container}>
       <div className={styles.sliderContainer}>
        <Glider
         hasArrows={(width>990)}
         slidesToShow={4.5}
         slidesToScroll={7}
        //  hasDots={width > 990}
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
              data.map((data, index) => {
                const {productId,variantId} = data || {}
                let cardData = {}
                trackData = {
                    "product Name": data && data.productName || "",
                    "quantity": 1,
                    "product Id":data.productId || "",
                  }
                if(variantId == null){
                    cardData = {
                      dealId : data.dealId || "",
                        productName: data && data.productName || "",
                        finalPrice: data.productFinalPrice,
                        retailPrice: data.productListPrice,
                        dealListPrice:data.dealListPrice,
                        dealDiscountPrice:data.dealDiscountPrice,
                        dealFinalPrice:data.dealFinalPrice,
                        currency: data.currency,
                        discount: data.productDiscount,
                        // discountType: discountType,
                        image: data?.productImage || "",
                        id: data?.productId || "",
                        seoUrl: data?.productSeoUrl || "",
                        dealInventory:data?.dealInventory,
                        normalInventory:data?.normalInventory,
                        tag:tag || "",
                        tagIconUrl:tagIconUrl || "",
                        isDealActive:isDealActive,
                        isTimerActive:isTimerActive,
                        currentTimerStatus:currentTimeStatus,
                      }
                }else{
                    cardData = {
                      dealId : data.dealId || "",
                      productName: data && data.productName || "",
                      finalPrice: data.variantFinalPrice,
                      retailPrice: data.variantListPrice,
                      currency: data.currency,
                      discount: data.variantDiscount,
                    //   discountType: discountType,
                      image: data?.variantImage || "",
                      id: data?.variantId || "",
                      seoUrl: data?.productSeoUrl || "",
                      dealListPrice:data.dealListPrice,
                      dealDiscountPrice:data.dealDiscountPrice,
                      dealFinalPrice:data.dealFinalPrice,
                      dealInventory:data?.dealInventory,
                      normalInventory:data?.normalInventory,
                      tag:tag || "",
                      tagIconUrl:tagIconUrl || "",
                      isDealActive:isDealActive || false,
                      isTimerActive:isTimerActive,
                      currentTimeStatus:currentTimeStatus,
                    }
                }
                let addToCartPayload = {}
                if(variantId){
                    addToCartPayload = {"product":data.productId,"quantity:":1,"isVariant":true,"variantId":data.variantId,"dealId":data.dealId}    
                }
                else{
                    addToCartPayload =  { "product": data.productId, quantity: 1, "dealId" :data.dealId }
                }
               
                return (
                    <ProductDealCard key={index} cardData={cardData}  addToCart={()=>onAddToCart(addToCartPayload)} />
                )
            })
         }
         </Glider>
         <Loader isShow={isLoading} />
    </div>
       </div>
    </>
 
    
  )
}

export default DealProductSlider