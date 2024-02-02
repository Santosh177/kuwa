import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
 

export const dynamic = 'force-dynamic';
export async function GET() {

  try {
    const customHeader = await authHeader();
    const cartData =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/home-page`, {
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