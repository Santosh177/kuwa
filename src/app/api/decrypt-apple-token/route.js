
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const applePaySessionResp = await fetch('https://api.bevaleo.dev/api/v1/kuwa/checkout/decrypt-apple-token/', {
        method: 'POST',
        body:JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    const applePaySessionData = await applePaySessionResp.json();
    return NextResponse.json(applePaySessionData)
}


// return API.post("/payment/apple-pay/validate-session/", {"apple_url":appleValidationURL,"merchant_name":merchantName}).then(res => {
//     return res;
// })