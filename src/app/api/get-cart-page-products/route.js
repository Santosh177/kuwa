import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies'
 

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const customHeader = await authHeader();
    const cartProductsData =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/cart-page/website`, {
      method: 'GET',
      headers: customHeader,
      cache: 'no-store'
    })
    const data = await cartProductsData.json();
    console.log("jbjwbjbwj",data)
    return NextResponse.json(data );
  } catch (error) {
    return NextResponse.json({});
  }
 
}
