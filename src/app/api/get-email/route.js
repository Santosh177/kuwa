
import { NextResponse } from 'next/server';
import { authHeader } from '../../../lib/auth-cookies';

export const dynamic = 'force-dynamic';

export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("requestBody",requestBody)
    const email = requestBody.email;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify({email}) 
  };

  try {
    const response = await fetch(`${process.env.BACKEND_END_POINT_URL}/send-email?email=${email}`, requestOptions);
    const data = await response.json();
    console.log("emailData",data); 
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(error)
    console.error(error); 
  }
  
}
