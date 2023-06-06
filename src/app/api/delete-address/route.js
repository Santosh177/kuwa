
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';
import { Joan } from 'next/font/google';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    console.log("requestBodyrequestBody",requestBody)
    const addressId = requestBody && requestBody.addressId;
    console.log("addressIdaddressIdaddressId",addressId)
    console.log(`https://api.kuwa.bevaleo.dev/module/address/shipping/${addressId}`)
    const deleteAddressResp = await fetch(`https://api.kuwa.bevaleo.dev/module/address/shipping/${addressId}`, {
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