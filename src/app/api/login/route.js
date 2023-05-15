
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    const loginResp = await fetch('https://api.kuwa.bevaleo.dev/api/v1/customer/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      const loginRespp = await loginResp.json();


    console.log("loginResp",loginRespp)

   const data =  setTokenCookie(res, loginRespp.token)
    return NextResponse.json({message:'Hello'})
}