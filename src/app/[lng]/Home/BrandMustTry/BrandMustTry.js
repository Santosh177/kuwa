'use client';
import { useRouter,useSearchParams } from 'next/navigation';
import styles from './brand-must-try.module.scss';
import ProductSlider from './ProductSlider/ProductSlider';
import { useLanguage } from '@/context/languageDetails';



const BrandMustTry = ({data={}}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    console.log("brands",data)
    const brand = data?.brand || [];
    const heading = data?.heading || ""
    const headingArabic = data?.headingArabic || ""
    const headingtWord = heading?.split(" ");
    const headingWordArabic = headingArabic?.split(" ")
    const router = useRouter();
    return(
        <>
            {brand && brand.length > 0 && <div className={styles.brandHeader}>{isArabic ? headingWordArabic[0] : headingtWord[0]} <span>{isArabic ? headingWordArabic?.slice(1).join(" ") : headingtWord?.slice(1).join(" ")}</span></div> }
            {brand && brand.length > 0 &&   <div>
            <ProductSlider data={data}/>
        </div>}
         
        
       </>
    )
}


export default BrandMustTry;

  