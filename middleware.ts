import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Bỏ qua API routes và static/public assets
    if (
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/files/") ||
        pathname.startsWith("/images/") ||
        pathname.startsWith("/locales/") ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }

    // Lấy cookie 'lang'
    const lang = request.cookies.get("lang")?.value;
    const localeFromCookie = lang === "en" ? "en" : "vi"; // mặc định là 'vi'

    // Nếu URL đã có locale nhưng KHÔNG khớp với cookie thì redirect
    if (pathname.startsWith("/en/") || pathname.startsWith("/vi/")) {
        const localeInPath = pathname.split("/")[1];
        if (localeInPath !== localeFromCookie) {
            const newPath = pathname.replace(/^\/(en|vi)/, `/${localeFromCookie}`);
            return NextResponse.redirect(new URL(newPath, request.url));
        }
        return NextResponse.next(); // locale đúng rồi, cho qua
    }

    // Nếu là root path, redirect theo cookie
    if (pathname === "/") {
        return NextResponse.redirect(new URL(`/${localeFromCookie}`, request.url));
    }

    // Với các path chưa có locale, thêm locale vào đầu
    return NextResponse.redirect(new URL(`/${localeFromCookie}${pathname}`, request.url));
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|files|images).*)"],
};
