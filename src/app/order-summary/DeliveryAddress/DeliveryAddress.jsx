import styles from './delivery-address.module.scss';

export default function DeliveryAddress() {



    console.log("ht")
  
      return (
        <div className={styles.deliveryAddress}> 
            <div className={styles.actionItem}>
                <div className={styles.headerTxt}>Delivery address</div>
                <div className={styles.changeAction}>
                    <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                    <div className={styles.changeTxt}>Change</div>
                </div>
            </div>
            <div className={styles.name}>Karif Daoud</div>
            <div className={styles.txt}>12th Floor Yes Business Centre Al Barsha – Dubai United Arab Emirates</div>
            <div className={styles.txt}>Phone no : 971-8996689</div>
        </div>
      )
    }
    