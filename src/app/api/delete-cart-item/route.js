
import { NextResponse } from 'next/server'
import { setTokenCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const cartItemId = requestBody && requestBody.cartItemId;
    const deleteCartItemResp = await fetch(`https://api.kuwa.bevaleo.dev/api/v1/cart/product/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          ...customHeader
        }
      });
      const deleteCartItem = await deleteCartItemResp.json();
      console.log("deleteCartItem",deleteCartItem)
    return NextResponse.json(deleteCartItem)
}