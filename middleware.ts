import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Nếu đã có locale, cho qua
  if (pathname.startsWith('/en/') || pathname.startsWith('/vi/')) {
    return NextResponse.next();
  }
  
  // Exclude static files và public assets
  if (pathname.startsWith('/files/') || 
      pathname.startsWith('/images/') ||
      pathname.startsWith('/locales/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname === '/favicon.ico') {
    return NextResponse.next();
  }
  
  // Nếu chỉ là root path, redirect đến /vi
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/vi', request.url));
  }
  
  // Các path khác, thêm /vi vào đầu
  return NextResponse.redirect(new URL(`/vi${pathname}`, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|files|images).*)',
  ],
};