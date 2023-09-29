import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const sideMenuResp =  await fetch('https://api.kuwa.bevaleo.dev/module/menu', {
      method: 'GET',
      cache: 'no-store'
    })
    const data = await sideMenuResp.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(JSON.stringify(error));
  }
 
}