'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import AddressInfo from './AddressInfo/AddressInfo';
import styles from './pages.module.scss'


export default function SelectAddress() {



  
      return (
        <>
          <PageHeader headerName='Select Address' />
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
        </>
       
      )
    }
    