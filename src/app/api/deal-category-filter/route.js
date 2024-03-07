import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic'
export async function GET(req) {
  const query =  req.url.split("?dealSeoUrl=")
  console.log("sbdshb",query)

  const customHeader = await authHeader();
  const categoryFilterResp =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/deals/side-bar?dealSeoUrl=${query[1]}`, {
    method: 'GET',
    headers: {...customHeader},
    cache: 'no-store'
  })
  const data = await categoryFilterResp.json();
  return NextResponse.json(data );
}