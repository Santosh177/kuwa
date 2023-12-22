'use client'
import React,{useState} from 'react'
import ProductSlider from "./ProductSlider/ProductSlider"
import styles from './best-selling.module.scss'
const BestSelling = ({bestSellerCollectioWithProducts}) => {
    console.log("bestSellerCollectioWithProducts",bestSellerCollectioWithProducts)
    const [selectedCollection, setSelectedCollection] = useState(null);

    const BestSelling = {
        product: selectedCollection
          ? bestSellerCollectioWithProducts
              .find((data) => data.id === selectedCollection)
              .products
          : [],
        headerTitle: "",
      };
    const handleCollectionClick = (collectionId) => {
        setSelectedCollection(collectionId);
      };
    if (bestSellerCollectioWithProducts && bestSellerCollectioWithProducts.length > 0) {
        return (
          <>
            <div className={styles.bestSellingContainer}>
              <div className={styles.collectionScrollContainer}>
                <div className={styles.collectionList}>
                  {bestSellerCollectioWithProducts.map((data, index) => (
                    <div
                      key={data.id}
                      className={`${styles.collectionName} ${selectedCollection === data.id ? styles.selected : ''}`}
                      onClick={() => handleCollectionClick(data.id)}
                    >
                      {data.name}
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