import React,{useState,useEffect} from 'react'
import styles from './deal-header-timer.module.scss'
import { useLanguage } from '@/context/languageDetails'

const DealHeaderTimer = ({currentTimeStatus,currentTimerValue,isDealActive,isTimerActive,heading,seoUrl,headingArabic}) => {

    const [remainingDays, setRemainingDays] = useState("00")
    const [remainingHour, setRemainingHour] = useState("00")
    const [remainingMin, setRemainingMin] = useState("00")
    const [remainingSec, setRemainingSec] = useState("00")
   

    // let currentTimerValue = "1d-10h-60m"
   
    const [timer, setTimer] = useState(0); 
    const [timeData, setTimeData] = useState(0)
    const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(timeData > 0) {
                setTimer(prevTimer => prevTimer - 1);
            }
        
        }, 1000);
    
        return () => clearInterval(intervalId);
      }, [timeData]);
  
      useEffect(()=>{
  
          if(isDealActive && isTimerActive){
              if (currentTimerValue) {
                  const data = currentTimerValue.match(/\d+/g); // Extract digits from the string
                  const [days, hours, minutes] = data && data.length === 3 ? data.map(Number) : [0, 0, 0];
                  const totalSeconds = days * 24 * 3600 + hours * 3600 + minutes * 60;
                  setTimer(totalSeconds);
                  setTimeData(totalSeconds);
                } 
          }
  
      },[isDealActive,isTimerActive])
  
    useEffect(() => {
      if (timer === 1) {
        
          window.location.reload();
        }
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
  }, [timer,currentTimeStatus]);

    const handleAllProduct = () => {
        window.location.href = `/DealPage/${seoUrl}`;
     };

  return (
    <div className={styles.dealHeader}>
    <div className={styles.headingContent}>
    <div className={styles.dealHeading}>{isArabic ? headingArabic : heading}</div>
    {isTimerActive &&
     currentTimeStatus == "in-between" && 
    (
        <div className={styles.timeDurationDiv}>
            <div className={styles.timeTxt}>{isArabic ? "صالح حتى" :"Valid till"}</div>
            <div className={styles.dealTimeDuration}>
                <div className={styles.timerDiv}>{remainingDays}d</div>
                <div className={styles.timerDiv}>{remainingHour}h</div>
                <div className={styles.timerDiv}>{remainingMin}m</div>
                <div className={styles.timerDiv}>{remainingSec}s</div>
            </div>
        </div>
    )}
    </div>
    <div className={`${styles.seeAllDiv} ${isArabic ? styles['seeAllDiv-ar'] : styles['seeAllDiv-en']}` } onClick={handleAllProduct}>
        <div className={styles.txt}>{isArabic ? "اعرض المزيد " : "See all"}</div>
        <div className={`${styles.arrowImg} ${isArabic ? styles['arrowImg-ar'] : ''}`}><img src='https://d25uasl7utydze.cloudfront.net/assets/right%20arrow.svg' /></div>
    </div>
</div>
  )
}

export default DealHeaderTimer