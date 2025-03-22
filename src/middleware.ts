import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware to handle all routes
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add CSP headers for all routes with comprehensive Google Maps domains
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google.com maps.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' *.googleapis.com; " +
    "img-src 'self' data: blob: *.google.com *.googleapis.com *.gstatic.com; " +
    "frame-src 'self' *.google.com; " +
    "frame-ancestors 'self'; " +
    "connect-src 'self' *.google.com maps.googleapis.com"
  );

  // Only check auth for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return response;
    }

    try {
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
      });

      if (!token) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: '/:path*',
}
