import { NextResponse } from 'next/server';
 
export async function GET() {
  const cartData =  await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
    method: 'GET',
    headers:{
      "user":9090,
      "country":1
    },
    next: { revalidate: 0} 
  })
  const data = await cartData.json();
  return NextResponse.json(data );
}