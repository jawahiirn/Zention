import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = ['/', '/signup'].includes(pathname);

  // Not logged in -> only allow auth pages
  if (!token) {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Logged in -> block auth pages, redirect to workspace entry
  if (isAuthPage) {
    return NextResponse.redirect(new URL('/workspace', request.url));
  }

  return NextResponse.next();
}

// Match all protected paths but EXCLUDE all static assets (images, icons, etc.)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)',
  ],
};
