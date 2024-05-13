import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(req,res) {
  const headersList = headers();
  const ipAddress = headersList.get("x-forwarded-for");

console.log("ipAddress",ipAddress)
  try {
    const customHeader = await authHeader();
    const cartData =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/home-page`, {
      method: 'GET',
      headers: customHeader,
      cache: 'no-store'
    })
    const data = await cartData.json();
    const responseData = {
      ipAddress,
      ...data
    };
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({});
  }
 
}