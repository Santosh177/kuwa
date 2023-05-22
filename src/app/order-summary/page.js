import PageHeader from "@/components/PageHeader/PageHeader";
import PageStepTracker from "@/components/PageStepTracker/PageStepTracker";
import OrderSummaryPage from "./OrderSummaryPage/OrderSummaryPage";
import styles from './pages.module.scss';

export default function AllProduct() {



    console.log("ht")
  
      return (
        <>
          <PageHeader headerName="Order Summary"/>
          <PageStepTracker stepCount={2} />
          <OrderSummaryPage />
        </>
      )
    }
    