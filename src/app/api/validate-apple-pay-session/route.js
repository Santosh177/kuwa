
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("requestBodyrequestBody",requestBody)
    const applePaySessionResp = await fetch('https://api.kuwa.bevaleo.dev/payment/apple-pay/validate-session/', {
        method: 'POST',
        body:JSON.stringify(requestBody)
      });
    const applePaySessionData = await applePaySessionResp.json();
    return NextResponse.json(applePaySessionData)
}


// return API.post("/payment/apple-pay/validate-session/", {"apple_url":appleValidationURL,"merchant_name":merchantName}).then(res => {
//     return res;
// })