import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export function withAdmin(request: NextRequest) {
  // Allow access to login page
  if (request.nextUrl.pathname === '/admin/login') {
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

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return withAdmin(request);
  }

  // Add security headers for all routes
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

export const config = {
  matcher: '/:path*',
}
