import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Add matcher to ONLY run middleware on admin routes
export const config = {
  matcher: '/admin/:path*'
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Only protect /admin routes
  if (path.startsWith('/admin')) {
    // Allow access to login page
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // No valid session, redirect to unauthorized
    if (!token) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Valid session, allow access
    return NextResponse.next();
  }

  // Non-admin routes are public
  return NextResponse.next();
}

export function configureCSPMiddleware(request: NextRequest) {
  // Get the existing response
  const response = NextResponse.next();

  // Add security headers
  response.headers.set(
    'Content-Security-Policy',
    `frame-ancestors 'self';
     frame-src 'self' https://www.google.com/;
     child-src 'self' https://www.google.com/;`
  );

  return response;
}

export const configureCSPConfig = {
  matcher: '/:path*',
}
