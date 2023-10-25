import { serialize, parse } from 'cookie'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { generateDeviceId } from './deviceId';

const TOKEN_NAME = 'token'

export const MAX_AGE = 60 * 60 * 8 // 8 hours

const DOMAIN_CONFIG = {
  "development":'localhost',
  "qa":'kuwa.bevaleo.dev',
  'pre-prod':'preprod.kuwa.bevaleo.dev',
  'prod':'getkuwa.com'
}

const env = process.env.NODE_ENV;

export function setTokenCookie(res, token,userId) {
  const response = NextResponse.next()
  if(token){
    cookies().set({
      name: 'token',
      value: token,
      expires:new Date(253402300000000),
      httpOnly: true,
      secure:true,
      domain: DOMAIN_CONFIG[env],
      path: '/',
    })
  }
  if(userId){
    cookies().set({
      name: 'userId',
      value: userId,
      httpOnly: true,
      expires:new Date(253402300000000),
      secure:true,
      domain:DOMAIN_CONFIG[env],
      path: '/',
    })
  }
}

export function setCountryCookie(res, countryId) {
  console.log("countryIdcountryId",countryId)
  cookies().set({
    name: 'countryId',
    value: countryId,
    httpOnly: true,
    expires:new Date(253402300000000),
    secure:true,
    domain:DOMAIN_CONFIG[env],
    path: '/',
  })
	const response = NextResponse.next()
  response.cookies.set('countryId', countryId)
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })
  cookies().delete('token')
  cookies().delete('userId')
  cookies().delete('deviceID')
}

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getTokenCookie(req) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}

export function getCountryCookie() {
  const country = cookies().get('countryId');
  if(country && country.value){
    return country.value
  }else{
    return null;
  }

}
export const authHeader = async() =>{
  const token = cookies().get('token')
  const user = cookies().get('userId');
  const country = cookies().get('countryId');

 
  if(token && token.value){
    return (
      {
        'Content-Type': 'application/json',
        'country':country &&parseInt(country.value) || 7,
        'Authorization':"Bearer "+token.value,
        'user':parseInt(user.value)
      }
    )
  }else{
    const getDeviceID = cookies().get("deviceID");
    const userId = user && user.value || ""
  
    if(!getDeviceID && !getDeviceID){
        const deviceId = generateDeviceId();
        cookies().set({
          name: 'deviceID',
          value: deviceId,
          httpOnly: true,
          expires:new Date(253402300000000),
          secure:true,
          domain:DOMAIN_CONFIG[env],
          path: '/',
        })
    }
    let data = {
      'Content-Type': 'application/json',
      'country' : country && parseInt(country.value) || 7,
      'device':cookies().get("deviceID").value || ""
    }

    if(userId){
      data['user'] = parseInt(user.value)
    }
    console.log("final Data",data)
    return data;
  }
  
}

