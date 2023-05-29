
import { NextResponse } from 'next/server'
import { setCountryCookie } from '../../../lib/auth-cookies';

export async function POST(request,res) {
    const requestBody = await request.json();
     const data =  setCountryCookie(res, requestBody.countryId)
    return NextResponse.json({status:"SUCCESS"})
}