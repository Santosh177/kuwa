
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {

        const tamraSideOrderId = req && req.searchParams && req.searchParams.orderId || "";

        if(tamraSideOrderId){
                const getOrderIdResp  =  await fetch(`https://api.kuwa.bevaleo.dev/api/v1/tamara/order-id?transactionReference=${tamraSideOrderId}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                 const getOrderIdRespData = await getOrderIdResp.json();
                if(getOrderIdRespData && getOrderIdRespData.status_code && getOrderIdRespData.status_code == 200){
                  const orderId = getOrderIdRespData && getOrderIdRespData.order_id || "";
                  redirect(`/payment/success?orderId=${orderId}`);
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
    