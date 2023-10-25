
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const placeOrder = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/checkout/place-order`, {
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