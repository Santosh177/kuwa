
import { redirect } from 'next/navigation';

export default async function PaymentStatus(req,res) {
    const tapId = req && req.searchParams && req.searchParams['tap_id'] || null;
    let tapPaymentStatusData = ""
    if(tapId){
        const tapPaymentStatusResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/tap/payment-status-inquiry?chargeId=${tapId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
         tapPaymentStatusData = await tapPaymentStatusResp.json();
        if(tapPaymentStatusData && tapPaymentStatusData.status_code && tapPaymentStatusData.status_code == 500){
            redirect("/payment/failure");
        }else{
            redirect("/payment/success");
        }
    }

      return (
        <>
          <div> Checkout {JSON.stringify(tapPaymentStatusData)}</div>
        </>
      )
    }
    