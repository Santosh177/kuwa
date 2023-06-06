'use client';
import PageHeader from '@/components/PageHeader/PageHeader';
import FindMyOrder from './FindMyOrder/FindMyOrder';
import FindMyOrderInfo from './FindMyOrderInfo/FindMyOrderInfo';
import OrderDetails from '../Component/OrderView/OrderDetails/OrderDetails';
import styles from './page.module.scss';


export default function MyOrders({}) {




  

  return (
    <>
      <PageHeader headerName="Find My Order" />
      <FindMyOrder />
      <div className={styles.headerTxt}>OrderDetails</div>
      <FindMyOrderInfo />
      <OrderDetails />
      
    </>

  )
}
