'use client'
import React,{useState,useEffect} from 'react';
import styles from './customer-say.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

const CustomerSayCard = () => {
    return(
        <div className={styles.customerSayCard}>
            <img className={styles.leftsymbol} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/Frame+6.png' alt='left' />
            <div>
                <div className={styles.stars}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/stars.png'  alt='stars'/>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/stars.png'  alt='stars'/>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/stars.png'  alt='stars'/>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/stars.png'  alt='stars'/>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/stars.png'  alt='stars'/>
                </div>
                <div className={styles.description}>"Prompt service with On time delivery and proper packaging. Highly recommended for supplement product ordering for sure"</div>
                <div className={styles.name}>Somdutta</div>
            </div>
            <img className={styles.rightsymbol} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/Frame+7.png' alt='right' />
            
        </div>
    )
}



const CustomerSay = () => {
    const [width, setWidth] = useState(0);
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [width]);
    return(
       <div className={styles.customerSayWrapper}>
        <Glider

             className={styles.customerSayWrapperSlider}
              hasArrows={(width>990)}
              slidesToShow={2}
              slidesToScroll={2}
              hasDots={true}
              draggable
              gap={20}
              exactWidth={true}
              itemWidth={450}
              iconLeft={
                <img style={{width:48,height:48}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/left_arrow.png' alt='left-icon'/>
              }
              iconRight={
                <img style={{width:48,height:48}}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/right_arrow.png' alt='right-icon'/>
              }
            >

          <CustomerSayCard />
          <CustomerSayCard />
          <CustomerSayCard />
          <CustomerSayCard />
                
               
            </Glider>
          
       </div>
    )
}


export default CustomerSay;

  