const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getComments(reportId, token) {
    const res = await fetch(`${BASE_URL}/reportcomments/${reportId}/comments`, {
        headers: getAuthHeaders(token),
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal mengambil komentar");
    const json = await res.json();
    return json.data || [];
}

export async function postComment(reportId, token, body, userId) {
    const res = await fetch(`${BASE_URL}/reportcomments/${reportId}/comments`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify({ body, user_id: userId }),
    });
    if (!res.ok) throw new Error("Gagal mengirim komentar");
    return true;
}