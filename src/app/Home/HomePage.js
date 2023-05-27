
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

export default async function Home({homePageDataResp={}}) {


   
  const {kuwaUsps=[],data=[],brandUMustTry=[] } = homePageDataResp || {};


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
