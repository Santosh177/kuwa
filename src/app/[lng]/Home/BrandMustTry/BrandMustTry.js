'use client';
import { useRouter,useSearchParams } from 'next/navigation';
import styles from './brand-must-try.module.scss';
import ProductSlider from './ProductSlider/ProductSlider';
import { useLanguage } from '@/context/languageDetails';



const BrandMustTry = ({data={}}) => {
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();
    // const brand = data?.brand || [];
    const heading = data[0]?.brandHealthLine || ""
    const headingArabic = data[0]?.brandHealthLineArabic || ""
    const headingtWord = heading?.split(" ");
    const headingWordArabic = headingArabic?.split(" ")
    const router = useRouter();
    return(
        <>
            {data && data.length > 0 && <div className={styles.brandHeader}>{isArabic ? headingWordArabic[0] : headingtWord[0]} <span>{isArabic ? headingWordArabic?.slice(1).join(" ") : headingtWord?.slice(1).join(" ")}</span></div> }
            {data && data.length > 0 &&   <div>
            <ProductSlider data={data}/>
        </div>}
         
        
       </>
    )
}


export default BrandMustTry;

  