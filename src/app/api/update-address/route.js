
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    console.log("requestBodyrequestBody",requestBody)
    const addressId = requestBody.id;
    console.log("Address",addressId)
    const updateAddressResp = await fetch(`https://api.kuwa.bevaleo.dev/module/address/billing/${addressId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      const updateAddress = await updateAddressResp.json();
      console.log("saveAddresssaveAddresssaveAddress",updateAddress)
    return NextResponse.json(updateAddress)
}