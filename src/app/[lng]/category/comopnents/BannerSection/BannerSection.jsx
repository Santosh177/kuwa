'use client'
import React from 'react'

import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import style from './bannerSection.module.scss'

const BannerSection = ({data}) => {
  console.log("Banana",data)
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
    {
      data?.length > 0  &&  <div className={style.bannerSection}>
        <Glider
         className="collection-banner-glider"
          slidesToShow={1}
          slidesToScroll={'auto'}
          dots={true}
          // arrows={true}
          draggable={true}
          // onMove={(event, index) => console.log("Move ", index)}
          // onDragStart={(event, index) => console.log("Drag Start ", index)}
          // onDragEnd={(event, index) => console.log("Drag End ", index)}
          // onSlide={(event, index) => console.log("Slide ", index)}
          ref={callbackRef}
        >
          {
            data.map((item, index) => {
              return (
                <div key={index} className={style.glideSlide}>
                  <img src={item.imageUrl} alt={item.alt} />
                  <div className={style.caption}>{item.caption}</div>
                </div>
              )
            })
          }
        </Glider>
      </div>
    }
    </>
    
  )
}

export default BannerSection