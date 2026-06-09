import { NextResponse } from "next/server";

const publicPaths = ["/client/auth/login", "/client/auth/register"];

export function middleware(request) {
    const token = request.cookies.get("session_token")?.value;
    const pathname = request.nextUrl.pathname;

    if (!token) {
        if (publicPaths.includes(pathname)) return NextResponse.next();
        return NextResponse.redirect(new URL("/client/auth/login", request.url)); // langsung ke login
    }

    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        //verifikasi untuk kalo semisal bukan admin / superadmin akan di arahkan ke forbidden
        if (pathname.startsWith("/admin") && payload.role !== "admin" && payload.role !== "superadmin") {
            return NextResponse.redirect(new URL("/forbidden", request.url));
        }

    } catch {
        //kalau token salah / gabisa akan di paksa ke login
        return NextResponse.redirect(new URL("/client/auth/login", request.url));
    }

    //kalo aman semua akan di lanjut ke halaman
    return NextResponse.next();
}

//ini cuma route yang akan kena cek di middleware
export const config = {
    matcher: ["/admin/:path*", "/client/:path*"],
};