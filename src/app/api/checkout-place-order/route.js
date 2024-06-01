
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
  console.log("requestCodparams",request.url)
  const requestBody = await request.json();
  console.log("requestBody",requestBody)
  const urlParams = new URLSearchParams(request.url.split('?')[1]);
  console.log("urlParams",urlParams)
  const productId = urlParams.get('productId');
  console.log("productIdddddd",productId)
  const endpointURL = productId ? `${process.env.BACKEND_END_POINT_URL}/api/v2/checkout/place-order` : `${process.env.BACKEND_END_POINT_URL}/api/v1/checkout/place-order`;
    const placeOrder = await fetch(endpointURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      console.log("signUpResddp",placeOrder)
      const placeOrderResp = await placeOrder.json();
    return NextResponse.json(placeOrderResp)
}
