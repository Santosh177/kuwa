
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    console.log("customHeadercustomHeader",customHeader)
    console.log("requestBody",requestBody)
    const addToCartResp = await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart/', {
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