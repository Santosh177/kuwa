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
  const MAX = data && data.length ;
  const intervalRef = React.useRef(null);
  const callbackRef = React.useCallback((glider) => {
    if (glider) {
      if (!intervalRef.current  && MAX > 1) {
        intervalRef.current = setInterval(() => {
          let index = glider.page;
          if (index < MAX - 1) {
            index += 1;
          } else {
            index = 0;
          }
          glider.scrollItem(index, false);
        }, 6000);
      }
    }
  }, []);

  React.useEffect(
    () => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    []
  );

  return (
    <>
    {data.length > 0 &&   <div className={styles.carouselContainer} >
        <Glider 
          className="home-banner-glider"
          draggable
          arrows
          dots="#dots-home-banner"
          slidesToShow={1}
          slidesToScroll={'auto'}
          hasDots={true}
          scrollLock={true}
          ref={callbackRef}

        >
         
          
          {data.map((data, index) => (
  <div className={styles.carouselSlide} key={data.id}  onClick={() => router.push(data.redirectionLink)}>
    <img
     src={data.image || data.imageUrl}
      alt={index}
    />
  </div>
))}

            
        </Glider>

        <div id="dots-home-banner" style={{marginTop:"-20px"}}></div>
      </div>
}
    </>
  );
};

export default Carousel;



