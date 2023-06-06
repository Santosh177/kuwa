
import { redirect } from 'next/navigation';

export default async function PaymentStatus(req,res) {
    const tapId = req && req.searchParams && req.searchParams['tap_id'] || null;
    if(tapId){
        const tapPaymentStatusResp  =  await fetch(`https://api.kuwa.bevaleo.dev/api/v1/tabby/callback?paymentId=${tapId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const tapPaymentStatusData = await tapPaymentStatusResp.json();
        if(tapPaymentStatusData && tapPaymentStatusData.status_code && tapPaymentStatusData.status_code == 500){
            redirect("/payment/failure");
        }else{
            redirect("/payment/success");
        }
        
    }
    

  
      return (
        <>
          <div> Checkout</div>
        </>
      )
    }
    