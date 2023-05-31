import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sideMenuResp =  await fetch('https://api.kuwa.bevaleo.dev/module/menu', {
      method: 'GET',
      next: { revalidate: 0} 
    })
    const data = await sideMenuResp.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({});
  }
 
}