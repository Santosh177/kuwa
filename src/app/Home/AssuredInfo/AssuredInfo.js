'use client'
import styles from './assured-info.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";

{/* <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/assuredInfo.png' alt='logo'></img> */}


const AssuredInfoCard = () => {
    return(
        <div className={styles.assuredInfoCard}>
            <div className={styles.assuredCard}>
                    <div className={styles.assuredIcon}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/assets/assuredInfo.png' alt='logo'></img>
                    </div>
                    <div className={styles.assuredTxt}>Free Home Delivery</div>
                    <div className={styles.assuredSubTxt}>Above 100 AED</div>
            </div>
        </div>
    )
}




const AssuredInfo = () => {

    return(

        <div className={styles.assuredInfoWrapper}>
          <AssuredInfoCard/>
          <AssuredInfoCard />
          <AssuredInfoCard />

        </div>
           

    )



}


export default AssuredInfo;

  