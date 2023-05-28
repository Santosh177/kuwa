'use client'
import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useCartItems } from '@/context/cartItems';
import Loader from '../Loader/Loader';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

const ProductSlider = ({backgroundColor,topColor,design,data,headerTextStyle={},index=0}) => {
  const router = useRouter();
  const { product=[],headerTitle= ""} = data || {};
  const [isLoading , setIsLoading] = useState(false);
  const { setCartItemData={},setCartItemCount={} } = useCartItems()

     


 
  const [width, setWidth] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

 

  const onAddToCart = async(data) =>{
    try {
      setIsLoading(true)
      const addToCartResp = await fetch('/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
      const addToCartData = await addToCartResp.json();
      console.log("addToCartData",addToCartData);
      if(addToCartData && addToCartData['products'] && addToCartData['products'].length > 0){
        setCartItemData(addToCartData['products']);
        setCartItemCount(addToCartData['products'].length);
        router.push('/cart')
      }else{
        setCartItemData([]);
        setCartItemCount(0)
      }
      setIsLoading(false)
     
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
    }
}
    return (


          <>
          
          
          <div className={styles.sliderDecoration} style={{flexDirection:(index % 2 == 0)?'row-reverse':'row'}}>
            <div className={styles.sliderLine1} style={{backgroundColor:topColor}}></div><div className={styles.sliderLine2} style={{backgroundColor:topColor}}></div>
          </div>
          <div className={styles.container} style={{backgroundImage:backgroundColor}}>
            <div className={styles.headerTxt} style={...headerTextStyle}>{headerTitle}</div>
            <div className={styles.sliderContainer}>
            <Glider
              hasArrows={(width>990)}
              slidesToShow={4.5}
              slidesToScroll={4}
              hasDots={(width>990)}
              draggable
              gap={20}
              exactWidth={true}
              itemWidth={(width>990)?204:138}
              iconLeft={
                <img style={{width:48,height:48}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/left_arrow.png' alt='left-icon'/>
              }
              iconRight={
                <img style={{width:48,height:48}}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/right_arrow.png' alt='right-icon'/>
              }
            >

              {
                product.map((data,index)=>{
                  console.log("datadata+++",data)
                  const {finalPrice="", retailPrice="",currency="", discount="", discountType="" } = data && data.price ||  {}
                  const cardData = {
                    productName:data && data.name || "",
                    finalPrice:finalPrice,
                    retailPrice:retailPrice,
                    currency:currency,
                    discount:discount,
                    discountType:discountType,
                    image:data.image || ""
                  }
                  return(
                    <ProductCard  cardData={cardData} addToCart={()=>onAddToCart({product:data.id,quantity:1})} />
                  )
                })
              }
                
               
            </Glider>
            </div>
          </div>
          <Loader isShow={isLoading} />
          </>
      );
    



}


export default ProductSlider;

  