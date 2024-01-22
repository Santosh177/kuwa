'use client'
import React, { useState, useEffect } from 'react';
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import { useRouter } from 'next/navigation';
import "glider-js/glider.min.css";
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
const ProductSlider = ({data}) => {
    console.log("brands",data)
    const brand = data?.brand || [];
    const heading = data?.heading || ""
    const headingtWord = heading?.split(" ");
    const router = useRouter();
    const [width, setWidth] = useState(0);
    const clevertapEvent = useCleverTapEvents();
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
        setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [width]);
  return (
    <>
    {brand && brand.length > 0 && <div className={styles.brandHeader}>{headingtWord[0]} <span>{headingtWord?.slice(1).join(" ")}</span></div> }
              <Glider
               hasArrows={(width>990)}
               slidesToShow={4.5}
               slidesToScroll={4}
               hasDots={false}
               draggable
               gap={20}
               exactWidth={true}
               itemWidth={(width>990)?204:138}
               iconLeft={
                 <img style={{width:48,height:48}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/left_arrow.png' alt='left-icon'/>
               }
               iconRight={
                 <img style={{width:48,height:48}}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/right_arrow.png' alt='right-icon'/>
               }>
              
              <div className={styles.brandContent}>

          <div  className={styles.brandContainer} >
            {
                brand.map((data,index)=>{
                    return(
                        // <div className={styles.brandSection}>
                        <div className={styles.brand} onClick={()=>window.location.href =`/collections?category=${encodeURIComponent(data?.brandName)}`}>
                            <div className={styles.brandImg}>
                                <img src={data?.image}></img>
                            </div>
                            {/* <div className={styles.brandName}>{data.brandName}</div> */}
                        </div>
                        // </div>
                    )
                })
            }
          </div> 
          </div>
          </Glider>
          </>
  )
}

export default ProductSlider