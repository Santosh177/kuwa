
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic';

export async function GET(req)  {
  const customHeader = await authHeader();
  const query = req.url.split("?paramsofCat=")
  const apiUrl = `${process.env.BACKEND_END_POINT_URL}/module/product/`;
  let finalUrl = apiUrl;
  if(query && query[1]){
    finalUrl = `${apiUrl}?${query[1]}`
  }
  const getProductResp =  await fetch(finalUrl, {
    method: 'GET',
    headers: {...customHeader},
    cache: 'no-store'
  })
  const data = await getProductResp.json();
  return NextResponse.json(data );

}