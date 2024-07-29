import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';



export const dynamic = 'force-dynamic'
export async function PUT() {

  const customHeader = await authHeader();
  const getLanguage =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/customer/update/language`, {
    method: 'PUT',
    headers: customHeader,
    cache: 'no-store'
  })
  const data = await getLanguage.json();
  console.log("language+++",getLanguage,data)
  return NextResponse.json(data);
}