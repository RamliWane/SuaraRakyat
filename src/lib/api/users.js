'use server';
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getUsersById() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    const res = await fetch(`${BASE_URL}/users/me`, {
        headers: getAuthHeaders(token),
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal mengambil data user");
    const json = await res.json();
    return json.data;
}