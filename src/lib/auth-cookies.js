import { serialize, parse } from 'cookie'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { generateDeviceId } from './deviceId';

const TOKEN_NAME = 'token'

export const MAX_AGE = 60 * 60 * 8 // 8 hours

export function setTokenCookie(res, token,userId) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })
  cookies().set('token', token);
  cookies().set('userId',userId)
	const response = NextResponse.next()
  response.cookies.set('token', token)
  response.cookies.set('userId', userId)
}

export function setCountryCookie(res, countryId) {
  console.log("countryIdcountryId",countryId)
  cookies().set('countryId', countryId);
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
export const authHeader = async() =>{
  const token = cookies().get('token')
  const user = cookies().get('userId');
  const country = cookies().get('countryId');

 
  console.log("33countrycountry",country)
  if(token && token.value){
    return (
      {
        'Content-Type': 'application/json',
        'country':parseInt(country.value) || 1,
        'Authorization':"Bearer "+token.value,
        'user':parseInt(user.value)
      }
    )
  }else{
    const getDeviceID = cookies().get("deviceID");
    if(!getDeviceID && !getDeviceID){
        const deviceId = generateDeviceId();
        cookies().set('deviceID', deviceId);
    }
    return({
      'Content-Type': 'application/json',
      'country' : country && parseInt(country.value) || 1,
      'device':cookies().get("deviceID").value || ""
    })
  }
  
}

