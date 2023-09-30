import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic'
export async function GET() {

  const customHeader = await authHeader();
  const getAddressResp =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/address/`, {
    method: 'GET',
    headers: {...customHeader},
    cache: 'no-store'
  })
  const data = await getAddressResp.json();
  return NextResponse.json(data );
}