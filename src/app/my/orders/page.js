import PageHeader from '@/components/PageHeader/PageHeader';
import OrderItemList from './OrderItemList/OrderItemList';


export default async function MyOrders({}) {



  return (
    <>
      <PageHeader headerName="My Orders" />
      <OrderItemList />
    </>

  )
}
