
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const updateAddressResp = await fetch(`https://api.kuwa.bevaleo.dev/module/address/${requestBody.shippingAddressId}`, {
        method: 'PATCH',
        headers: customHeader,
        body:JSON.stringify(requestBody.data)
      });
      const updateAddress = await updateAddressResp.json();
      console.log("saveAddresssaveAddresssaveAddress",updateAddress)
    return NextResponse.json(updateAddress)
}