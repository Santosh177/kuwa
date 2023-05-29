
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const applyCouponResp = await fetch('https://api.kuwa.bevaleo.dev/apply-coupon-cart', {
        method: 'POST',
        headers: {...customHeader},
        body:JSON.stringify(requestBody)
      });
      const applyCouponData = await applyCouponResp.json();
    return NextResponse.json(applyCouponData)
}