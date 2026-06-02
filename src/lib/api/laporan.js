// tambahlaporan.js
'use server';

import { cookies } from "next/headers";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function tambahLaporan(prevState, formData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    const payload = {
        judul: formData.get("judul"),
        urgensi: formData.get("urgensi"),
        deskripsi: formData.get("deskripsi"),
        lokasi: formData.get("lokasi"),
        category_id: Number(formData.get("category_id")),
        image: formData.get("image") ?? "no-image.jpg",
    };


    const res = await fetch(`${BASE_URL}/reporting`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let errMsg = "Terjadi kesalahan";
        try {
            const errJson = await res.json();
            errMsg = errJson.error || errMsg;
        } catch {
            errMsg = await res.text();
        }
        return { error: errMsg };
    }

    return { success: true };
}


function getAuthHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getLaporanPending(token) {
    const res = await fetch(`${BASE_URL}/reporting/pending`, {
        headers: getAuthHeaders(token),
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal mengambil laporan pending");
    const json = await res.json();
    return json.data;
}   

export async function getAllLaporan() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    const res = await fetch(`${BASE_URL}/reporting`, {
        headers: getAuthHeaders(token),
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal mengambil semua laporan");
    const json = await res.json();
    return json.data;
}

export async function getLaporanById(id, token) {
    const res = await fetch(`${BASE_URL}/reporting/${id}`, {
        headers: getAuthHeaders(token),
        cache: "no-store",
    });

    const text = await res.text();

    // console.log("TOKEN:", token);

    let json;
    try {
        json = JSON.parse(text);
    } catch (e) {
        console.error("INI BUKAN JSON:", text)
        throw new Error("Response bukan JSON");
    }

    if (!res.ok) {
        throw new Error(json?.error || "Laporan tidak ditemukan");
    }

    return json.data;
}

export async function getAllLaporanSaya() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    const res = await fetch(`${BASE_URL}/reporting/user/me`, {
        headers: getAuthHeaders(token),
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal mengambil laporan");
    const json = await res.json();
    return json.data;
}

export async function getLaporanByUserId(userId, token) {
    const res = await fetch(`${BASE_URL}/reporting/user/${userId}`, {
        headers: getAuthHeaders(token),
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal mengambil laporan user");
    const json = await res.json();
    return json.data;
}

export async function updateStatusLaporan(id, status, token) {
    const res = await fetch(`${BASE_URL}/reporting/${id}/status`, {
        method: "PATCH",
        headers: getAuthHeaders(token),
        body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Gagal update status");
    return res.json();
}

export async function deleteLaporan(id, token) {
    const res = await fetch(`${BASE_URL}/reporting/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
    });
    if (!res.ok) throw new Error("Gagal menghapus laporan");
    return true;
}