'use client';
import React, { useState, useEffect } from 'react';
import styles from './deal-section.module.scss';
import DealProductSlider from './DealProductSlider/DealProductSlider';
import DealHeaderTimer from '@/app/[lng]/components/DealHeaderTimer/DealHeaderTimer';

const DealSection = ({ data }) => {
    console.log("dealDtoList", data);
    const { deal, dealProductVariantDtoList } = data || {};
    console.log("dealProductVariantDtoList",dealProductVariantDtoList)
    const { heading, backgroundImageUrl, countDownEndsAt, countDownStartsAt,currentTimeStatus="", countryId, id, isDealActive,currentTimerValue="", isTimerActive, tagIconUrl, seoUrl, tag,headingArabic,tagArabic } = deal || {};
  
   


    // useEffect(() => {
    //     if (currentTimerValue) {
    //       const data = currentTimerValue.match(/\d+/g); // Extract digits from the string
    //       const [days, hours, minutes] = data && data.length === 3 ? data.map(Number) : [0, 0, 0];
    //       const totalSeconds = days * 24 * 3600 + hours * 3600 + minutes * 60;
    //       setTimer(totalSeconds);
    //     } else {
    //       setTimer(0);
    //     }
    //   }, [currentTimerValue,currentTimeStatus]);
  
  


  
   

    return (
        <>
            {isDealActive && dealProductVariantDtoList.length>0 && (
                <div  style={{backgroundImage: `url('${backgroundImageUrl}')`}}>
                <div className={styles.dealContainer}>
                    {/* <div className={styles.dealHeader}>
                        <div className={styles.headingContent}>
                        <div className={styles.dealHeading}>{heading}</div>
                        {isTimerActive &&
                         currentTimeStatus == "in-between" && 
                        (
                            <div className={styles.timeDurationDiv}>
                                <div className={styles.timeTxt}>Valid till</div>
                                <div className={styles.dealTimeDuration}>
                                    <div className={styles.timerDiv}>{remainingDays}d</div>
                                    <div className={styles.timerDiv}>{remainingHour}h</div>
                                    <div className={styles.timerDiv}>{remainingMin}m</div>
                                    <div className={styles.timerDiv}>{remainingSec}s</div>
                                </div>
                            </div>
                        )}
                        </div>
                        <div className={styles.seeAllDiv} onClick={handleAllProduct}>
                            <div className={styles.txt}>See all</div>
                            <div className={styles.arrowImg}><img src='https://d25uasl7utydze.cloudfront.net/assets/right%20arrow.svg' /></div>
                        </div>
                    </div> */}
                    <DealHeaderTimer isDealActive={isDealActive} isTimerActive={isTimerActive} currentTimerValue={currentTimerValue} currentTimeStatus={currentTimeStatus} heading={heading} seoUrl={seoUrl} headingArabic={headingArabic}/>
                    <div className={styles.dealProductsContainer}>
                        <DealProductSlider data={dealProductVariantDtoList} tagIconUrl={tagIconUrl} tag={tag} isDealActive={isDealActive} isTimerActive={isTimerActive} currentTimeStatus={currentTimeStatus} tagArabic={tagArabic} />
                    </div>
                </div>
                </div>
            )}
        </>
    );
};

export default DealSection;
