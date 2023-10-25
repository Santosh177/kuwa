import { authHeader } from '../../../../lib/auth-cookies';
import PageHeader from '@/components/PageHeader/PageHeader';
import OrderDetails from './OrderDetails/OrderDetails';


export default async function MyOrderDetails(req) {


  const orderId = req && req.params && req.params.id  || "";
  let orderDetails = {}


  

  console.log("orderIdorderId",orderId)

  try {
    
    const customHeader = await authHeader();
    const orderDetailsResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/detail-order/${orderId}`, {
      method: 'GET',
      headers:{
        ...customHeader
      },
      cache: 'no-store'
    })
    const orderDetailData = await orderDetailsResp.json();
    orderDetails = orderDetailData;
    console.log("orderDetailsResporderDetailsResporderDetailsResp",orderDetailData)
    
  } catch (error) {
    
  }
  return (
    <>
        <PageHeader headerName="My Details" />
        <OrderDetails data={orderDetails} />
    </>

  )
}
