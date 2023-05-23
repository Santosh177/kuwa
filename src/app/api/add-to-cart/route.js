
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const addToCartResp = await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart/', {
        method: 'POST',
        headers: {...customHeader},
        body:JSON.stringify(requestBody)
      });
      const addToCartData = await addToCartResp.json();
    return NextResponse.json(addToCartData)
}