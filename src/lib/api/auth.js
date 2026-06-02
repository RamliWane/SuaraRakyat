'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData) {
    const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: formData.get("email"),
            password: formData.get("password")
        })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const cookieStore = await cookies();
    cookieStore.set("session_token", data.session_token, {
        httpOnly: true,
        path: "/",
        maxAge: 25200,
        sameSite: "lax"
    });

    const base64 = data.session_token.split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const payload = JSON.parse(Buffer.from(base64, 'base64').toString());

    if (payload.role === "admin" || payload.role === "superadmin") {
        redirect("/admin/dashboard");
    } else {
        redirect("/client/homepage");
    }
}

export async function Logout() {
    const cookieStore = await cookies();
    cookieStore.delete("session_token");
    return NextResponse.json({ success: true });
}