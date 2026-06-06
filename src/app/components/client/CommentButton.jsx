"use client";

import { getComments, postComment } from "../../../lib/api/comments";
import { MessageCircle, X, Heart, Smile, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

export default function CommentButton({ reportId, token, username, judul, deskripsi, image }) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);


    const [commentCount, setCommentCount] = useState(0);

    // fetch count waktu mount
    useEffect(() => {
        async function fetchCount() {
            try {
                const data = await getComments(reportId, token);
                setCommentCount(data.length);
            } catch {
                // silent fail
            }
        }
        fetchCount();
    }, [reportId, token]);

    // update count setiap kali comments berubah
    async function fetchComments() {
        const data = await getComments(reportId, token);
        setComments(data);
        setCommentCount(data.length);
    }

    // ganti handleSubmit

    async function handleOpen() {
        setOpen(true);
        await fetchComments();
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim()) return;
        setLoading(true);

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id ?? payload.user_id ?? payload.sub;

        await postComment(reportId, token, input, userId);
        setInput("");
        await fetchComments();
        setLoading(false);
    }


    function timeAgo(dateStr) {
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        if (diff < 60) return `${diff} detik`;
        if (diff < 3600) return `${Math.floor(diff / 60)} menit`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} jam`;
        return `${Math.floor(diff / 86400)} hari`;
    }

    return (
        <>
            <button onClick={handleOpen} className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-[11px]">{commentCount}</span>
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80" onClick={() => setOpen(false)} />

                    {/* Modal split */}
                    <div className="relative bg-white w-full max-w-5xl rounded-xl overflow-hidden flex" style={{ height: "90vh" }}>

                        {/* KIRI — Gambar */}
                        <div className="flex-1 bg-black flex items-center justify-center">
                            {image && image !== "no-image.jpg" ? (
                                <img src={image} alt="laporan" className="w-full h-full object-contain" />
                            ) : (
                                <div className="flex flex-col items-center gap-3 text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1">
                                        <path d="M4 17l4-8 4 4 2-3 4 7H4z" /><circle cx="9" cy="9" r="1" />
                                    </svg>
                                    <p className="text-[13px] text-gray-500">Tidak ada gambar</p>
                                </div>
                            )}
                        </div>

                        {/* KANAN — Komentar */}
                        <div className="w-96 flex flex-col shrink-0 border-l border-gray-200">

                            {/* Header user */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-[12px] font-bold">
                                        {username?.charAt(0).toUpperCase() || "A"}
                                    </div>
                                    <span className="text-[13px] font-semibold text-gray-900">{username}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button><MoreHorizontal className="w-5 h-5 text-gray-700" /></button>
                                    <button onClick={() => setOpen(false)}><X className="w-5 h-5 text-gray-700" /></button>
                                </div>
                            </div>

                            {/* Deskripsi post */}
                            <div className="flex gap-3 px-4 py-3 border-b border-gray-100 shrink-0">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                                    {username?.charAt(0).toUpperCase() || "A"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13.5px] text-gray-900 leading-snug">
                                        <span className="font-semibold mr-1.5">{username}</span>
                                        <span className="font-normal">{judul} — {deskripsi}</span>
                                    </p>
                                </div>
                            </div>

                            {/* List komentar */}
                            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-5">
                                {comments.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-2">
                                        <MessageCircle className="w-12 h-12 text-gray-200" strokeWidth={1.5} />
                                        <p className="text-[14px] font-semibold text-gray-900">Belum ada komentar.</p>
                                        <p className="text-[12px] text-gray-400">Jadilah yang pertama berkomentar.</p>
                                    </div>
                                ) : (
                                    comments.map((c) => (
                                        <div key={c.id} className="flex gap-3 items-start">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                                                {c.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13.5px] text-gray-900 leading-snug">
                                                    <span className="font-semibold mr-1.5">{c.username}</span>
                                                    <span className="font-normal">{c.body}</span>
                                                </p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-[11px] text-gray-400">{timeAgo(c.created_at)} yang lalu</span>
                                                    <button className="text-[11px] text-gray-400 font-semibold hover:text-gray-700">Balas</button>
                                                </div>
                                            </div>
                                            <button className="shrink-0 mt-1 group flex flex-col items-center gap-0.5">
                                                <Heart className="w-3.5 h-3.5 text-gray-300 group-hover:text-red-500 transition-colors" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="px-4 py-2 border-t border-gray-100 shrink-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <button className="group">
                                            <Heart className="w-6 h-6 text-gray-800 group-hover:text-red-500 transition-colors" />
                                        </button>
                                        <button>
                                            <MessageCircle className="w-6 h-6 text-gray-800" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Emoji bar */}
                            <div className="px-4 pb-2 flex gap-2 shrink-0">
                                {["❤️", "🙌", "🔥", "👏", "😢", "😍", "😮", "😂"].map((emoji) => (
                                    <button
                                        key={emoji}
                                        onClick={() => setInput(prev => prev + emoji)}
                                        className="text-lg hover:scale-125 transition-transform"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-3 shrink-0">
                                <div className="w-7 h-7 rounded-full gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                                    A
                                </div>
                                <div className="flex-1 flex items-center gap-2">
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                                        placeholder="Tambahkan komentar..."
                                        className="flex-1 text-[13px] focus:outline-none text-gray-800 placeholder-gray-400 bg-transparent"
                                    />
                                    <button type="button">
                                        <Smile className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={!input.trim() || loading}
                                    className="text-[13px] font-semibold text-[#0095f6] disabled:text-blue-200 transition-colors whitespace-nowrap"
                                >
                                    Kirim
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}