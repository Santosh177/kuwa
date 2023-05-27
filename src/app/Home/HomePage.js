'use client';
import React,{useState} from 'react';
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

export default async function Home(homePageData) {

  const {kuwaUsps=[],data=[],brandUMustTry=[] } = homePageData || {};
//   const [y, setY] = useState(0);


//   useEffect(() => {
  
//     window.addEventListener("scroll", handleNavigation);
  
//     return () => {
//       window.removeEventListener("scroll", handleNavigation);
//     };
//   }, []);

//   const handleNavigation = useCallback(
//     e => {
//       const window = e.currentTarget;
//       if (y > window.scrollY) {
//         console.log("scrolling up");
//       } else if (y < window.scrollY) {
//         console.log("scrolling down");
//       }
//     //   setY(window.scrollY);
//     }, [y]
//   );
  

//   console.log("yy",y)
  return (
    <>
    <div>

 
        <Banner />
        <Header />
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
        <Loader />
        </div>
    </>

  )
}
