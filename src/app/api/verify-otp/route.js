
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();

    console.log("customHeader",customHeader)
    console.log("requestBodyrequestBody",requestBody)
    const addToCartResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...customHeader},
        body:JSON.stringify(requestBody)
      });
      console.log("addToCartData",addToCartResp)
     if(addToCartResp.status == 200){
      const addToCartData = await addToCartResp.json();
     
    return NextResponse.json(addToCartData)
     }

    
}