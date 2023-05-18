'use client';

import CreateAccountBox from "./components/CreateAccountBox/CreateAccountBox";
import AddressForm from "./address-form/address-form";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import styles from './page.module.scss';


export default function AddAddress() {



  
      return (
        <>
          <div className={styles.addAddressWrapper}> 
              <CreateAccountBox />
              <AddressForm />
              <SubmitBtn />
          </div>
        </>
      )
    }
    