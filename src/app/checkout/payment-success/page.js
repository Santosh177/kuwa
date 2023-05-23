
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
    const sessionId = req && req.searchParams && req.searchParams['cko-session-id'] || null;
    console.log("sessionIdsessionId",sessionId)
    if(sessionId){
        const data = await fetch(`https://api.kuwa.bevaleo.dev/api/v1/checkout/callback-success?cko-session-id=${sessionId}`);
        console.log("DATA",data);
        redirect("/payment/success")
    }
    


  
      return (
        <>
          <div> Checkout</div>
        </>
      )
    }
    