
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const productId = requestBody.productId || "";
    const cancelReason = requestBody.cancelReason || "";

    let data = {
        "status":"CANCELED",
        "cancelReason":cancelReason,
        "product":productId
    }



    const cancellationResp = await fetch(`https://api.kuwa.bevaleo.dev/api/v1/orders/status`, {
        method: 'PUT',
        headers: customHeader,
        body:JSON.stringify([data])
      });
      const cancellationRespData = await cancellationResp.json();
    return NextResponse.json({status:"SUCCESS"})
}