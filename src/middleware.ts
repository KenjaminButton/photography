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
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' *.googleapis.com; " +
    "img-src 'self' data: blob: *.googleapis.com *.gstatic.com; " +
    "frame-src 'self' *.google.com *.googleapis.com; " +
    "connect-src 'self' *.googleapis.com; " +
    "font-src 'self' data: *.gstatic.com; " +
    "worker-src 'self' blob:;"
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
