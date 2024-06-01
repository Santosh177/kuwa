
import { redirect } from 'next/navigation';

export default async function PaymentSuccess(req,res) {
  console.log("RequestParams",req.searchParams)
    const paymentId = req && req.searchParams && req.searchParams['payment_id'] || null;
    const isBuyNow = req && req.searchParams && req.searchParams['is_buy_now'] || false
    if(paymentId){
      const endPointUrl = isBuyNow ? `${process.env.BACKEND_END_POINT_URL}/api/v2/tabby/callback?paymentId=${paymentId}` : `${process.env.BACKEND_END_POINT_URL}/api/v1/tabby/callback?paymentId=${paymentId}`
        const tabbyPaymentResp  =  await fetch(endPointUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const tabbyPaymentData = await tabbyPaymentResp.json();
        if(tabbyPaymentData && tabbyPaymentData.status_code && tabbyPaymentData.status_code == 200){
          const orderId = tabbyPaymentData && tabbyPaymentData.order_id || "";
          const  totalPurchaseValue = tabbyPaymentData?.total || "";
          const couponDiscount =tabbyPaymentData?.discount || "";
          redirect(`/payment/success?orderId=${orderId}&totalPurchaseValue=${totalPurchaseValue}&couponDiscount=${couponDiscount}&paymentMode=${"Tabby"}`);
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
    
