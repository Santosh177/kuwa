
import { NextResponse } from 'next/server'

export async function POST(request,res) {
    const requestBody = await request.json();
    console.log("requestBodyrequestBody",requestBody)
    const updateCartItem = await fetch('https://api.kuwa.bevaleo.dev/api/v1/cart', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            "user":9090,
            "country":1
        },
        body:JSON.stringify(requestBody)
      });
      const updateCart = await updateCartItem.json();

      console.log("updateCartupdateCart",updateCart)

    return NextResponse.json({data: updateCart,status:"SUCCESS"})
}