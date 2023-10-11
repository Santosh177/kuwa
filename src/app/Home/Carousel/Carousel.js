'use client';
import React from 'react';

import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useRouter } from 'next/navigation';
import './carousel.scss'

import styles from './Carsoul.module.scss'


const Carousel = ({ data }) => {
  // console.log("primaryBanner",primaryBanner)
  const router = useRouter();
  return (
    <>
      <div className={styles.carouselContainer} >
        <Glider 
          className="home-banner-glider"
          draggable
          arrows
          dots="#dots-home-banner"
          slidesToShow={1}
          slidesToScroll={'auto'}
          hasDots={true}
          scrollLock={true}
          

        >
         
          
          {data.map((data, index) => (
  <div className={styles.carouselSlide} key={data.id}  onClick={() => router.push(data.redirectionLink)}>
    <img
     src={data.image}
      alt={index}
    />
  </div>
))}

            
        </Glider>

        <div id="dots-home-banner" ></div>
      </div>

    </>
  );
};

export default Carousel;



