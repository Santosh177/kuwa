import { authHeader } from '../../../../../lib/auth-cookies';
import PageHeader from '@/app/[lng]/components/PageHeader/PageHeader';
import OrderDetails from './OrderDetails/OrderDetails';
import { cookies } from 'next/headers';


export default async function MyOrderDetails(req) {

  const nextCookies = cookies();
  const language_code = nextCookies.get('language_code')?.value


  const orderId = req && req.params && req.params.id  || "";
  let orderDetails = {}


  

  console.log("orderIdorderId",orderId)

  try {
    
    const customHeader = await authHeader();
    // const orderDetailsResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/detail-order/${orderId}`, {
    const orderDetailsResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/order-summary/${orderId}`, {
      method: 'GET',
      // headers:{
      //   ...customHeader
      // },
      // cache: 'no-store'
    })
    const orderDetailData = await orderDetailsResp.json();
    orderDetails = orderDetailData;
    console.log("orderDetailsResporderDetailsResporderDetailsResp",orderDetailData)
    
  } catch (error) {
    
  }
  return (
    <>
        <PageHeader headerName={language_code == "ar" ?"تفاصيلي" : "My Details"} />
        <OrderDetails data={orderDetails} />
    </>

  )
}
