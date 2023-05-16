'use client'
import styles from './assured-info.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

{/* <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/assuredInfo.png' alt='logo'></img> */}


const AssuredInfoCard = () => {
    return(
        <div className={styles.assuredInfoCard}>
            <div className={styles.assuredCard}>
                    {/* <div className={styles.assuredIcon}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/assuredInfo.png' alt='logo'></img>
                    </div> */}
                    <div className={styles.assuredTxt}>Free Home Delivery</div>
                    <div className={styles.assuredSubTxt}>Above 100 AED</div>
            </div>
        </div>
    )
}




const AssuredInfo = () => {

    return(
           
        <Glider
        className={styles.gliderWre}
        slidesToShow={3}
        slidesToScroll={3}
        iconLeft={
          <img style={{width:48,height:48}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/left_arrow.png' alt='left-icon'/>
        }
        iconRight={
          <img style={{width:48,height:48}}  src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/right_arrow.png' alt='right-icon'/>
        }
        responsive={[
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1.2,
            },
          },
          {
            breakpoint: 360,
            settings: {
              slidesToShow: 1.4,
            },
          },
          {
            breakpoint: 380,
            settings: {
              slidesToShow: 1.5,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1.6,
            },
          },
          {
            breakpoint: 440,
            settings: {
              slidesToShow: 1.7,
            },
          },
          {
            breakpoint: 470,
            settings: {
              slidesToShow: 1.8,
            },
          },
          {
            breakpoint: 499,
            settings: {
              slidesToShow: 1.9,
            },
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1.9,
            },
          },
          {
            breakpoint: 530,
            settings: {
              slidesToShow: 2.1,
            },
          },
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 2.3,
            },
          },
          {
            breakpoint: 620,
            settings: {
              slidesToShow: 2.5,
            },
          },
          {
            breakpoint: 660,
            settings: {
              slidesToShow: 2.6,
            },
          },
          {
            breakpoint: 710,
            settings: {
              slidesToShow: 2.8,
            },
          },
          {
            breakpoint: 760,
            settings: {
              slidesToShow: 2.9,
            },
          },
        ]}
      >

        <AssuredInfoCard />
         <AssuredInfoCard />
        <AssuredInfoCard />
        {/* <AssuredInfoCard /> */}

       </Glider>

 
     
   
    )



}


export default AssuredInfo;

  