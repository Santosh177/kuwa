'use client';

import AddressForm from "./address-form/address-form";
import styles from './page.module.scss';


export default function AddAddress() {



  
      return (
        <>
          <div className={styles.addAddressWrapper}> 
              <AddressForm />
          </div>
        </>
      )
    }
    