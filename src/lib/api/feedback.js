
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFeedbackByReportId(reportId, token) {
    const res = await fetch(`${BASE_URL}/feedback/${reportId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Gagal ambil feedback");
    }

    return data.data;
}

// CREATE feedback (admin kirim pesan)
export async function createFeedback({ report_id, message }, token) {
    const res = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            report_id,
            message,
        }),
    });

    const text = await res.text();

    let data;
    try {
        data = JSON.parse(text);
    } catch {
        console.error("RESPON ASLI:", text);
        throw new Error("API tidak mengembalikan JSON");
    }

    if (!res.ok) {
        throw new Error(data.message || "Gagal kirim feedback");
    }

    return data;
}