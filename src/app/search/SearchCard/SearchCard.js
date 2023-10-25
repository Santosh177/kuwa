import styles from './searchCard.module.scss';
import { useRouter,usePathname } from 'next/navigation';



export default function SearchCard({searchData={}}) {
    const router = useRouter();
    const { productImage="", productName="", id="", seoUrl="" } = searchData || {};

    return (
        <div className={styles.searchCard} onClick={()=>router.push(`/products/${seoUrl}`)} id="search-container">
            <div className={styles.productContainer} id="search-container">
                <div className={styles.productImage} id="search-container">
                    <img src={productImage}  alt='product-image' id="search-container"/>
                </div>
                <div className={styles.productName} id="search-container">{productName}</div>
            </div>
        </div>
    )
}