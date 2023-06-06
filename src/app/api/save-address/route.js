
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const saveAddressResp = await fetch(`https://api.kuwa.bevaleo.dev/module/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...customHeader
        },
        body:JSON.stringify(requestBody)
      });
      const saveAddress = await saveAddressResp.json();
      console.log("saveAddresssaveAddresssaveAddress",saveAddress)
    return NextResponse.json(saveAddress)
}