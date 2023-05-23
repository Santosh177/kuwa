
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    console.log("requestBodyrequestBody",requestBody)
    const addressId = requestBody && requestBody.addressId;
    console.log("addressIdaddressIdaddressId",addressId)
    console.log("`https://api.kuwa.bevaleo.dev/module/address/billing/${addressId}`",`https://api.kuwa.bevaleo.dev/module/address/billing/${addressId}`)
    const deleteAddressResp = await fetch(`https://api.kuwa.bevaleo.dev/module/address/billing/${addressId}`, {
        method: 'DELETE',
        headers: {
          ...customHeader
        }
      });
      const deleteAddress = await deleteAddressResp.json();
      console.log("saveAddresssaveAddresssaveAddress",deleteAddress)
    return NextResponse.json(deleteAddress)
}