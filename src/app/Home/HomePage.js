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
import useCleverTapEvents from '@/hooks/useCleverTapEvents';
import { useCountry } from '@/context/contryDetails';
import ExploreCategory from './ExploreCategory/ExploreCategory';
import NewArrivals from './NewArrivals/NewArrivals';
import BestSelling from './BestSelling/BestSelling';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isSafariOniOS = /iP(hone|ad|od).+Version\/[\d.]+.*Safari/i.test(navigator.userAgent);

export default function Home(homePageData) {
    const { kuwaUsps = [], data = [], brandUMustTry = [], secondryBanners = [], bestSellings = [], bannerImage = {}, primaryBanner = [], couponBanner = {}, menuItemsHealths=[],bestSellerCollectioWithProducts=[], newArrivals=[],brandMain={} } = homePageData.homePageData || {};
    const { selectedCountry={} }=useCountry()||{};
    const clevertapEvent=useCleverTapEvents();
    useEffect(() => {
        const elem = document.getElementById("homePage");
        elem.addEventListener('scroll', onScroll);
        try {
            const isCheckViewBanner = sessionStorage.getItem("isViewedBanner");
            if (isCheckViewBanner) {
                const mainContainer = document.getElementById('main-container');
                mainContainer.scrollIntoView()
            }
        } catch (error) {

        }

    }, []);
    useEffect(() => {
        setTimeout(()=>{
            clevertapEvent.onCleverTapEvent("kuwa_home_page_landing");
        },2000)
       
        try {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-9ZH5J03SH9'); 
        } catch (error) {
            
        }
        // if(selectedCountry.id===8){
        
        // }
    }, [])

    const onScroll = () => {
        try {
            const yscroll = document.getElementById('scoll-image').getBoundingClientRect().y;
            const mainContainer = document.getElementById('main-container');
            if (yscroll < -70) {
                mainContainer.style.overflow = 'auto'
            } else {
                mainContainer.style.overflow = 'hidden';
                sessionStorage.setItem('isViewedBanner', true)
            }
        } catch (error) {

        }
    }

    console.log("isSafari",isSafari)

    return (

        <div className={styles.homePageWrapper}>
            <div className={(isSafariOniOS)?{}:styles.homePageContainer} id="homePage">
                <div className={styles.mainBanner} style={(isSafariOniOS)?{}:{scrollSnapAlign:'start'}}>
                    {bannerImage.type === "VIDEO" ?
                        (<VideoBanner videoImage={bannerImage.mobileVideo} videoDesktopImage={bannerImage.desktopVideo} videoRedirection={bannerImage.videoRedirectionLink} />
                        ) : (
                            <Banner bannerBackground={bannerImage.colorHexCode} mobileImage={bannerImage.mobileImage} desktopImage={bannerImage.desktopImage} imageRedirection={bannerImage.imageRedirectionLink} />
                        )}

                    <img id="scoll-image" className={styles.swipeImg} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/95JuYPY9Wr.gif' alt='swipe' />
                </div>
                <div className={styles.mainContainer} id="main-container" style={(isSafariOniOS)?{}:{height:'100vh',scrollSnapAlign:'start'}}>

                    <Header couponBanner={couponBanner} />
                    {/* <div className={styles.searchInputWrapper} onClick={()=>window.location.href="/search"} >
                        <input  className={styles.searchInput}  value={""}  placeholder='Search by product name' type='text' />
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/search.png' alt='search-icon'/>
                    </div> */}
                    <Carousel data={primaryBanner}/>
                    <AssuredInfo assuredInfo={kuwaUsps} />
                    <ExploreCategory exploreCategory={menuItemsHealths}/>
                    <BestSelling bestSellerCollectioWithProducts={bestSellerCollectioWithProducts}/>
                    <SecondaryBanner data={secondryBanners} />
                    <BrandMustTry data={brandMain} />
                    <NewArrivals data={newArrivals}/>
                    
                    {/* <BestSellingProduct data={bestSellings} /> */}
                   
                   
                    {
                        data.map((product, index) => {
                            return (
                                <ProductSlider data={product} index={index} key={index} totalRow={data.length || 1} />
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

