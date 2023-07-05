'use client';
import Banner from './Banner/Banner';
import Header from '@/components/Header/Header';
import AssuredInfo from './AssuredInfo/AssuredInfo';
import BestSellingProduct from './BestSellingProduct/BestSellingProduct';
import BrandMustTry from './BrandMustTry/BrandMustTry';
import SecondaryBanner from './SecondaryBanner/SecondaryBanner';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import MedicalExpert from './MedicalExpert/MedicalExpert';
// import CustomerSay from './CustomerSay/CustomerSay';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';
import VideoBanner from './VideoBanner/VideoBanner';
import styles from './home-page.module.scss';
import Carousel from './Carousel/Carousel';
import { useEffect, useState } from 'react';

export default  function Home(homePageData) {
    const {kuwaUsps=[],data=[],brandUMustTry=[],secondryBanners=[],bestSellings=[],bannerImage={},primaryBanner=[],couponBanner={}} = homePageData.homePageData || {};
    useEffect(() => {
        const elem = document.getElementById("homePage");
        elem.addEventListener('scroll', onScroll);
        try {
            const isCheckViewBanner = sessionStorage.getItem("isViewedBanner");
            if(isCheckViewBanner){
                const mainContainer = document.getElementById('main-container');
                mainContainer.scrollIntoView()
            }
        } catch (error) {
            
        }
        
    },[]);

    const onScroll = () => {
        try {
            const yscroll = document.getElementById('scoll-image').getBoundingClientRect().y;
            const mainContainer = document.getElementById('main-container');
            if(yscroll < -70){
                mainContainer.style.overflow = 'auto'
            }else{
                mainContainer.style.overflow = 'hidden';
                sessionStorage.setItem('isViewedBanner',true)
            }
        } catch (error) {
            
        }
    }

    return(

        <div className={styles.homePageWrapper}>
            <div className={styles.homePageContainer} id="homePage">
                <div className={styles.mainBanner}>
                   {bannerImage.type === "VIDEO" ?
                    (<VideoBanner videoImage={bannerImage.mobileVideo} videoDesktopImage={bannerImage.desktopVideo} videoRedirection={bannerImage.videoRedirectionLink} />
                    ) : (
                        <Banner mobileImage={bannerImage.mobileImage} desktopImage={bannerImage.desktopImage} imageRedirection={bannerImage.imageRedirectionLink} />
                    )}
                
                    <img id="scoll-image" className={styles.swipeImg} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/95JuYPY9Wr.gif' alt='swipe'/>
                </div>
                <div className={styles.mainContainer} id="main-container">
                   
                    <Header couponBanner={couponBanner} />
                    <Carousel data={primaryBanner}/>
                    <AssuredInfo assuredInfo={kuwaUsps} />
                    <BestSellingProduct data={bestSellings} />
                    <SecondaryBanner data={secondryBanners}/>
                    <BrandMustTry data={brandUMustTry}/>
                    {
                        data.map((product,index)=>{
                            return(
                            <ProductSlider data={product} index={index} key={index} totalRow={data.length || 1}/>
                            )
                        })
                    }
                    <MedicalExpert />
                    {/* <CustomerSay /> */}
                    <Footer />
                    <Loader />
                    </div>
            </div>
        </div>
      
    )
}

