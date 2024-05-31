'use client'
import React,{useState} from 'react'
import { useRef } from 'react'
import ProductSlider from "./ProductSlider/ProductSlider"
import styles from './best-selling.module.scss'
import { useLanguage } from '@/context/languageDetails'
const BestSelling = ({bestSellerCollectioWithProducts}) => {
  const useRefscroll = useRef()
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    console.log("bestSellerCollectioWithProducts",bestSellerCollectioWithProducts)
    const [selectedCollection, setSelectedCollection] = useState( bestSellerCollectioWithProducts.length > 0
      ? bestSellerCollectioWithProducts[0]?.id
      : null);

  const bestSellerHeadings = bestSellerCollectioWithProducts
    .map(data => data?.products?.map(product => product?.heading))
    .flat() 
    .find(heading => heading !== undefined)?.split(" ")
    const headingFirstWord = bestSellerHeadings ? bestSellerHeadings[0] : ""

    const bestSellerHeadingsArabic = bestSellerCollectioWithProducts
    .map(data => data?.products?.map(product => product?.headingArabic))
    .flat() 
    .find(heading => heading !== undefined)?.split(" ")
    const headingFirstWordArabic = bestSellerHeadingsArabic ? bestSellerHeadingsArabic[0] : ""

    const BestSelling = {
        product: selectedCollection
          ? bestSellerCollectioWithProducts
              .find((data) => data?.id === selectedCollection)
              .products
          : [],
      headerTitle:"",
      };
    const handleCollectionClick = (collectionId) => {
        setSelectedCollection(collectionId);
        useRefscroll.current.scrollLeft = 100
      };
    if (bestSellerCollectioWithProducts && bestSellerCollectioWithProducts.length > 0) {
        return (
          <>
            <div className={styles.bestSellingContainer}>
              
              <div className={styles.heading}> <span className={styles.firstWord}>{isArabic ? headingFirstWordArabic : headingFirstWord}</span> {isArabic ? bestSellerHeadingsArabic?.slice(1).join(" ") :  bestSellerHeadings?.slice(1).join(" ")}</div>
              <div className={styles.collectionScrollContainer}>
                <div className={styles.collectionList}>
                  {bestSellerCollectioWithProducts.map((data, index) => (
                    <div ref = {useRefscroll}
                      key={data.id}
                      className={`${styles.collectionName} ${selectedCollection === data?.id ? styles.selected : ''}`}
                      onClick={() => handleCollectionClick(data.id)}
                    >
                      {isArabic ? data?.nameArabic : data?.name}
                    </div>
                  
                  ))}   
                </div>
              </div>
              <ProductSlider data={BestSelling}/>
            
               
            
            </div>
          </>
        );
      }else{
        return null;
      }
}

export default BestSelling