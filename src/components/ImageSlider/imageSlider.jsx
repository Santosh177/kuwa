'use client'
import React, { useState } from 'react';
import "./image-slider.scss"

const ImageSlider = ({ images }) => {
    const [current, setCurrent] = useState(0);
    const length = images.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(images) || images.length <= 0) {
        return null;
    }

    return (
        <section >
            <div className='slider'>
                <div className='left-arrow' onClick={prevSlide} > <img src="https://d25uasl7utydze.cloudfront.net/kuwa/right%20arrow.png" alt="" />  </div>
                <div className='all-slides'>
                    {images.map((item, index) => {
                        const { imageUrl = "" } = item || {};
                        return (
                            <div
                                className={index === current ? 'slide active' : 'slide'}
                                key={index}
                            >
                                {index === current && (
                                    <img src={item} alt='travel image' className='image' />
                                )}
                            </div>
                        );

                    })}
                </div>
                <div className='right-arrow' onClick={nextSlide} > <img src="https://d25uasl7utydze.cloudfront.net/kuwa/left%20arrow.png" alt="" /></div>
            </div>
            <div className='dots-container'>{images && images.map((item,index)=>{
                return(
                    <div className={`dots ${current === index && "selcetd-dots"}`}></div>
                )
            })}</div>
        </section>
    );
};

export default ImageSlider;