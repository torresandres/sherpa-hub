import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'
import { intlMiddleware } from '@/i18n'

export async function middleware(request: NextRequest) {
  const session = await auth()

  if (!session && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}