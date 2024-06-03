'use client';
import { useRouter,usePathname,useSearchParams } from 'next/navigation';
import styles from './address-info.module.scss';
import { useLanguage } from '@/context/languageDetails';

import { queryParams } from '@/services';

const CheckBox = ({ isChecked=false }) => {
    return (
      <div className={styles.checkboxContainer}>
        <input type="checkbox" checked={isChecked} />
        <span className={styles.checkmark}></span>
      </div>
    );
  };
export default function AddressInfo({data={},isSelected=false,onSelectAddress={},onEditAddress={},onRemoveAddress={}, showRemoveBtn=true}) {
  const router = useRouter();
  const pathName = usePathname();
  console.log("PathBane",pathName)
  console.log("onSelectAddress",onSelectAddress,data)
  const { userName="",addressTxt="", mobNumber="",id="" } = data || {}
  const {listOfLanguages , selectedLanguage, isArabic, isEnglish, changeLanguage={}} = useLanguage();

  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const variantId = searchParams.get('variantId')
  let queryString = ''
  if(productId){
    queryString = queryParams(productId,variantId)
  }
      return (
        <div className={[styles.addressInfoCard,(isSelected)&&styles.isActive].join(" ")} onClick={(e)=>{
          // e.preventDefault();
          onSelectAddress(data)
          }}>
            <div className={styles.addressInfo}>
                <div className={styles.name}>{userName}</div>
                <div className={styles.actionWrapper}>
                    <div className={styles.action} onClick={(e)=>{
                     e.stopPropagation();
                      router.push(`/address/edit-address/${id}?referer=${pathName}&${queryString}`)}}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                        <div className={styles.actionTxt}>{isArabic ? "تعديل" : "Edit"}</div>
                    </div>
                    {showRemoveBtn &&<div className={styles.action} onClick={(e)=>{
                     e.stopPropagation();
                      onRemoveAddress()
                      }}>
                        <img src='https://production-website-builds.s3.ap-south-1.amazonaws.com/kuwa/edit.png' alt="edit"/>
                        <div className={styles.actionTxt}>{isArabic ? "إزالة" : "Remove"}</div>
                    </div>}
                </div>
                
            </div>
            <div className={styles.addressDetail}>{addressTxt}</div>
            <div className={styles.phoneNo}>{isArabic ? "رقم الهاتف" : "Phone no"}: {mobNumber}</div>
            <div className={styles.delivereHere}>
                <CheckBox isChecked={isSelected}/>
                <div className={styles.txt}>{isArabic  ? "التوصيل هنا" : "Deliver here"}</div>
            </div>
        </div>
      )
    }
    
