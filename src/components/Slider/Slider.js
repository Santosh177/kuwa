'use client'
import React,{useState,useEffect} from 'react';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

const Slider = ({children}) => {
 
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

    return (

          <>
            <Glider
              hasArrows
              slidesToShow={1.2}
              slidesToScroll={4}
              hasDots
              draggable
              gap={20}
              iconLeft={
                <img style={{width:48,height:48}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/left_arrow.png' alt='left-icon'/>
              }
              iconRight={
                <img style={{width:48,height:48}}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/right_arrow.png' alt='right-icon'/>
              }
              responsive={[
                {
                  breakpoint: 864,
                  settings: {
                    slidesToShow: 3,
                  },
                },
              ]}
            >

                {children}
            
            </Glider>
          </>
      );
    



}


export default Slider;

  