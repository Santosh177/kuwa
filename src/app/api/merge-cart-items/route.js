
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
import { cookies } from 'next/headers';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    // const requestBody = await request.json();
    const user = cookies().get('userId') || "";
    const country = cookies().get('countryId') || "";
    const deviceId = cookies().get('deviceID') || "";

    const requestHeader = {
      'Content-Type': 'application/json',
      'user': user && user.value || "",
      'country':country && country.value || "",
      'deviceId': deviceId && deviceId.value || ""
    }
    // const customHeader = await authHeader();
    console.log("santoReq",requestHeader)
    const mergeCartItems = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/merge-cart-items`, {
        method: 'POST',
        headers: requestHeader
        },
        // body:JSON.stringify(requestBody)
      );
      const cartItems = await mergeCartItems.json();
      console.log("allCartItems",cartItems)
     
    return NextResponse.json(cartItems)
}