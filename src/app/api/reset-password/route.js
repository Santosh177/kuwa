
import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic';

export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("requestBody",requestBody)
  const token = requestBody.token;
  const password = requestBody.password;
    console.log("requestBody",requestBody)
   
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify({token,password}) 
  };

  try {
    const response = await fetch(`${process.env.BACKEND_END_POINT_URL}/reset`, requestOptions);
    const data = await response.json();
    console.log("passwordData",data); 
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error)
    console.error(error); 
  }
  
}
