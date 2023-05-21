
import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import Payment from "./payment";
import styles from './pages.module.scss';

export default function PaymentPage() {



    console.log("ht")
  
      return (
        <>
          <PageHeader headerName="Payment"/>
          <PageStepTracker />
          <Payment />
        </>
      )
    }
    