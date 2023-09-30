import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const sideMenuResp =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/menu`, {
      method: 'GET',
      cache: 'no-store'
    })
    const data = await sideMenuResp.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(JSON.stringify(error));
  }
 
}