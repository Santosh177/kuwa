
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
  console.log("RequestParams",req.searchParams)
        const tamraSideOrderId = req && req.searchParams && req.searchParams.orderId || "";
        const isBuyNow = req && req.searchParams && req.searchParams['is_buy_now'] || false
        if(tamraSideOrderId){
          const endPointUrl = isBuyNow ? `${process.env.BACKEND_END_POINT_URL}/api/v2/tamara/order-id?transactionReference=${tamraSideOrderId}` : `${process.env.BACKEND_END_POINT_URL}/api/v1/tamara/order-id?transactionReference=${tamraSideOrderId}`
                const getOrderIdResp  =  await fetch(endPointUrl, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                 const getOrderIdRespData = await getOrderIdResp.json();
                if(getOrderIdRespData && getOrderIdRespData.status_code && getOrderIdRespData.status_code == 200){
                  const orderId = getOrderIdRespData && getOrderIdRespData.order_id || "";
                  const  totalPurchaseValue = getOrderIdRespData?.total || "";
                  const couponDiscount =getOrderIdRespData?.discount || "";
                  redirect(`/payment/success?orderId=${orderId}&totalPurchaseValue=${totalPurchaseValue}&couponDiscount=${couponDiscount}&paymentMode=${"Tamara"}`);
                }else{
                  redirect(`/payment/failure`);
                }
        }

        return(
                <div>
                        Checkout {JSON.stringify(getOrderIdRespData)}
                </div>
        )
}
    
