// tambahlaporan.js
'use server';

import { cookies } from "next/headers";

export default async function tambahLaporan(prevState, formData) { // ← tambah prevState
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    const payload = {
        judul: formData.get("judul"),
        urgensi: formData.get("urgensi"),
        deskripsi: formData.get("deskripsi"),
        lokasi: formData.get("lokasi"),
        category_id: Number(formData.get("category_id")),
        user_id: Number(formData.get("user_id")),
        image: "no-image.jpg",
    };

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}/reporting`, {
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