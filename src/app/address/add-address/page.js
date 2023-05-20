'use client';
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import AddressForm from "./address-form/address-form";
import SubmitBtn from "./components/SubmitBtn/SubmitBtn";
import styles from './page.module.scss';


export default function AddAddress() {



  
      return (
        <>
          <PageHeader headerName="Add Address" />
          <PageStepTracker />
          <div className={styles.addAddressWrapper}> 
              <AddressForm />
              <SubmitBtn />
          </div>
        </>
      )
    }
    