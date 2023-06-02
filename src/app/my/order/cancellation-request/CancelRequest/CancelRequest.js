
import styles from './cancel-request.module.scss';


const CheckBox = ({ isChecked=false }) => {
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={true} />
        <span className={styles.checkmark}></span>
      </div>
    );
  };
const ReasonCard = () => {

    return(
        <div className={styles.reasonCard}>
            <CheckBox />
            <div className={styles.reasonTxt}>I have changed my mind</div>
        </div>
    )
}


export default async function CancelRequest({}) {



  return (
    <div className={styles.cancelRequest}>
        <div className={styles.headerTxt}>Reason for cancellation</div>
        <div>
            <ReasonCard />  
        </div>


    </div>

  )
}
