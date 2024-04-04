'use client'

import React, { useEffect, useState } from "react";
import styles from './ProductImageSection.module.scss'
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import ImageSlider from "@/components/ImageSlider/imageSlider";

const ProductImageSection = ({ allImages, dealTag, dealIconUrl, isDealActive, isTimerActive = false, currentTimerStatus, isVariantCurrenTimeStatus = "", isVariantDealActive, isVariantTimeActive, variantdealId = "", selectedVariantTag = "", seleVariantIcon = "",normalInventory,selectedVariantQuantity }) => {
    // const images = ["https://valeo-qa-media.s3.ap-south-1.amazonaws.com/Tribulus-333x235_1675403245987.png", "https://valeo-qa-media.s3.ap-south-1.amazonaws.com/IV-December-Blog-Horizontal_1675403171780.jpg", "https://valeo-qa-media.s3.ap-south-1.amazonaws.com/LoveYourKidney_1675403171457.png"]
    const images = allImages;
    console.log("selectedVariantTag", selectedVariantTag)
    if (images && images.length > 0) {
        return (
            <div className={styles.imageSectionContainer}>

                <div className={styles.isDesktop}>
                    {isDealActive && isTimerActive &&
                        currentTimerStatus == "in-between" &&
                        (dealIconUrl || dealTag) &&
                        <div className={styles.tagContainer}>
                        <div className={styles.tagSection} >
                            <div className={styles.tagDiv}>

                                {dealIconUrl && <img src={dealIconUrl}></img>}
                                {dealTag && <div className={styles.tagTxt}>{dealTag}</div>}
                            </div>
                            </div>
                        </div>
                    }

                    {isVariantDealActive && isVariantTimeActive && variantdealId
                        && isVariantCurrenTimeStatus == "in-between" &&
                        (seleVariantIcon || selectedVariantTag) &&
                        <div className={styles.tagContainer}>
                        <div className={styles.tagSection} >
                              <div className={styles.tagDiv}>
                          {seleVariantIcon &&  <img src={seleVariantIcon}></img>}
                         { selectedVariantTag && <div className={styles.tagTxt}>{selectedVariantTag}</div>}
                            </div>
                            </div>

                        </div>}
                    <div>
                 
                    <ImageSlider images = {images} normalInventory={normalInventory} selectedVariantQuantity={selectedVariantQuantity}/>
                    </div>
                </div>

                <div className={styles.isMobile}>
                    <Glider
                        slidesToShow={"auto"}
                        slidesToScroll={1}
                        hasDots
                        draggable={false}
                        scrollLock={true}
                        itemWidth={278}
                    >
                        {images.map((item, i) => {
                            const { imageUrl = "" } = item || {};
                            return <>
                                <div className={styles.imageSection} key={i}>
                                {
            selectedVariantQuantity == null ? (
            normalInventory <= 0 && <div className={styles.outOfStockTxtMob}>Out of stock</div>
            ) : (
            selectedVariantQuantity <= 0 && <div className={styles.outOfStockTxtMob}>Out of stock</div>
            )
        }
                            { isDealActive && isTimerActive && currentTimerStatus == "in-between" &&  
                            (dealIconUrl || dealTag) &&
                              <div className={styles.tagSection} >
                                 <div className={styles.tagDiv}>
                                 {dealIconUrl && <img src={dealIconUrl}></img>}
                                 {dealTag && <div className={styles.tagTxt}>{dealTag}</div>}
                                        </div>
                                      
                                    </div>}
                                    
                                       
                                    {
                                        variantdealId && isVariantDealActive && isVariantTimeActive
                                        && isVariantCurrenTimeStatus == "in-between" &&
                                        (seleVariantIcon || selectedVariantTag) &&
                                        <div className={styles.tagSection} >
                                              <div className={styles.tagDiv}>
                                       {seleVariantIcon && <img src={seleVariantIcon}></img>}
                                     {selectedVariantTag && <div className={styles.tagTxt}>{selectedVariantTag}</div>}
                                        </div>
                                        </div>

                                    }

                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className={styles.imageContainer}>
                                        <img style={{ maxWidth: "278px", width: "100%",maxHeight:"280px",objectFit:"contain" }} src={item} alt={"productImage"} />
                                    </div>
                                </div>
                            </>
                        })}

                    </Glider>
                </div>
            </div>
        )
    } else {
        return (<></>)
    }
}

export default ProductImageSection