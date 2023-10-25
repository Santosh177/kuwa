
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const applePaySessionResp = await fetch(`${process.env.BACKEND_END_DJANGO_API_URL}/api/v1/kuwa/apple-pay/validate-session/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody),
      });
    const applePaySessionData = await applePaySessionResp.json();
    console.log("applePaySessionDataapplePaySessionData",applePaySessionData)
    return NextResponse.json(applePaySessionData)
}


// return API.post("/payment/apple-pay/validate-session/", {"apple_url":appleValidationURL,"merchant_name":merchantName}).then(res => {
//     return res;
// })