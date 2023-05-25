import Image from 'next/image'
import styles from './page.module.css';
import Homew from './Home';
import Header from '@/components/Header/Header';
import AssuredInfo from './Home/AssuredInfo/AssuredInfo';
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

  const {data=[], } = homePageDataResp || {};


  return (
    <>
        <Header />
        <AssuredInfo />
        <BrandMustTry />
        <SecondaryBanner />
        {
          data.map((data,index)=>{
            console.log("datatad",data)
            return(
              <ProductSlider data={data}/>
            )
          })
        }
        <MedicalExpert />
        {/* <Blogs /> */}
        <Footer />
        <Loader />
    </>

  )
}
