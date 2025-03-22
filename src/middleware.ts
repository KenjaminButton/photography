import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware to handle all routes
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add CSP headers for all routes
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self'; frame-src 'self' https://www.google.com/; child-src 'self' https://www.google.com/"
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
