
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();

    console.log("customHeader",customHeader)
    console.log("requestBodyrequestBody",requestBody)
    const addToCartResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...customHeader},
        body:JSON.stringify(requestBody)
      });
      
      const addToCartData = await addToCartResp.json();
      console.log("addToCartData",addToCartData)
    return NextResponse.json(addToCartData)
}