
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const editAddressResp = await fetch(`https://api.kuwa.bevaleo.dev/module/addresses/${requestBody.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...customHeader
        }
      });
      const editAddress = await editAddressResp.json();
      console.log("editAddresseditAddress___",editAddress)
    return NextResponse.json(editAddress)
}