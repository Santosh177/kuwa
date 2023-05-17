
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("requestBody",requestBody)
    const signupResp = await fetch('https://api.kuwa.bevaleo.dev/api/v1/customer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      console.log("signUpResddp",signupResp)
      const signupData = await signupResp.json();

    console.log("signUpResp",signupData)

   const data =  setTokenCookie(res, loginRespp.token)
    return NextResponse.json({message:'Hello'})
}