const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
    post: async (endpoint, body) => {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!res.ok) 
            throw new Error(data.message || 'Something went wrong');
        return data;
    }
};
