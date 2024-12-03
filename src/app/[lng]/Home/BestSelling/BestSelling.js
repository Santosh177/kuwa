'use client'
import React,{useState} from 'react'
import { useRef } from 'react'
import ProductSlider from "./ProductSlider/ProductSlider"
import styles from './best-selling.module.scss'
import { useLanguage } from '@/context/languageDetails'
const BestSelling = ({bestSellerHomePageDto}) => {
  console.log("bestSellerCollectionWithProducts",bestSellerHomePageDto)
  const bestSellerCollectionWithProducts = bestSellerHomePageDto.bestSellerCollectionWithProducts || []
  const useRefscroll = useRef()

  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  
    const [selectedCollection, setSelectedCollection] = useState( bestSellerCollectionWithProducts.length > 0
      ? bestSellerCollectionWithProducts[0]?.collectionId
      : null);

  const bestSellerHeadings = bestSellerHomePageDto.heading?.split(" ")
  //  bestSellerCollectioWithProducts
  //   .map(data => data?.products?.map(product => product?.heading))
  //   .flat() 
  //   .find(heading => heading !== undefined)?.split(" ")
    const headingFirstWord = bestSellerHeadings ? bestSellerHeadings[0] : ""

    const bestSellerHeadingsArabic = bestSellerHomePageDto.headingArabic?.split(" ")
    // bestSellerCollectioWithProducts
    // .map(data => data?.products?.map(product => product?.headingArabic))
    // .flat() 
    // .find(heading => heading !== undefined)?.split(" ")
    const headingFirstWordArabic = bestSellerHeadingsArabic ? bestSellerHeadingsArabic[0] : ""

    const BestSelling = {
        product: selectedCollection
          ? bestSellerCollectionWithProducts
              .find((data) => data?.collectionId === selectedCollection)
              .productVariantDtoList
          : [],
      headerTitle:"",
      };
    const handleCollectionClick = (collectionId) => {
        setSelectedCollection(collectionId);
        useRefscroll.current.scrollLeft = 100
      };
    if (bestSellerCollectionWithProducts && bestSellerCollectionWithProducts.length > 0) {
        return (
          <>
            <div className={styles.bestSellingContainer}>
              
              <div className={styles.heading}> <span className={styles.firstWord}>{isArabic ? headingFirstWordArabic : headingFirstWord}</span> {isArabic ? bestSellerHeadingsArabic?.slice(1).join(" ") :  bestSellerHeadings?.slice(1).join(" ")}</div>
              <div className={styles.collectionScrollContainer}>
                <div className={styles.collectionList}>
                  {bestSellerCollectionWithProducts.map((data, index) => (
                    <div ref = {useRefscroll}
                      key={data.collectionId}
                      className={`${styles.collectionName} ${selectedCollection === data?.collectionId ? styles.selected : ''}`}
                      onClick={() => handleCollectionClick(data.collectionId)}
                    >
                      {isArabic ? data?.collectionNameArabic : data?.collectionName}
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