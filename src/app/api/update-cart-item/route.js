
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';


export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const updateCartItem = await fetch('https://api.kuwa.bevaleo.dev/api/v1/update/cart', {
        method: 'PATCH',
        headers: customHeader,
        body:JSON.stringify(requestBody)
      });
      const updateCart = await updateCartItem.json();
    return NextResponse.json({data: updateCart,status:"SUCCESS"})
}