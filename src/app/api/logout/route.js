
import { NextResponse } from 'next/server'
import { removeTokenCookie } from '../../../lib/auth-cookies';

export async function GET(request,res) {
    removeTokenCookie(res)
    return NextResponse.json({status:"SUCCESS"})
}