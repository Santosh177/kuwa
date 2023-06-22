'use client';
import React from 'react';

import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { useRouter } from 'next/navigation';

import styles from './Carsoul.module.scss'


const Carousel = ({ data }) => {
  // console.log("primaryBanner",primaryBanner)
  const router = useRouter();
  return (
    <>
      <div className={styles.carouselContainer} >
        <Glider className={styles.Glider}
          draggable
          arrows
          dots="#dots"
          slidesToShow={1}
          slidesToScroll={1}
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

        <div id="dots" ></div>
      </div>

    </>
  );
};

export default Carousel;



