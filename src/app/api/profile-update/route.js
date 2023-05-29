
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    console.log("requestBody",requestBody)
    const updateProfileResp = await fetch(`https://api.kuwa.bevaleo.dev/api/v1/private/customer/${customHeader.user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'},
        body:JSON.stringify(requestBody)
      });
      const updateProfileData = await updateProfileResp.json();
    return NextResponse.json({data:updateProfileData})
}