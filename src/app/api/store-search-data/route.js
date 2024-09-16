
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();

    console.log("customHeaderelast",customHeader)
    console.log("requestBodyrequestBody",requestBody)
    const elasticSearchSave = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/elastic-search/save/search/data`, {
        method: 'POST',
        headers: {...customHeader},
        body:JSON.stringify(requestBody)
      });
      
      const elasticSearchSaveData = await elasticSearchSave.json();
      console.log("elasticSearchData",elasticSearchSave,elasticSearchSaveData)
    return NextResponse.json(elasticSearchSaveData)
}