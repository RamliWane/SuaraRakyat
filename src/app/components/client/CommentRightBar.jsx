"use client";

import { useState, useEffect } from "react";
import { getComments, postComment } from "../../../lib/api/comments";

function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return `${diff} detik`;
    if (diff < 3600) return `${Math.floor(diff / 60)} menit`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam`;
    return `${Math.floor(diff / 86400)} hari`;
}

const avatarPalette = [
    "bg-violet-100 text-violet-700",
    "bg-teal-100 text-teal-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-sky-100 text-sky-700",
];

function getAvatar(username = "") {
    return avatarPalette[username.charCodeAt(0) % avatarPalette.length];
}

export default function CommentRightBar({ reportId, token }) {
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function fetchComments() {
        try {
            const data = await getComments(reportId, token);
            setComments(data);
        } catch {
            // silent
        }
    }

    useEffect(() => {
        fetchComments();
    }, [reportId]);

    async function handleSubmit() {
        if (!input.trim()) return;
        setLoading(true);
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id ?? payload.user_id ?? payload.sub;
            await postComment(reportId, token, input, userId);
            setInput("");
            await fetchComments();
        } catch {
            // silent
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>

            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 shrink-0 flex items-center justify-between">
                <p className="text-[13px] font-semibold text-gray-900 flex items-center gap-2">
                    <i className="ti ti-message-circle text-gray-400" />
                    Komentar Publik
                </p>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                    {comments.length}
                </span>
            </div>

            {/* List komentar */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 no-scrollbar">
                {comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                            <i className="ti ti-message-off text-gray-400 text-lg" />
                        </div>
                        <p className="text-[12px] text-gray-400">Belum ada komentar</p>
                        <p className="text-[11px] text-gray-300">Jadilah yang pertama berkomentar</p>
                    </div>
                ) : (
                    comments.map((c) => (
                        <div key={c.id} className="flex gap-2.5 items-start">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${getAvatar(c.username)}`}>
                                {c.username?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="bg-gray-50 rounded-xl px-3 py-2">
                                    <p className="text-[11px] font-semibold text-gray-800 mb-0.5">{c.username}</p>
                                    <p className="text-[12px] text-gray-600 leading-relaxed">{c.body}</p>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 ml-1">{timeAgo(c.created_at)} yang lalu</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 shrink-0 flex items-center gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Tambahkan komentar..."
                    className="flex-1 text-[13px] px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 placeholder:text-gray-400"
                />
                <button
                    onClick={handleSubmit}
                    disabled={!input.trim() || loading}
                    className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white hover:bg-emerald-700 transition-colors border-0 cursor-pointer shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <i className="ti ti-loader-2 animate-spin text-sm" />
                    ) : (
                        <i className="ti ti-send text-sm" />
                    )}
                </button>
            </div>
        </div>
    );
}