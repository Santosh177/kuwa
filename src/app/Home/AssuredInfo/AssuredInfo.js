'use client'
import styles from './assured-info.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

{/* <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/assuredInfo.png' alt='logo'></img> */}


const AssuredInfoCard = ({data={}}) => {
    return(
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




const AssuredInfo = ({assuredInfo=[]}) => {

    return(

        <div className={styles.assuredInfoWrapper}>
            {
                assuredInfo.map((data,index)=><AssuredInfoCard key={index} data={data} />)
            }
        </div>
           

    )



}


export default AssuredInfo;

  