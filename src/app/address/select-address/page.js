'use client';
import AddressInfo from './AddressInfo/AddressInfo';
import styles from './pages.module.scss'


export default function SelectAddress() {



  
      return (
        <div className={styles.addressListWrapper}>
            <div className={styles.addNewAddressTxt}>+ Add new address</div>
            <div className={styles.addressInfoContainer}>
              <AddressInfo />
              <AddressInfo />
              <AddressInfo />
              <AddressInfo />
              <AddressInfo />
              <AddressInfo />
            </div>
          
        </div>
      )
    }
    