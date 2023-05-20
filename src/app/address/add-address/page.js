'use client';

import PageInfoTicker from '@/components/PageInfoTicker/PageStepTracker';
import AddressForm from "./address-form/address-form";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import styles from './page.module.scss';


export default function AddAddress() {



  
      return (
        <>
             
          {/* <PageInfoTicker /> */}
          <div className={styles.addAddressWrapper}> 
              <AddressForm />
              <SubmitBtn />
          </div>
        </>
      )
    }
    