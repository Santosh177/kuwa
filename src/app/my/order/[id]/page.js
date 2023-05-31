import PageHeader from '@/components/PageHeader/PageHeader';
import OrderDetails from './OrderDetails/OrderDetails';


export default async function MyOrderDetails({}) {



  return (
    <>
      <PageHeader headerName="My Details" />
        <OrderDetails />
    </>

  )
}
