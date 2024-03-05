
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();

    console.log("customHeaderEmail",customHeader)
    console.log("requestBodyrequestBody",requestBody)
    const outOfStockEmail = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/out-of-stock/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...customHeader},
        body:JSON.stringify(requestBody)
      });
      
      const outOfStockEmailRes = await outOfStockEmail.json();
      console.log("outOfStockEmailRes",outOfStockEmailRes)
    return NextResponse.json(outOfStockEmailRes)
}