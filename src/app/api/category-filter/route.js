import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic'
export async function GET() {

  const customHeader = await authHeader();
  const categoryFilterResp =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/product/side-bar`, {
    method: 'GET',
    headers: {...customHeader},
    cache: 'no-store'
  })
  const data = await categoryFilterResp.json();
  return NextResponse.json(data );
}