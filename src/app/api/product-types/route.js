import { NextResponse, NextRequest } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
  const requestBody = await request.json();
  const { superType="" } = requestBody || {}
  console.log("requestBody",requestBody)
  const customHeader = await authHeader();
  const getProductTypes =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/active/collection?super=${superType}`, {
    method: 'GET',
    headers: customHeader,
    cache: 'no-store'
  })
  const data = await getProductTypes.json();
  return NextResponse.json(data);
}