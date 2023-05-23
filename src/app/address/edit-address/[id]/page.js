'use client';
import PageHeader from "@/components/PageHeader/PageHeader";
import AddressForm from "../../add-address/address-form/address-form";
// import SubmitBtn from "../../components/SubmitBtn/SubmitBtn";
// import styles from './page.module.scss';


export default function AddAddress() {



  
      return (
        <>
          <PageHeader headerName="Edit Address" />
          <div > 
              <AddressForm />
              {/* <SubmitBtn /> */}
          </div>
        </>
      )
    }
    