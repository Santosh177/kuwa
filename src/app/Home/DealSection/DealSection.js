'use client';
import React, { useState, useEffect } from 'react';
import styles from './deal-section.module.scss';
import DealProductSlider from './DealProductSlider/DealProductSlider';

const DealSection = ({ data }) => {
    console.log("dealDtoList", data);
    const { deal, dealProductVariantDtoList } = data || {};
    const { heading, backgroundImageUrl, countDownEndsAt, countDownStartsAt, countryId, id, isDealActive, isTimerActive, tagIconUrl, seoUrl, tag } = deal || {};
    const [time,setTime]=useState({hr:0,min:0,sec:0,days:0})
    const startDate = new Date(countDownStartsAt);  
    const endDate = new Date(countDownEndsAt);
    let duration = endDate - startDate;

    // const formatDuration = (duration) => {
    //     // Convert milliseconds to days, hours, minutes, and seconds
    //     const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    //     const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    //     // Format the remaining time
    //     // setTime(prevState=>({
    //     //     ...prevState,hr:hours,min:minutes,sec:seconds,days:days
    //     // }))
    //     return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    // };
    // const formattedDuration = formatDuration(duration);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         duration -= 1000;
    //         const formattedDuration = formatDuration(duration);

    //         console.log(formattedDuration); 
    //         if (duration <= 0) {
    //             clearInterval(intervalId);
    //             console.log("Countdown ended");
    //         }
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []);
console.log("time",time)
    const handleAllProduct = () => { };

    return (
        <>
            {isDealActive && (
                <div className={styles.dealContainer}>
                    <div className={styles.dealHeader}>
                        <div className={styles.headingContent}>
                        <div className={styles.dealHeading}>{heading}</div>
                        {/* isTimerActive && */}
                        { (
                            <div className={styles.timeDurationDiv}>
                                <div className={styles.timeTxt}>Valid till</div>
                                <div className={styles.dealTimeDuration}>
                                    <div className={styles.timerDiv}></div>
                                    <div className={styles.timerDiv}></div>
                                    <div className={styles.timerDiv}></div>
                                    <div className={styles.timerDiv}></div>
                                </div>
                            </div>
                        )}
                        </div>
                        <div className={styles.seeAllDiv} onClick={handleAllProduct}>
                            <div className={styles.txt}>See all</div>
                            <div className={styles.arrowImg}><img src='https://d25uasl7utydze.cloudfront.net/assets/right%20arrow.svg' /></div>
                        </div>
                    </div>
                    <div className={styles.dealProductsContainer}>
                        <DealProductSlider data={dealProductVariantDtoList} />
                    </div>
                </div>
            )}
        </>
    );
};

export default DealSection;
