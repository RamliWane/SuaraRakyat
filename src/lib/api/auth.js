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

export async function registerAction(formData) {

    const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password")
        })
    });

    //Ambil response dari backend dalam bentuk JSON
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Register gagal");

    //Kalau backend langsung kasih token (auto login)
    if (data.session_token) {
        //Ambil cookie store
        const cookieStore = await cookies();
        //Simpan token ke cookie
        cookieStore.set("session_token", data.session_token, {
            path: "/",
            maxAge: 25200,
            sameSite: "lax"
        });

        //Ambil bagian payload dari JWT (bagian tengah)
        const base64 = data.session_token.split('.')[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        // Decode payload JWT jadi object
        const payload = JSON.parse(
            Buffer.from(base64, 'base64').toString()
        );

        // Cek role user
        if (payload.role === "admin" || payload.role === "superadmin") {
            redirect("/admin/dashboard");
        } else {
            redirect("/client/homepage");
        }
    }
    redirect("/client/auth/login");
}

export async function Logout() {
    const cookieStore = await cookies();
    cookieStore.delete("session_token");
    redirect("/"); // langsung redirect, ga perlu NextResponse
}