
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';

export async function GET(request,res) {
    const customHeader = await authHeader();
    const deleteAllCartItemResp = await fetch(`https://api.kuwa.bevaleo.dev/api/v1/cart/all/product/`, {
        method: 'DELETE',
        headers: {
          ...customHeader
        }
      });
    //   const deleteCartItem = await deleteCartItemResp.json();
    //   console.log("deleteCartItem",deleteCartItem)
    return NextResponse.json({status:200,msg:"deleted Successfully"})
}