
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("requestBody",requestBody)
    const placeOrder = await fetch('https://api.kuwa.bevaleo.dev/api/v1/tabby/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      const placeOrderResp = await placeOrder.json();
    return NextResponse.json(placeOrderResp)
}