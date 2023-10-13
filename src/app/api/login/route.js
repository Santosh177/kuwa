
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const loginResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/customer/login/`, {
        method: 'POST',
        headers:customHeader,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body:JSON.stringify(requestBody)
      });

      
      console.log("loginResploginResp",loginResp)
      if(loginResp && loginResp.status && loginResp.status === 401){
        return NextResponse.json({status:loginResp})
      }else{
        const loginData = await loginResp.json();

        console.log("loginDatata",loginData)
        setTokenCookie(res, loginData.token , loginData.id)
        return NextResponse.json({status:"SUCCESS",data:loginData})
      }
     
}