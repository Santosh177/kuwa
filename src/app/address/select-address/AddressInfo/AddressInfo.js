'use client';
import styles from './address-info.module.scss';

const CheckBox = ({ isChecked=false }) => {
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={isChecked} />
        <span className={styles.checkmark}></span>
      </div>
    );
  };
export default function AddressInfo() {



  
      return (
        <div className={styles.addressInfoCard}>
            <div className={styles.addressInfo}>
                <div className={styles.name}>Karif Daoud</div>
                <div className={styles.actionWrapper}>
                    <div className={styles.action}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                        <div className={styles.actionTxt}>Edit</div>
                    </div>
                    <div className={styles.action}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                        <div className={styles.actionTxt}>Remove</div>
                    </div>
                </div>
                
            </div>
            <div className={styles.addressDetail}>12th Floor Yes Business Centre Al Barsha – Dubai United Arab Emirates</div>
            <div className={styles.phoneNo}>Phone no : 971-8996689</div>
            <div className={styles.delivereHere}>
                <CheckBox />
                <div className={styles.txt}>Deliver here</div>
            </div>
        </div>
      )
    }
    