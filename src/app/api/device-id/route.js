
import { NextResponse } from 'next/server';
import { generateDeviceId } from '../../../lib/deviceId';
import { cookies } from 'next/headers';
// import { setDeviceID } from '../../../lib/deviceId';


export async function GET(request,res) {
    const getDeviceID = cookies().get("deviceID");
    console.log("getDeviceIDgetDeviceID",getDeviceID)
    if(!getDeviceID && !getDeviceID.value){
        const deviceId = generateDeviceId();
        cookies().set('deviceID', deviceId);
    }
   return NextResponse.json({status:"Success"})
}