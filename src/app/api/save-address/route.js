
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    console.log("requestBodyrequestBody",requestBody)
    console.log("Request URL",`https://api.kuwa.bevaleo.dev/module/address/billing/${customHeader.user}`)
    const saveAddressResp = await fetch(`https://api.kuwa.bevaleo.dev/module/address/billing/${customHeader.user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      const saveAddress = await saveAddressResp.json();
      console.log("saveAddresssaveAddresssaveAddress",saveAddress)
    return NextResponse.json(saveAddress)
}