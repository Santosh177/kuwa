
import { NextResponse } from 'next/server'
import { authHeader } from '../../../lib/auth-cookies';
export const dynamic = 'force-dynamic'
export async function POST(request,res) {
    const requestBody = await request.json();
    const customHeader = await authHeader();

    console.log("customHeaderelast",customHeader)
    console.log("requestBodyrequestBody",requestBody)
    const elasticSearch = await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/elastic-search/search`, {
        method: 'POST',
        headers: {...customHeader},
        body:JSON.stringify(requestBody)
      });
      
      const elasticSearchData = await elasticSearch.json();
      console.log("elasticSearch",elasticSearch,elasticSearchData)
    return NextResponse.json(elasticSearchData)
}