import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';

 
export async function GET() {

  const customHeader = await authHeader();
  const getAddressResp =  await fetch(`https://api.kuwa.bevaleo.dev/module/address/`, {
    method: 'GET',
    headers: {...customHeader},
    next: { revalidate: 0} 
  })
  const data = await getAddressResp.json();
  return NextResponse.json(data );
}