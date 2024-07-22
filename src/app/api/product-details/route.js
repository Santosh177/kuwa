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
    const productData =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/product-page/seo/${productId}`, {
      method: 'GET',
      headers: customHeader,
      cache: 'no-store'
    })

    const data = await productData.json();
    console.log("product-detailsbjwbjbe",productData,data)
    return NextResponse.json(data );
  } catch (error) {
    return NextResponse.json({});
  }
 
}
