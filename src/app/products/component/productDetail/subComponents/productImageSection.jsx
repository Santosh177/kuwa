'use client'

import React, { useEffect, useState } from "react";
import styles from './ProductImageSection.module.scss'
import Glider from 'react-glider';
import "glider-js/glider.min.css";

const ProductImageSection = ({ }) => {
    const images = ["https://valeo-qa-media.s3.ap-south-1.amazonaws.com/Tribulus-333x235_1675403245987.png", "https://valeo-qa-media.s3.ap-south-1.amazonaws.com/IV-December-Blog-Horizontal_1675403171780.jpg", "https://valeo-qa-media.s3.ap-south-1.amazonaws.com/LoveYourKidney_1675403171457.png"]
    if (images && images.length > 0) {
        return (
            <div className={styles.imageSectionContainer}>
                <div className={styles.isDesktop}>
                    <Glider
                        hasArrows
                        slidesToShow={1}
                        slidesToScroll={1}
                        hasDots
                        draggable={false}
                        scrollLock={true}
                        // gap={20}
                        itemWidth={342}
                        iconLeft={
                            <img style={{ width: 48, height: 48 }} src='https://d25uasl7utydze.cloudfront.net/kuwa/right%20arrow.png' alt='left-icon' />
                        }
                        iconRight={
                            <img style={{ width: 48, height: 48 }} src='https://d25uasl7utydze.cloudfront.net/kuwa/left%20arrow.png' alt='right-icon' />
                        }
                    >
                        {images.map((item, i) => {
                            return <>
                                <div className={styles.imageSection}>
                                    <div className={styles.imageContainer}>
                                        <img src={item} alt={"productImage"} />
                                    </div>
                                </div>
                            </>
                        })}

                    </Glider>
                </div>
                <div className={styles.isMobile}>
                    <Glider
                        slidesToShow={1}
                        slidesToScroll={1}
                        hasDots
                        draggable={false}
                        scrollLock={true}
                        // gap={20}
                        itemWidth={342}
                    >
                        {images.map((item, i) => {
                            return <>
                                <div className={styles.imageSection}>
                                    <div className={styles.imageContainer}>
                                        <img src={item} alt={"productImage"} />
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