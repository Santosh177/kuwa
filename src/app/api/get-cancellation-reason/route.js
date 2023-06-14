import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
 
export const dynamic = 'force-dynamic';
export async function GET() {

  try {
    const customHeader = await authHeader();
    const cancelReasonResp =  await fetch('https://api.kuwa.bevaleo.dev/module/cancel-reason', {
      method: 'GET',
      headers: customHeader,
      cache: 'no-store'
    })
    const data = await cancelReasonResp.json();
    return NextResponse.json(data );
  } catch (error) {
    return NextResponse.json(error);
  }
 
}