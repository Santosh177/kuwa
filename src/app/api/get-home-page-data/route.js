import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(req,res) {
  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for");
  const clientIpAddress = ipAddress ? ipAddress.split(',')[0] : '';

  try {
    const customHeader = await authHeader();
    console.log("homepagecustomHeader",customHeader)
    const cartData =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/v2/home-page`, {
      method: 'GET',
      headers: customHeader,
      cache: 'no-store'
    })
    const data = await cartData.json();
    const responseData = {
      clientIpAddress,
      ...data
    };
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({});
  }
 
}