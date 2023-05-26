
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
    const paymentId = req && req.searchParams && req.searchParams['payment_id'] || null;
    if(paymentId){
        const data  =  await fetch(`https://api.kuwa.bevaleo.dev/api/v1/tabby/callback?paymentId=${paymentId}`, {
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
    