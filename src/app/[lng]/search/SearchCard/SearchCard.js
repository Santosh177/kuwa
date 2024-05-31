import styles from './searchCard.module.scss';
import { useRouter,usePathname } from 'next/navigation';
import { useLanguage } from '@/context/languageDetails';



export default function SearchCard({searchData={}}) {
    const router = useRouter();
    const { productImage="", productName="", id="", seoUrl="", productNameArabic =""} = searchData || {};
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();


    return (
        <div className={styles.searchCard} onClick={()=>router.push(`/products/${seoUrl}`)} id="search-container">
            <div className={styles.productContainer} id="search-container">
                <div className={styles.productImage} id="search-container">
                    <img src={productImage}  alt='product-image' id="search-container"/>
                </div>
                <div className={styles.productName} id="search-container">{isArabic ? productNameArabic :  productName}</div>
            </div>
        </div>
    )
}