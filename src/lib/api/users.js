'use server';
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

//cuma function yang digunakan untuk jadiin setiap req pake json dan kirim token ke backend
function getAuthHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getUsersById() {
    //ngambil token dari cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    //fetch biasa
    const res = await fetch(`${BASE_URL}/users/me`, {
        headers: getAuthHeaders(token),
        cache: "no-store",
    });

    //kalo res nya gagal, lempar error
    if (!res.ok) throw new Error("Gagal mengambil data user");
    const json = await res.json();
    return json.data;
}