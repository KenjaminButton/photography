import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  
  response.headers.set(
    'Content-Security-Policy',
    `img-src 'self' data: blob: *.googleapis.com *.gstatic.com *.doggoneproblems.com *.wixstatic.com`
  );
  
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};