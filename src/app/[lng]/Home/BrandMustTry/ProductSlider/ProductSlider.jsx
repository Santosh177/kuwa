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
    <div className={styles.brandContent}>
    <div  className={styles.brandContainer} >
              <Glider
               hasArrows={(width>990)}
               slidesToShow={4.5}
               slidesToScroll={4}
               hasDots={false}
               draggable
               gap={20}
               exactWidth={true}
               itemWidth={(width>990)?180:104}
               iconLeft={
                 <img style={{width:38,height:64,}} src='https://d25uasl7utydze.cloudfront.net/assets/left.png' alt='left-icon'/>
               }
               iconRight={
                 <img style={{width:38,height:64,}}  src='https://d25uasl7utydze.cloudfront.net/assets/right.png' alt='right-icon'/>
               }>
              
             
            {
                brand.map((data,index)=>{
                    return(
                        <div className={styles.brand} onClick={()=>window.location.href =`/collections/${encodeURIComponent(data?.seoUrl)}`}>
                            <div className={styles.brandImg}>
                                <img src={data?.image}></img>
                            </div>
                        </div>
                    )
                })
            }
        
          </Glider>
          </div> 
          </div>
          </>
  )
}

export default ProductSlider