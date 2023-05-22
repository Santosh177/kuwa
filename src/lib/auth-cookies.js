import { serialize, parse } from 'cookie'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

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

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
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
