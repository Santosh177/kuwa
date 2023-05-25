
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
    const sessionId = req && req.searchParams && req.searchParams['cko-session-id'] || null;
    if(sessionId){
        const data  =  await fetch(`https://api.kuwa.bevaleo.dev/api/v1/checkout/callback-success?cko-session-id=${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        redirect("/payment/success");
    }
    


  
      return (
        <>
          <div> Checkout</div>
        </>
      )
    }
    