import Image from 'next/image'
import styles from './page.module.css';
import Homew from './Home';
import Banner from './Home/Banner/Banner';
import Header from '@/components/Header/Header';
import AssuredInfo from './Home/AssuredInfo/AssuredInfo';
import BestSellingProduct from './Home/BestSellingProduct/BestSellingProduct';
import BrandMustTry from './Home/BrandMustTry/BrandMustTry';
import SecondaryBanner from './Home/SecondaryBanner/SecondaryBanner';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import ProductCard from '@/components/ProductCard/ProductCard';
import MedicalExpert from './Home/MedicalExpert/MedicalExpert';
import Blogs from './Home/Blogs/Blogs';
import Footer from '../components/Footer/Footer';
import Loader from '@/components/Loader/Loader';

export default async function Home({}) {


   
  const homePageData  =  await fetch('https://api.kuwa.bevaleo.dev/module/home-page?country=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { revalidate: 0} 
  })
  const homePageDataResp = await homePageData.json();




  console.log("homePageDataResp",homePageDataResp)

  const {kuwaUsps=[],data=[],brandUMustTry=[] } = homePageDataResp || {};


  return (
    <>
    <Banner />
        {/* <div className={styles.mobileBanner}> */}
          {/* <img style={{width:'100%',height:'100%'}} src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/top_banner_desktop+(1).png' /> */}
          {/* <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/top_banner_mobile+(1).png' /> */}
        {/* </div> */}
        {/* <Header />
        <AssuredInfo assuredInfo={kuwaUsps} />
        <BestSellingProduct data={data} />
        <BrandMustTry data={brandUMustTry}/>
        <SecondaryBanner />
        {
          data.map((data,index)=>{
            console.log("datatad",data)
            return(
              <ProductSlider data={data} index={index}/>
            )
          })
        }
        <MedicalExpert />
        <Footer />
        <Loader /> */}
    </>

  )
}
