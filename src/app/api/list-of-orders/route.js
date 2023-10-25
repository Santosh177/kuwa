import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';
 

export const dynamic = 'force-dynamic';
export async function GET() {

  try {
    const customHeader = await authHeader();
    console.log("customHeadercustomHeader",customHeader)
    const listOfMyOrderResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/module/list-my-order`, {
      method: 'GET',
      headers:{
        ...customHeader
      },
      cache: 'no-store'
    })
    const listOfMyOrder = await listOfMyOrderResp.json();
    console.log("listOfMyOrderlistOfMyOrder",listOfMyOrder)
    return NextResponse.json(listOfMyOrder);
  } catch (error) {
    return NextResponse.json({});
  }
 
}