"use client";

import { Heart, MessageCircle } from "lucide-react";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";

const statusStyle = {
    proses: "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50",
    ditolak: "bg-red-600 text-amber-600 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
    selesai: "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
};

export default function LaporanCard({ dataLaporan, token }) {
    console.log("Data yang diterima komponen LaporanCard:", dataLaporan);

    // Jika dataLaporan bukan array (misal berupa object error dari backend)
    if (!Array.isArray(dataLaporan)) {
        return (
            <div className="text-sm text-red-500 p-5 text-center border rounded-xl bg-red-50">
                Gagal memuat laporan: Token login tidak valid atau kedaluwarsa. Silakan login ulang.
            </div>
        );
    }

    if (dataLaporan.length === 0) {
        return (
            <div className="text-sm font-medium text-gray-400 p-8 text-center border-2 border-dashed border-gray-200 rounded-xl w-full">
                Data laporan di database kosong.
            </div>
        );
    }

    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 w-full block">
            {dataLaporan.map((laporan) => {
                const { id, status, lokasi, username, judul, deskripsi, image, urgensi, category_name  } = laporan;

                return (
                    <div key={id} className="break-inside-avoid mb-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-700 overflow-hidden shadow-sm">
                        
                        <div className="bg-zinc-800 h-[120px] flex items-center justify-center">
                            {image && image !== "no-image.jpg" ? (
                                <img src={image} alt="foto laporan" className="w-full h-full object-cover" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 17l4-8 4 4 2-3 4 7H4z" /><circle cx="9" cy="9" r="1" />
                                </svg>
                            )}
                        </div>

                        <div className="p-3 flex flex-col gap-2.5">

                            <div className="flex gap-1.5 flex-wrap">
                                <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md ${statusStyle[status] || "bg-gray-100 text-gray-600"}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    {status || "pending"}
                                </span>

                                <span className="bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400 text-[11px] px-2 py-0.5 rounded-md border border-red-200 dark:border-red-900/50">
                                    {urgensi || "rendah"}
                                </span>

                                <span className="bg-black text-white text-[11px] px-2 py-0.5 rounded-md border">
                                    {category_name}
                                </span>

                                <div className="flex gap-1 ml-auto text-gray-400">
                                    <LikeButton />
                                    <CommentButton 
                                        reportId={id} 
                                        token={token}
                                        username={username}
                                        judul={judul}
                                        deskripsi={deskripsi}
                                        image={image}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[12px] font-medium shrink-0">
                                    {username ? username.charAt(0).toUpperCase() : "U"}
                                </div>
                                <div>
                                    <p className="text-[13px] font-medium text-gray-900 dark:text-white">{username}</p>
                                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                        </svg>
                                        {lokasi || "Lokasi TKP"}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-zinc-700 pt-2.5">
                                <p className="text-[13px] font-medium text-gray-900 dark:text-white leading-snug mb-1">{judul || "Tanpa Judul"}</p>
                                <p className="text-[12px] text-gray-500 dark:text-zinc-400 leading-relaxed">{deskripsi}</p>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}