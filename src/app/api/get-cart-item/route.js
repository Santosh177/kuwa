import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
 
// export async function GET() {
//   const cartData =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
//     method: 'GET',
//     headers:{
//       ...authHeader
//     },
//     next: { revalidate: 0} 
//   })
//   const data = await cartData.json();
//   return NextResponse.json(data );
// }
export const dynamic = 'force-dynamic';
export async function GET() {

  try {
    const customHeader = await authHeader();
    const cartData =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/cart`, {
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