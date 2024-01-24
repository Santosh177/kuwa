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
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [width]);

    const slidesToShow = width > 990 ? 2 : 1;
    const slidesToScroll = width > 990 ? 2 : 1;

    return(
    
        <div className= {styles.CustomerSayContainer}>
        <div className={styles.txt}>Our Customer Say!</div>
        <div>
       <div className={styles.customerSayWrapper}>
        <Glider

             className={styles.customerSayWrapperSlider}
              hasArrows={(width>990)}
              slidesToShow={slidesToShow}
              slidesToScroll={slidesToScroll}
              
              hasDots={true}
              draggable
              exactWidth={true}
             
              itemWidth={(width>990)?510:200}
              iconLeft={
                <img style={{width:38,height:64,position:"relative",right:"-58px"}} src='https://d25uasl7utydze.cloudfront.net/assets/left.png' alt='left-icon'/>
              }
              iconRight={
                <img style={{width:38,height:64,}}  src='https://d25uasl7utydze.cloudfront.net/assets/right.png' alt='right-icon'/>
              }
            >

          <CustomerSayCard />
          <CustomerSayCard />
          <CustomerSayCard />
          <CustomerSayCard />
                
               
            </Glider>
            </div>
          </div>
       </div>
       
    )
}


export default CustomerSay;

  