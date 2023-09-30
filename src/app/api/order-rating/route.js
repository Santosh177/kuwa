
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const productId = requestBody.productId;
    const rating = parseInt(requestBody.rating)
    console.log("request Body",requestBody)
    const ratingResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/product/rating/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(rating)
      });
    // const ratingData = await ratingResp;
      // console.log("ratingDataratingData",ratingData)
    return NextResponse.json({status:"SUCCESS"})
}