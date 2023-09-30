import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic'
export async function GET() {

  console.log("process.env.SERVERprocess.env.BACKEND_END_POINT_URL",process.env.BACKEND_END_POINT_URL)
  const customHeader = await authHeader();
  const getAddressResp =  await fetch(`https://api.kuwa.bevaleo.dev/module/address/`, {
    method: 'GET',
    headers: {...customHeader},
    cache: 'no-store'
  })
  const data = await getAddressResp.json();
  return NextResponse.json(data );
}