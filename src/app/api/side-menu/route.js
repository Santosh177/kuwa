import { NextResponse } from 'next/server';
import {authHeader} from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'

export async function GET() {
  const customHeader = await authHeader();
  try {
    const sideMenuResp =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/menu`, {
      method: 'GET',
      headers:customHeader,
      cache: 'no-store'
    })
    const data = await sideMenuResp.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(JSON.stringify(error));
  }
 
}