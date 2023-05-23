
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("requestBody",requestBody)
    const customHeader = await authHeader();
    const signupResp = await fetch('https://api.kuwa.bevaleo.dev/api/v1/customer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'country': customHeader.country
        },
        body:JSON.stringify(requestBody)
      });
      console.log("signUpResddp",signupResp)
      const signupData = await signupResp.json();

    console.log("signUpResp",signupData)

   const data =  setTokenCookie(res, signupData.token, signupData.id)
    return NextResponse.json({"data":"ssss"})
}