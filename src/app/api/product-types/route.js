import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
 
export async function GET(request) {

  const customHeader = await authHeader();
  console.log("authHeader_PRODUCT Type")
//   console.log("request",request)
  const cartData =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/private/product/types?super=HEALTH', {
    method: 'GET',
    headers: customHeader,
    next: { revalidate: 0} 
  })
  const data = await cartData.json();
  return NextResponse.json(data );
}