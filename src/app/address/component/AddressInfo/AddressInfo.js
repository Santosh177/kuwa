'use client';
import { useRouter } from 'next/navigation';
import styles from './address-info.module.scss';

const CheckBox = ({ isChecked=false }) => {
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={isChecked} />
        <span className={styles.checkmark}></span>
      </div>
    );
  };
export default function AddressInfo({data={},isSelected=false,onSelectAddress={},onEditAddress={},onRemoveAddress={}}) {
  const router = useRouter();

  const { userName="",addressTxt="", phoneNo="",id="" } = data || {}

  
      return (
        <div className={[styles.addressInfoCard,(isSelected)&&styles.isActive].join(" ")} onClick={()=>onSelectAddress(data)}>
            <div className={styles.addressInfo}>
                <div className={styles.name}>{userName}</div>
                <div className={styles.actionWrapper}>
                    <div className={styles.action} onClick={()=>router.push('/address/edit-address/1')}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                        <div className={styles.actionTxt}>Edit</div>
                    </div>
                    <div className={styles.action} onClick={()=>onRemoveAddress()}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                        <div className={styles.actionTxt}>Remove</div>
                    </div>
                </div>
                
            </div>
            <div className={styles.addressDetail}>{addressTxt}</div>
            <div className={styles.phoneNo}>Phone no : {phoneNo}</div>
            <div className={styles.delivereHere}>
                <CheckBox isChecked={isSelected}/>
                <div className={styles.txt}>Deliver here</div>
            </div>
        </div>
      )
    }
    