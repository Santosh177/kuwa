'use client'

import React, { useEffect, useState } from "react";
import styles from './ProductImageSection.module.scss'
import Glider from 'react-glider';
import "glider-js/glider.min.css";

const ProductImageSection = ({ }) => {
    const [CurrentImage, setCurrentImage] = useState("");
    const [imageCount, setImageCount] = useState(0)
    const images = ["https://valeo-qa-media.s3.ap-south-1.amazonaws.com/Tribulus-333x235_1675403245987.png", "https://valeo-qa-media.s3.ap-south-1.amazonaws.com/IV-December-Blog-Horizontal_1675403171780.jpg", "https://valeo-qa-media.s3.ap-south-1.amazonaws.com/LoveYourKidney_1675403171457.png"]
    useEffect(() => {
        setCurrentImage(images[imageCount]);
    }, [imageCount])
    const handelOnCLick = (action) => {
        if (action === "prev" && imageCount > 0) {
            setImageCount(imageCount - 1)
        }
        if (action === "next" && imageCount < (images.length - 1)) {
            console.log(imageCount + 1, images.length, "images.length")
            setImageCount(imageCount + 1)
        }

    }
    const handleTransitionEnd = () =>{
        console.log("helloooo")
    }

    const [width, setWidth] = useState(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [width]);
    if (images && images.length > 0) {
        return (
            <div className={styles.imageSectionContainer}>
                {/* <div className={styles.imageSectionOuter}>
                    <div className={styles.previous} onClick={()=>handelOnCLick("prev")}>
                        <img src="https://d25uasl7utydze.cloudfront.net/kuwa/right%20arrow.png" alt="left" />
                    </div>
                    <div className={styles.imageSection}  onTransitionEnd={handleTransitionEnd}>
                        <div className={styles.imageContainer}>
                            <img src={CurrentImage} alt={"productImage"} />
                        </div>
                    </div>
                    <div className={styles.next}  onClick={()=>handelOnCLick("next")} >
                        <img src="https://d25uasl7utydze.cloudfront.net/kuwa/left%20arrow.png" alt="right" />
                    </div>
                </div>
                <div className={styles.drop}>
                    {images.map((item,key)=>{
                        return(
                            <div className={[styles.dot,(key === imageCount ? styles.biggerDot : "")].join(" ")}></div>
                        )
                    })}
                </div> */}
                <Glider
                    hasArrows
                    slidesToShow={1}
                    slidesToScroll={1}
                    hasDots
                    draggable = {false}
                    scrollLock={true}
                    gap={"20px"}
                    itemWidth={(width > 990) ? 204 : 138}
                    iconLeft={
                        <img style={{width:48,height:48}} src='https://d25uasl7utydze.cloudfront.net/kuwa/right%20arrow.png' alt='left-icon' />
                    }
                    iconRight={
                        <img style={{width:48,height:48}} src='https://d25uasl7utydze.cloudfront.net/kuwa/left%20arrow.png' alt='right-icon' />
                    }
                    responsive={[
                        {
                          breakpoint: 864,
                          settings: {
                            hasArrows : false,
                            iconLeft: null,
                            iconRight: null,
                          },
                        },
                      ]}
                >
                    {images.map((item,i) => {
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
        )
    } else {
        return (<></>)
    }
}

export default ProductImageSection