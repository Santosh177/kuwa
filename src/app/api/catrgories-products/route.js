
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic';

export async function GET(req)  {
  const customHeader = await authHeader();
  const url = req.url.split("?paramsofCat=")
  console.log(customHeader,url,"customHeadercustomHeadercustomHeader")
  const getProductResp =  await fetch(url[1], {
    method: 'GET',
    headers: {...customHeader},
    cache: 'no-store'
  })
  const data = await getProductResp.json();
  console.log("datadatadatadata",data)
  
  return NextResponse.json(data );

}