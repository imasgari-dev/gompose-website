import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'docs_session'
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret')

export type Session = { username: string, role: 'admin' }

export async function createSession(username: string) {
  const token = await new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
  cookies().set(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' })
}

export async function getSession(): Promise<Session | null> {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return { username: String(payload.username), role: 'admin' }
  } catch {
    return null
  }
}

export async function destroySession() {
  cookies().set(COOKIE_NAME, '', { httpOnly: true, maxAge: 0, path: '/' })
}
