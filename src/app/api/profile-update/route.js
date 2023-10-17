
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    console.log("requestBody",requestBody)
    const updateProfileResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/customer-update/${customHeader.user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...customHeader
        },
        body:JSON.stringify(requestBody)
      });
      const updateProfileData = await updateProfileResp.json();
    return NextResponse.json({data:updateProfileData})
}