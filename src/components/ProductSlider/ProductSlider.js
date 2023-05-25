'use client'
import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

const ProductSlider = ({backgroundColor,topColor,design,data,headerTextStyle={}}) => {
  const router = useRouter();
  console.log("datadata",data)

  const { product=[],headerTitle= ""} = data || {};
 
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

 

  const onAddToCart = async(data) =>{
    try {
      const res = await fetch('/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
      })
      if (res.status === 200) {
        router.push('/cart')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
}
    return (


          <>
          
          
          <div className={styles.sliderDecoration} style={{flexDirection:(design === 'right')?'row-reverse':'row'}}>
            <div className={styles.sliderLine1} style={{backgroundColor:topColor}}></div><div className={styles.sliderLine2} style={{backgroundColor:topColor}}></div>
          </div>
          <div className={styles.container} style={{backgroundImage:backgroundColor}}>
            <div className={styles.headerTxt} style={...headerTextStyle}>{headerTitle}</div>
            <div className={styles.sliderContainer}>
            <Glider
              hasArrows
              slidesToShow={4.5}
              slidesToScroll={4}
              hasDots
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
          </>
      );
    



}


export default ProductSlider;

  