import { NextResponse } from "next/server";

import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

const redirects = [
  { source: '/discount', destination: '/' },
  { source: '/collections/beauty-amp-skin', destination: '/collections/skin-care' },
  { source: '/account/login', destination: '/login' },
  { source: '/module/product-page/seo/mamaearth-hydragel-indian-sunscreen-for-sun-protection-50gm', destination: '/products/mamaearth-hydragel-indian-sunscreen-for-sun-protection-50gm'},
  { source: '/cart/change', destination: '/' },
  { source: '/pages/spurit-invoices-cancelled', destination: '/' },
  { source: '/static', destination: '/' },
  { source: '/customers/pid', destination: '/' },
  { source: '/collections/all/Biotics-Research', destination: '/' },
  { source: '/blogs/news', destination: '/' },
  { source: '/collections/all/Goli', destination: '/' },
  { source: '/collections/all/Viridian', destination: '/' },
  { source: '/sandbox/worker', destination: '/' },
  { source: '/web-pixel-', destination: '/' },
  { source: '/contact', destination: '/' },
  { source: '/account', destination: '/' },
  { source: '/collections/all/Nutrigold', destination: '/' },
  { source: '/cart/update', destination: '/' },
  { source: '/collections/protein-category/1000', destination: '/collections/proteins' },
  { source: '/collections/skin-category/1000', destination: '/collections/skin-care' },
  { source: '/collections/all/Wellbeing-Nutrition', destination: '/collections/wellbeing-nutrition' },
  // { source: '/collections/vendors', destination: '/collections/dabur' },
  { source: '/collections/melts/1000', destination: '/collections/wellbeing-nutrition' },
  { source: '/collections/for-him', destination: '/collections/mens-performance' },
  { source: '/collections/all/ProHealth', destination: '/' },
  { source: '/collections/all/Terra-Origin', destination: '/' },
  { source: '/collections/all/Kapiva', destination: '/collections/kapiva' },
  { source: '/collections/tru-niagen', destination: '/' },



];

const getUser = async (data) => {

    try {
      // const userLoginResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/customer/${data.userId}`, {
        const userLoginResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/private/customer/profile/${data.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token,
        }
      })
      const userData = await userLoginResp.json();
      if(data && data.token){
        return {isLogin:true, userData:userData};
      }else{
        return {isLogin:false, userData:userData};
      }
     } catch (err) {
      return {isLogin:false,userData:null}
     }

};


const getCountryList = async() => {
  const getCountryListResp  =  await fetch(`${process.env.BACKEND_END_POINT_URL}/api/v1/active/countries/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const countryListData = await getCountryListResp.json();
  if(countryListData && countryListData.length > 0){
    return countryListData;
  }
}



export async function middleware(req) {
  console.log("middlewareReq",req)
  let token = req.cookies.get("token");
  let userId = req.cookies.get("userId");
  let countryId = req.cookies.get("countryId");
  let userData = {};
  let countryList = {};

  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName).value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  const response  = NextResponse.next()
  if((token && token.value && userId && userId.value)){
    userData = await getUser({token:token.value , userId:userId.value});
    countryList = await getCountryList();
    if(userData && userData.isLogin){
      const filteredCountry = countryList?.find((data,index)=>data.id == userData.userData.country)
      const selectedCountryData = filteredCountry;
      if(selectedCountryData){
        response.cookies.set("countryId",selectedCountryData.id);
      }else{
        const defaultCountry = countryList && countryList[0] && countryList[0]['id'] || "";
        response.cookies.set("countryId",defaultCountry);
      }
      
    }
  }

  const pathname = req.nextUrl.pathname
 
console.log("pathname++++" , pathname);
  let redirectRule = redirects.find(rule => pathname === rule.source);
  if (redirectRule) {
    return NextResponse.redirect(new URL(redirectRule.destination, req.url));
  }
  if(pathname == "/collections/vendors"){
    return NextResponse.redirect(new URL("/collections/dabur", req.url));
  }
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    
    if (lng === 'en') {
      console.log('englishLanguage');
      // e.g. incoming request is /en/about
      // The new URL is now /about
      return NextResponse.rewrite(
        new URL(`/${fallbackLng}${pathname}${req.nextUrl.search}`, req.url)
      );
    } else {
      console.log("arabicLanguage")
      return NextResponse.redirect(new URL(`/${lng}${pathname}${req.nextUrl.search}`, req.url));
    }
  }

 

  // if (req.headers.has('referer')) {
  //   const refererUrl = new URL(req.headers.get('referer'))
  //   const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
  //   const response = NextResponse.next()
  //   if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
  //   return response
  // }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}