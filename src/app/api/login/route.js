
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const loginResp = await fetch('https://api.kuwa.bevaleo.dev/api/v1/customer/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      const loginData = await loginResp.json();

    setTokenCookie(res, loginData.token , loginData.id)
    return NextResponse.json({status:"SUCCESS"})
}