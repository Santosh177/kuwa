import { NextResponse } from 'next/server';
import { authHeader } from '@/utils';

 
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
export async function GET() {

  const customHeader = await authHeader();
  console.log("authHeader",authHeader())
  const cartData =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
    method: 'GET',
    headers: {...customHeader},
    next: { revalidate: 0} 
  })
  const data = await cartData.json();
  return NextResponse.json(data );
}