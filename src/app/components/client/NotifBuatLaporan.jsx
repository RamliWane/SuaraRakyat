"use client";

import { useState, useEffect } from "react";

// Singleton event bus sederhana
const listeners = new Set();

export function showToast(message, type = "success") {
    listeners.forEach(fn => fn({ message, type }));
}

export default function Toast() {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const handler = (data) => {
            setToast(data);
            setTimeout(() => setToast(null), 3500);
        };
        listeners.add(handler);
        return () => listeners.delete(handler);
    }, []);

    if (!toast) return null;

    const isSuccess = toast.type === "success";

    return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 w-96 transition-all duration-300
    ${isSuccess
        ? "bg-[#0f1a13] border border-[#2a5c38] border-l-[3px] border-l-[#3dba6a]"
        : "bg-[#1a0f0f] border border-[#5c2a2a] border-l-[3px] border-l-[#e05252]"
    }`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
        ${isSuccess ? "bg-[#1a3324]" : "bg-[#331a1a]"}`}>
        <i className={`ti ${isSuccess ? "ti-check text-[#3dba6a]" : "ti-alert-triangle text-[#e05252]"} text-base`} />
    </div>
    <div>
        <p className={`m-0 text-[13px] font-medium ${isSuccess ? "text-[#c8f0d4]" : "text-[#f0c8c8]"}`}>
        {isSuccess ? "Laporan berhasil dikirim" : "Gagal mengirim laporan"}
        </p>
        <p className={`mt-0.5 text-xs ${isSuccess ? "text-[#6aab7e]" : "text-[#ab6a6a]"}`}>
        {toast.message}
        </p>
    </div>
    <button onClick={() => setToast(null)} className="ml-auto">
        <i className={`ti ti-x text-sm ${isSuccess ? "text-[#4a7a58]" : "text-[#7a4a4a]"}`} />
    </button>
    </div>
    );
}