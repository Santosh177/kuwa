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

export default async function Home(homePageData) {
    console.log("homePageData",homePageData)
    const {kuwaUsps=[],data=[],brandUMustTry=[],secondryBanners=[],bestSellings=[],bannerImage={} } = homePageData.homePageData || {};


    console.log("Bannerimage",bannerImage)

    return(

        <div className={styles.homePageWrapper}>
            <div className={styles.homePageContainer}>
                <div className={styles.mainBanner}>
                   {bannerImage.type === "VIDEO" ?
                    (<VideoBanner videoImage={bannerImage.mobileVideo} videoDesktopImage={bannerImage.desktopVideo} videoRedirection={bannerImage.videoRedirectionLink} />
      ) : (
        <Banner mobileImage={bannerImage.mobileImage} desktopImage={bannerImage.desktopImage} imageRedirection={bannerImage.imageRedirectionLink} />
      )}
                
                    <img className={styles.swipeImg} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/95JuYPY9Wr.gif' alt='swipe'/>
                </div>
                <div className={styles.mainContainer}>
                   
                    <Header />
                    <Carousel/>
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

