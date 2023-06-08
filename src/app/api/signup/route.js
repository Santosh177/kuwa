
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("requestBody",requestBody)
    const customHeader = await authHeader();
    console.log("customHeadercustomHeader",customHeader)
    const signupResp = await fetch('https://api.kuwa.bevaleo.dev/api/v1/customer/register', {
        method: 'POST',
        headers:customHeader,
        body:JSON.stringify(requestBody)
      });

      try {
        const signupData = await signupResp.json();
        if(signupData && signupData.token || signupData.id){
          const data =  setTokenCookie(res, signupData.token, signupData.id)
          return NextResponse.json({"status_code":200, "status_msg":"success",data:data})
        }else{
          return NextResponse.json({"status_code":400, "status_msg":"success",data:signupData})
        }
      } catch (error) {
        return NextResponse.json({"status_code":400, "status_msg":"success",data:null})
      }
 
   
}