
import { NextResponse } from 'next/server'
import { removeTokenCookie } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function GET(request,res) {
    removeTokenCookie(res)
    return NextResponse.json({status:"SUCCESS"})
}