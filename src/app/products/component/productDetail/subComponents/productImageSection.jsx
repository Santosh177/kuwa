'use client'

import React, { useEffect, useState } from "react";
import styles from './ProductImageSection.module.scss'
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import ImageSlider from "@/components/ImageSlider/imageSlider";

const ProductImageSection = ({ allImages }) => {
    // const images = ["https://valeo-qa-media.s3.ap-south-1.amazonaws.com/Tribulus-333x235_1675403245987.png", "https://valeo-qa-media.s3.ap-south-1.amazonaws.com/IV-December-Blog-Horizontal_1675403171780.jpg", "https://valeo-qa-media.s3.ap-south-1.amazonaws.com/LoveYourKidney_1675403171457.png"]
    const images = allImages;
    if (images && images.length > 0) {
        return (
            <div className={styles.imageSectionContainer}>
                <div className={styles.isDesktop}>
                    {/* <Glider
                        hasArrows
                        slidesToShow={"auto"}
                        slidesToScroll={1}
                        hasDots
                        draggable={false}
                        scrollLock={true}
                        itemWidth={342}
                        iconLeft={
                            <img style={{ width: 48, height: 48 }} src='https://d25uasl7utydze.cloudfront.net/kuwa/right%20arrow.png' alt='left-icon' />
                        }
                        iconRight={
                            <img style={{ width: 48, height: 48 }} src='https://d25uasl7utydze.cloudfront.net/kuwa/left%20arrow.png' alt='right-icon' />
                        }
                    >
                        {images.map((item, i) => {
                            const { imageUrl = "" } = item || {};
                            console.log(imageUrl, "imageUrlimageUrl")
                            return <>
                                <div className={styles.imageSection} key={"image_section" + i}>
                                    <div style={{display:"flex",justifyContent:"center",alignItems : "center"}} className={styles.imageContainer}>
                                        <img style={{maxWidth : "278px",width:"100%",margin:"auto"}} src={imageUrl} alt={"productImage"} />
                                    </div>
                                </div>
                            </>
                        })}

                    </Glider> */}
                    <ImageSlider images = {images}/>
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
                                    <div style={{display:"flex",justifyContent:"center",alignItems : "center"}} className={styles.imageContainer}>
                                        <img style={{maxWidth : "278px",width:"100%"}} src={item} alt={"productImage"} />
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