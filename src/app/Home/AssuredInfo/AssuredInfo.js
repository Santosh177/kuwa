'use client'
import React,{useState,useEffect} from 'react';
import styles from './assured-info.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import ScrollContainer from 'react-indiana-drag-scroll';
import Marquee from "react-fast-marquee";

{/* <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/assuredInfo.png' alt='logo'></img> */ }


const AssuredInfoCard = ({ data = {} }) => {
    return (

        <div className={styles.assuredInfoCard}>
            <div className={styles.assuredCard}>
                <div className={styles.assuredIcon}>
                    <img src={data.icon} alt='logo'></img>
                </div>
                <div className={styles.assuredTxt}>{data.text}</div>
                <div className={styles.assuredSubTxt}>{data.subText}</div>
            </div>
        </div>


    )
}




const AssuredInfo = ({ assuredInfo = [] }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 990);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 990);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className={styles.assuredInfoWrapper}>
            {isDesktop ? (
                <div className={styles.assuredIfoContainer}>
                    {assuredInfo.map((data, index) => (
                        <AssuredInfoCard key={index} data={data} />
                    ))}
                </div>
            ) : (
                <div className={styles.assuredInfoWrapper}>
                    <ScrollContainer
                        style={{ display: 'flex', width: '100%', overflow: 'auto' }}
                        horizontal={true}
                        className={styles.assuredIfoContainer}
                    >
                        <Marquee pauseOnHover={true} pauseOnClick={true} speed={100} gradient={false}>
                            {assuredInfo.map((data, index) => (
                                <AssuredInfoCard key={index} data={data} />
                            ))}
                        </Marquee>
                    </ScrollContainer>
                </div>
            )}
        </div>
    );
    }
     export default AssuredInfo;                     