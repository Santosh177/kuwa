
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';
import { Joan } from 'next/font/google';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const addressId = requestBody && requestBody.addressId;
    const deleteAddressResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/module/address/shipping/${addressId}`, {
        method: 'PATCH',
        headers: {
          ...customHeader
        },
        body:JSON.stringify(
          {
              "isActive":false
          })
      });
      const deleteAddress = await deleteAddressResp.json();
      console.log("saveAddresssaveAddresssaveAddress",deleteAddress)
    return NextResponse.json(deleteAddress)
}