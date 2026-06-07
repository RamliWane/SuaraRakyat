"use client";

import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import { useRouter } from "next/navigation";

const statusConfig = {
    pending:  { label: "Pending",  cls: "bg-amber-50 text-amber-700 border-amber-200",       },
    diproses: { label: "Diproses", cls: "bg-blue-50 text-blue-700 border-blue-200",            },
    ditolak:  { label: "Ditolak",  cls: "bg-red-50 text-red-700 border-red-200",              },
    selesai:  { label: "Selesai",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200",  },
};

const urgensiConfig = {
    tinggi: "bg-red-50 text-red-700 border-red-200",
    sedang: "bg-amber-50 text-amber-700 border-amber-200",
    rendah: "bg-gray-100 text-gray-500 border-gray-200",
};

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

export default function LaporanCard({ dataLaporan, token }) {
    const router = useRouter();

    if (!Array.isArray(dataLaporan)) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <i className="ti ti-alert-circle text-xl text-red-500" />
                </div>
                <p className="text-sm font-medium text-gray-800">Sesi login kedaluwarsa</p>
                <p className="text-xs text-gray-400">Silakan login ulang untuk melihat laporan.</p>
            </div>
        );
    }

    if (dataLaporan.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <i className="ti ti-inbox text-xl text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700">Belum ada laporan</p>
                <p className="text-xs text-gray-400">Database laporan masih kosong.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-120 mx-auto divide-y divide-gray-200">
            {dataLaporan.map((laporan) => {
                const { id, status, lokasi, username, judul, deskripsi, image, urgensi, category_name } = laporan;
                const statusCfg = statusConfig[status];
                const avatarColor = getAvatar(username);

                return (
                    <div
                        key={id}
                        className="bg-white flex flex-col group pb-2"
                    >
                        {/* ── Header: avatar + username + lokasi ── */}
                        <div
                            className="flex items-center gap-2.5 px-3.5 pt-3 pb-2.5 cursor-pointer"
                            onClick={() => router.push(`/client/detaillaporan/${id}`)}
                        >
                            <div className={`w-11 h-10 rounded-full flex items-center justify-center text-[14px] font-bold shrink-0 ring-2 ring-white ring-offset-1 ${avatarColor}`}>
                                {username?.charAt(0).toUpperCase() ?? "U"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-gray-900 leading-none truncate">
                                    {username || "Anonim"}
                                </p>
                                
                            </div>
                            {/* 3-dot menu placeholder */}
                            <button className="text-gray-400 hover:text-gray-600 p-1 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <i className="ti ti-dots text-base" />
                            </button>
                        </div>

                        {/* ── Square image ── */}
                        <div
                            className="relative w-full aspect-square bg-gray-100 overflow-hidden cursor-pointer"
                            onClick={() => router.push(`/client/detaillaporan/${id}`)}
                        >
                            {image && image !== "no-image.jpg" ? (
                                <img
                                    src={image}
                                    alt="foto laporan"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <i className="ti ti-photo-off text-3xl text-gray-300" />
                                </div>
                            )}

                            {/* Category chip — top left */}
                            {category_name && (
                                <span className="absolute top-2 left-2 bg-black/55 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                                    {category_name}
                                </span>
                            )}

                            {/* Urgensi chip — top right */}
                            {urgensi && (
                                <span className={`absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm ${urgensiConfig[urgensi] ?? urgensiConfig.rendah}`}>
                                    {urgensi.charAt(0).toUpperCase() + urgensi.slice(1)}
                                </span>
                            )}
                        </div>

                        {/* ── Action bar (like, comment) ── */}
                        <div className="flex items-center px-3.5 pt-3 pb-1">
                            <div className="flex items-center gap-3">
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
                            <div className="ml-auto">
                                {statusCfg && (
                                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-[5px] border ${statusCfg.cls}`}>
                                        {statusCfg.label}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* ── Caption ── */}
                        <div
                            className="px-3.5 pb-4 cursor-pointer"
                            onClick={() => router.push(`/client/detaillaporan/${id}`)}
                        >
                            <p className="text-[14px] text-gray-900 leading-snug line-clamp-2">
                                <span className="font-semibold mr-1">{username || "Anonim"}</span>
                                {judul || "Tanpa Judul"}
                            </p>
                            {deskripsi && (
                                <p className="text-[13px] text-gray-400 mt-0.5 line-clamp-1">
                                    {deskripsi}
                                </p>
                            )}
                            {lokasi && (
                                    <p className="text-[13px] text-black font-bold mt-3 flex items-center gap-0.5 truncate">
                                        <i className="ti ti-map-pin text-[13px]" />
                                        {lokasi}
                                    </p>
                                )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
