
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
    const sessionId = req && req.searchParams && req.searchParams['cko-session-id'] || null;
    if(sessionId){
        const checkoutResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/checkout/callback-success?cko-session-id=${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const checkoutData = await checkoutResp.json();
        if(checkoutData && checkoutData.status_code && checkoutData.status_code == 200){
          const orderId = checkoutData && checkoutData.order_id || "";
          const  totalPurchaseValue = checkoutData?.total || "";
          const couponDiscount =checkoutData?.discount || "";
          redirect(`/payment/success?orderId=${orderId}&totalPurchaseValue=${totalPurchaseValue}&couponDiscount=${couponDiscount}`);
        }else{
          redirect(`/payment/failure`);
        }
    }
    


  
      return (
        <>
          <div> Checkout</div>
        </>
      )
    }
    