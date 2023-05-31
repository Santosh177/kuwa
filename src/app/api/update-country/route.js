
import { NextResponse } from 'next/server'
import { setCountryCookie } from '../../../lib/auth-cookies';
import { authHeader } from '../../../lib/auth-cookies';
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();
    const countryData = {
        country:parseInt(requestBody.countryId)
    }
    if(customHeader && customHeader.user){
        const updateProfileResp = await fetch(`https://api.kuwa.bevaleo.dev/api/v1/customer/${customHeader.user}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              ...customHeader
            },
            body:JSON.stringify(countryData)
          });
         const updateProfileData = await updateProfileResp.json();
         console.log("updateProfileData",updateProfileData)
    }
 
     const data =  setCountryCookie(res, requestBody.countryId)
    return NextResponse.json({status:"SUCCESS"})
}