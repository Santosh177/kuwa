'use client'
import styles from './assured-info.module.scss';
import Glider from 'react-glider';
import "glider-js/glider.min.css";
import ScrollContainer from 'react-indiana-drag-scroll';

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
           <ScrollContainer>
             
            {
                assuredInfo.map((data,index)=><AssuredInfoCard key={index} data={data} />)
            }
       
        </ScrollContainer>
        </div>
           

    )



}


export default AssuredInfo;

  