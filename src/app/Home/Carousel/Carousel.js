'use client'
import React from 'react';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import styles from './Carsoul.module.scss'

const Carousel = () => {
  return (
    <>
    <div className={styles.carouselContainer}>
      <Glider className={styles.Glider}
        draggable
        arrows
        dots="#dots"
        slidesToShow={1}
        slidesToScroll={1}
        hasDots={true}
        scrollLock={true}
        
       
      >
        <div className={styles.carouselSlide}>
          <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/image+133.png" alt="Slide 1" />
        </div>
        <div className={styles.carouselSlide}>
          <img src="https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/image+134.png" alt="Slide 2" />
        </div>
        
      </Glider>

      <div id="dots" ></div>
      </div>
      
    </>
  );
};

export default Carousel;



