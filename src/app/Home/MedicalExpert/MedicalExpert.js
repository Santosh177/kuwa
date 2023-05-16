
import styles from './medical-expert.module.scss';

const MedicalExpertData = [
    {
        "name":"Michael Ash",
        "expert":"Technical Advisor, R&D",
        "profileImg":"https://d25uasl7utydze.cloudfront.net/kuwa/Michael_Ash.png"
    },
    {
        "name":"Jamie Richards",
        "expert":"Technical Advisor, R&D",
        "profileImg":"https://d25uasl7utydze.cloudfront.net/kuwa/Jamie_Richards.png"
    }
]


const MedicalExpert = () => {

    return(
       <div>
            <h3 className={styles.headerTxt}>Meet Our Medical Experts & Health Coaches</h3>
            <div className={styles.medicalExpertWrapper}>
                {
                MedicalExpertData.map((data,index)=>
                <div className={styles.medicalExpertContainer}>
                    <img src={data.profileImg} alt=''/>
                    <div className={styles.doctorName}>{data.name}</div>
                    <div className={styles.doctorOcc}>{data.expert}</div>
                </div>)  
                }
            </div>
       </div>
    )
}


export default MedicalExpert;

  