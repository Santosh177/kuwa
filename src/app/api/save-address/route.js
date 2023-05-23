
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '@/utils';

export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const saveAddressResp = await fetch(`https://api.kuwa.bevaleo.dev/module/address/billing/${customHeader.user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      const saveAddress = await saveAddressResp.json();
    return NextResponse.json(saveAddress)
}