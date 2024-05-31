import ProductSlider from './ProductSlider/ProductSlider';
import './new-arrivals.module.scss'
import { useLanguage } from '@/context/languageDetails';

const NewArrivals = ({data}) => {
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

 const newArrivals = {
        product : data,
        headerTitle:isArabic ? "المنتجات الجديدة " : "New Arrivals"
      }
      if(data && data.length > 0){

  return (
    
         <div>
            <ProductSlider data={newArrivals}/>
         </div>
    )
  }else{
    return null;
  }
}

export default NewArrivals