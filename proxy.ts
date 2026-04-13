import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const hasOnboarded = request.cookies.get('has_onboarded')?.value === 'true';
  const { pathname } = request.nextUrl;

  const isAuthPage = ['/', '/signup'].includes(pathname);
  const isOnboardingPage = pathname.startsWith('/onboarding');

  // 1. If NOT logged in -> only allow auth pages
  if (!token) {
    if (!isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // 2. If LOGGED IN -> Block Login/Signup pages
  if (isAuthPage) {
    return NextResponse.redirect(new URL(hasOnboarded ? '/1234/home' : '/onboarding', request.url));
  }

  // 3. If NOT ONBOARDED -> Force Onboarding (unless already there)
  if (!hasOnboarded && !isOnboardingPage) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // 4. If ONBOARDED -> Block Onboarding page
  if (hasOnboarded && isOnboardingPage) {
    return NextResponse.redirect(new URL('/1234/home', request.url));
  }

  return NextResponse.next();
}

// Match all protected paths but EXCLUDE all static assets (images, icons, etc.)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)',
  ],
};
