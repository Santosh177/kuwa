'use client'
import React,{useState,useEffect} from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './product-slider.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

const ProductSlider = ({backgroundColor,topColor,design}) => {
 
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

    return (


          <>
          
          
          <div className={styles.sliderDecoration} style={{flexDirection:(design === 'right')?'row-reverse':'row'}}>
            <div className={styles.sliderLine1} style={{backgroundColor:topColor}}></div><div className={styles.sliderLine2} style={{backgroundColor:topColor}}></div>
          </div>
          <div className={styles.container} style={{backgroundImage:backgroundColor}}>
            <div>Immunity</div>
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
                <ProductCard  image={'https://production-website-builds.s3.ap-south-1.amazonaws.com/aadar.png'} />
                <ProductCard image={'https://production-website-builds.s3.ap-south-1.amazonaws.com/collagen+(1).png'}/>
                <ProductCard image={'https://production-website-builds.s3.ap-south-1.amazonaws.com/shilajit.png'}/>
                <ProductCard number={4}/>
                <ProductCard number={5}/>
                <ProductCard number={6}/>
                <ProductCard number={7}/>
                <ProductCard number={8}/>
                <ProductCard number={9}/>
                <ProductCard number={10}/>
                <ProductCard number={11}/>
                <ProductCard number={12}/>
                <ProductCard number={13}/>
                <ProductCard  number={14}/>
                <ProductCard number={15}/>
                <ProductCard number={16}/>
                <ProductCard number={17}/>
                <ProductCard number={18}/>
                <ProductCard number={19}/>
                <ProductCard number={20}/>
            </Glider>
            </div>
          </div>
          </>
      );
    



}


export default ProductSlider;

  