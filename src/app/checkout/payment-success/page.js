
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
    const sessionId = req && req.searchParams && req.searchParams['cko-session-id'] || null;
    if(sessionId){
        const checkoutResp  =  await fetch(`https://api.kuwa.bevaleo.dev/api/v1/checkout/callback-success?cko-session-id=${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const checkoutData = await checkoutResp.json();
        const orderId = checkoutData && checkoutData.order_id || "";
        redirect(`/payment/success?orderId=${orderId}`);
    }
    


  
      return (
        <>
          <div> Checkout</div>
        </>
      )
    }
    