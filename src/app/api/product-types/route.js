import { NextResponse, NextRequest } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
  const requestBody = await request.json();
  const { superType="" } = requestBody || {}
  const customHeader = await authHeader();
  const getProductTypes =  await fetch(`https://api.kuwa.bevaleo.dev/api/v1/product/types/all?super=${superType}`, {
    method: 'GET',
    headers: customHeader,
    cache: 'no-store'
  })
  const data = await getProductTypes.json();
  return NextResponse.json(data);
}