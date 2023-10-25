
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
    const paymentId = req && req.searchParams && req.searchParams['payment_id'] || null;
    if(paymentId){
        const tabbyPaymentResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/tabby/callback?paymentId=${paymentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const tabbyPaymentData = await tabbyPaymentResp.json();
        if(tabbyPaymentData && tabbyPaymentData.status_code && tabbyPaymentData.status_code == 200){
          const orderId = tabbyPaymentData && tabbyPaymentData.order_id || "";
          redirect(`/payment/success?orderId=${orderId}`);
        }else{
          redirect(`/payment/failure`);
        }
    }

  
      return (
        <>
          <div> Checkout </div>
        </>
      )
    }
    