
import { redirect } from 'next/navigation';

export default async function PaymentStatus(req,res) {
    const tapId = req && req.searchParams && req.searchParams['tap_id'] || null;
    let tapPaymentStatusData = ""
    console.log("tap payment status")
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
        }else if(tapPaymentStatusData && tapPaymentStatusData.status_code && tapPaymentStatusData.status_code == 400){
            redirect ("/payment")
        }else if(tapPaymentStatusData && tapPaymentStatusData.status_code && (tapPaymentStatusData.status_code == 200 || tapPaymentStatusData.status_code == 200)){
          const orderId = tapPaymentStatusData.order_id;
          const  totalPurchaseValue = tapPaymentStatusData?.total;
          const couponDiscount = tapPaymentStatusData?.discount;
          console.log("tapPaymentStatusData",tapPaymentStatusData)
          redirect(`/payment/success?orderId=${orderId}&totalPurchaseValue=${totalPurchaseValue}&couponDiscount=${couponDiscount}`);
        }
        else{
            redirect("/payment/failure");
        }
    }

      return (
        <>
          <div> Checkout {JSON.stringify(tapPaymentStatusData)}</div>
        </>
      )
    }
    