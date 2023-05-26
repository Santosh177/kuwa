'use client';
import { useRouter,usePathname } from 'next/navigation';
import styles from './address-info.module.scss';

const CheckBox = ({ isChecked=false }) => {
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={isChecked} />
        <span className={styles.checkmark}></span>
      </div>
    );
  };
export default function AddressInfo({data={},isSelected=false,onSelectDefaultAddress={},onEditAddress={},onRemoveAddress={}}) {
  const router = useRouter();
  const pathName = usePathname();
  console.log("PathBane",pathName)

  const { userName="",addressTxt="", phoneNo="",id="" } = data || {}

  
      return (
        <div className={[styles.addressInfoCard,(isSelected)&&styles.isActive].join(" ")} onClick={(e)=>{
          // e.preventDefault();
          onSelectDefaultAddress(data)
          }}>
            <div className={styles.addressInfo}>
                <div className={styles.name}>{userName}</div>
                <div className={styles.actionWrapper}>
                    <div className={styles.action} onClick={(e)=>{
                     e.stopPropagation();
                      router.push(`/address/edit-address/${id}?referer=${pathName}`)}}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                        <div className={styles.actionTxt}>Edit</div>
                    </div>
                    <div className={styles.action} onClick={(e)=>{
                     e.stopPropagation();
                      onRemoveAddress()
                      }}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                        <div className={styles.actionTxt}>Remove</div>
                    </div>
                </div>
                
            </div>
            <div className={styles.addressDetail}>{addressTxt}</div>
            <div className={styles.phoneNo}>Phone no : {phoneNo}</div>
            <div className={styles.delivereHere}>
                <CheckBox isChecked={isSelected}/>
                <div className={styles.txt}>Default address</div>
            </div>
        </div>
      )
    }
    