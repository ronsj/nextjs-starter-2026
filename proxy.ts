import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

import {
  buildContentSecurityPolicy,
  createNonce,
  getContentSecurityPolicyHeaderKey,
} from '@/app/lib/content-security-policy'

const protectedPaths = ['/account']

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  const nonce = createNonce()
  const contentSecurityPolicy = buildContentSecurityPolicy(nonce)
  const cspHeaderKey = getContentSecurityPolicyHeaderKey()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set(cspHeaderKey, contentSecurityPolicy)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  response.headers.set(cspHeaderKey, contentSecurityPolicy)

  return response
}

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
