import Banner from './Banner/Banner';
import Header from '@/components/Header/Header';
import AssuredInfo from './AssuredInfo/AssuredInfo';
import BestSellingProduct from './BestSellingProduct/BestSellingProduct';
import BrandMustTry from './BrandMustTry/BrandMustTry';
import SecondaryBanner from './SecondaryBanner/SecondaryBanner';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import MedicalExpert from './MedicalExpert/MedicalExpert';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/Loader/Loader';
import VideoBanner from './VideoBanner/VideoBanner';
import styles from './home-page.module.scss';

export default async function Home(homePageData) {
    console.log("homePageData",homePageData)
    const {kuwaUsps=[],data=[],brandUMustTry=[],secondryBanners=[] } = homePageData.homePageData || {};



    return(

        <div className={styles.homePageWrapper}>
            <div className={styles.homePageContainer}>
                <div className={styles.mainBanner}>
                    <Banner />
                    {/* <VideoBanner /> */}
                </div>
                <div className={styles.mainContainer}>
                    <Header />
                
                    <AssuredInfo assuredInfo={kuwaUsps} />
                    <BestSellingProduct data={data} />
                    <BrandMustTry data={brandUMustTry}/>
                    <SecondaryBanner data={secondryBanners}/>
                    {
                    data.map((data,index)=>{
                        return(
                        <ProductSlider data={data} index={index}/>
                        )
                    })
                    }
                    <MedicalExpert />
                    <Footer />
                    <Loader />
                    </div>
            </div>
        </div>
      
    )
}
