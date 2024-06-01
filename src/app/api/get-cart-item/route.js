import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
 

export const dynamic = 'force-dynamic';
export async function GET(req) {
const urlParams = new URLSearchParams(req.url.split('?')[1]);
console.log("urlParamsproduct",urlParams)
const productId = urlParams.get('productId');
const variantId = urlParams.get('variantId');
console.log("getProduct",productId,variantId)
  try {
    const customHeader = await authHeader();
    const cartData =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/cart?productId=${productId}&variantId=${variantId}`, {
      method: 'GET',
      headers: customHeader,
      cache: 'no-store'
    })
    const data = await cartData.json();
    return NextResponse.json(data );
  } catch (error) {
    return NextResponse.json({});
  }
 
}
