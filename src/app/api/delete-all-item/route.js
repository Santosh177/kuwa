
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function GET(request,res) {
    const customHeader = await authHeader();
    const deleteAllCartItemResp = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/cart/all/product/`, {
        method: 'DELETE',
        headers: {
          ...customHeader
        }
      });
    //   const deleteCartItem = await deleteCartItemResp.json();
    //   console.log("deleteCartItem",deleteCartItem)
    return NextResponse.json({status:200,msg:"deleted Successfully"})
}