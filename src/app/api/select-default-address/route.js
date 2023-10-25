
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const selectDefaultAddress = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/customer/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(requestBody)
      });
      const selectDefaultAddressData = await selectDefaultAddress.json();

    return NextResponse.json(selectDefaultAddressData)
}