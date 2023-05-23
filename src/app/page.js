import Image from 'next/image'
import styles from './page.module.css';
import Homew from './Home';
import Header from '@/components/Header/Header';
import AssuredInfo from './Home/AssuredInfo/AssuredInfo';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import ProductCard from '@/components/ProductCard/ProductCard';
import MedicalExpert from './Home/MedicalExpert/MedicalExpert';
import Blogs from './Home/Blogs/Blogs';
import Footer from '../components/Footer/Footer'
export default async function Home({data}) {


   
  const homePageData  =  await fetch('https://api.kuwa.bevaleo.dev/module/home-page?country=1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const homePageDataResp = await homePageData.json();




  console.log("homePageDataResp",data)


  return (
    <>
        <Header />
        <AssuredInfo />
        <ProductSlider />
        <ProductSlider />
        <ProductSlider />
        <MedicalExpert />
        <Blogs />
        <Footer />
    </>

  )
}
