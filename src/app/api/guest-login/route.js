import { NextResponse } from 'next/server';
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic'

export async function PATCH(request,res) {

    const requestBody  = await request.json();
    const customHeader = await authHeader();

    const guestSignup = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/update/password`,{
        method: 'PATCH',
        headers:customHeader,
        body: JSON.stringify(requestBody)
    });

    try {
        const signupData = await guestSignup.json();
        if(signupData && signupData.token || signupData.id){
          const data =  setTokenCookie(res, signupData.token, signupData.id)
          return NextResponse.json({"status_code":200, "status_msg":"success",data:signupData})
        }else{
          return NextResponse.json({"status_code":400, "status_msg":"success",data:signupData})
        }
      } catch (error) {
        return NextResponse.json({"status_code":400, "status_msg":"success",data:null})
      }


}