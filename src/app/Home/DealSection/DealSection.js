'use client';
import React, { useState, useEffect } from 'react';
import styles from './deal-section.module.scss';
import DealProductSlider from './DealProductSlider/DealProductSlider';

const DealSection = ({ data }) => {
    console.log("dealDtoList", data);
    const { deal, dealProductVariantDtoList } = data || {};
    console.log("dealProductVariantDtoList",dealProductVariantDtoList)
    const { heading, backgroundImageUrl, countDownEndsAt, countDownStartsAt,currentTimeStatus="", countryId, id, isDealActive, isTimerActive, tagIconUrl, seoUrl, tag } = deal || {};
    console.log("currentTimeStatus",currentTimeStatus)
    const [remainingDays, setRemainingDays] = useState("")
    const [remainingHour, setRemainingHour] = useState("")
    const [remainingMin, setRemainingMin] = useState("")
    const [remainingSec, setRemainingSec] = useState("")
    let { currentTimerValue ="" } = deal || {};

    // let currentTimerValue = "1d-10h-60m"
   
    const [timer, setTimer] = useState(0); 


    useEffect(() => {
        if (currentTimerValue) {
          const data = currentTimerValue.match(/\d+/g); // Extract digits from the string
          const [days, hours, minutes] = data && data.length === 3 ? data.map(Number) : [0, 0, 0];
          const totalSeconds = days * 24 * 3600 + hours * 3600 + minutes * 60;
          setTimer(totalSeconds);
        } else {
          setTimer(0);
        }
      }, [currentTimerValue]);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
          if(timer > 0) {
              setTimer(prevTimer => prevTimer - 1);
          }
      
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [timer]);

  useEffect(() => {
    if (timer > 0) {
        const days = Math.floor(timer / (24 * 3600));
        const hours = Math.floor((timer % (24 * 3600)) / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        setRemainingDays(days.toString().padStart(2, '0'));
        setRemainingHour(hours.toString().padStart(2, '0'));
        setRemainingMin(minutes.toString().padStart(2, '0'));
        setRemainingSec(seconds.toString().padStart(2, '0'));
    }
}, [timer]);

console.log("remaining",remainingSec)
  
    const handleAllProduct = () => {
        window.location.href = `/DealPage/${id}`;
     };

    return (
        <>
            {isDealActive && (
                <div  style={{backgroundImage: `url('${backgroundImageUrl}')`}}>
                <div className={styles.dealContainer}>
                    <div className={styles.dealHeader}>
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
                    </div>
                    <div className={styles.dealProductsContainer}>
                        <DealProductSlider data={dealProductVariantDtoList} tagIconUrl={tagIconUrl} tag={tag} isDealActive={isDealActive} isTimerActive={isTimerActive} currentTimeStatus={currentTimeStatus} />
                    </div>
                </div>
                </div>
            )}
        </>
    );
};

export default DealSection;
