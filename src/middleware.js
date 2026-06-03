import { NextResponse } from "next/server";

const publicPaths = ["/client/auth/login", "/client/auth/register"];

export function middleware(request) {
    const token = request.cookies.get("session_token")?.value;
    const pathname = request.nextUrl.pathname;

    if (!token) {
        if (publicPaths.includes(pathname)) return NextResponse.next();
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        if (pathname.startsWith("/admin") && payload.role !== "admin" && payload.role !== "superadmin") {
            return NextResponse.redirect(new URL("/forbidden", request.url));
        }

    } catch {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/client/:path*"],
};