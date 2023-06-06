import { NextResponse } from 'next/server';
 

export const dynamic = 'force-dynamic'
export async function GET() {
  const res = await fetch('https://api.kuwa.bevaleo.dev/module/home-page?country=1', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return NextResponse.json({ data });
}