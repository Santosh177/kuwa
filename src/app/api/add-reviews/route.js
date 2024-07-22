
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("reviewspayload",requestBody)
    const customHeader = await authHeader();

    const addToReviews = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/review/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...customHeader},
        body:JSON.stringify(requestBody)
      });
      
      const addToCartData = await addToReviews.json();
    return NextResponse.json(addToCartData)
}