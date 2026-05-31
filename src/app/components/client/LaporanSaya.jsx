"use client";

import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";

const statusConfig = {
    pending:  { label: "Pending",  cls: "bg-amber-50 text-amber-700 border-amber-200",  dot: "bg-amber-500" },
    diproses: { label: "Diproses", cls: "bg-blue-50 text-blue-700 border-blue-200",     dot: "bg-blue-500" },
    selesai:  { label: "Selesai",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    ditolak:  { label: "Ditolak",  cls: "bg-red-50 text-red-700 border-red-200",        dot: "bg-red-500" },
};

const urgensiConfig = {
    tinggi: "bg-red-50 text-red-800 border-red-200",
    sedang: "bg-amber-50 text-amber-800 border-amber-200",
    rendah: "bg-gray-50 text-gray-600 border-gray-200",
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

export default function LaporanSaya({ data = [], token }) {
    if (data.length === 0) return (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <i className="ti ti-inbox text-xl text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">Belum ada laporan</p>
            <p className="text-xs text-gray-400">Lo belum pernah bikin laporan.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
            {data.map((item) => {
                const { id, status, lokasi, username, judul, deskripsi, image, urgensi, category_name } = item;
                const statusCfg = statusConfig[status?.toLowerCase()] ?? statusConfig.pending;
                const avatarColor = getAvatar(username);

                return (
                    <div key={id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col hover:border-emerald-300 hover:shadow-sm transition-all duration-200 cursor-pointer">
                        <div className="relative h-60 bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                            {image && image !== "no-image.jpg" ? (
                                <img src={image} alt="foto laporan" className="w-full h-full object-cover" />
                            ) : (
                                <i className="ti ti-photo-off text-2xl text-gray-300" aria-hidden="true" />
                            )}
                            {category_name && (
                                <span className="absolute top-2 left-2 bg-black/55 text-white text-[10px] font-medium px-2 py-1 rounded-md">
                                    {category_name}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2.5 p-3.5 flex-1">
                            <div className="flex gap-1.5 flex-wrap">
                                {statusCfg && (
                                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md border ${statusCfg.cls}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                                        {statusCfg.label}
                                    </span>
                                )}
                                {urgensi && (
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${urgensiConfig[urgensi] ?? urgensiConfig.rendah}`}>
                                        {urgensi.charAt(0).toUpperCase() + urgensi.slice(1)}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-[13px] font-semibold text-gray-900 leading-snug mb-1 line-clamp-2">
                                    {judul || "Tanpa Judul"}
                                </h3>
                                <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                                    {deskripsi}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 mt-auto">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${avatarColor}`}>
                                        {username?.charAt(0).toUpperCase() ?? "U"}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-medium text-gray-700 truncate">{username || "Anonim"}</p>
                                        {lokasi && (
                                            <p className="text-[10px] text-gray-400 flex items-center gap-0.5 truncate">
                                                <i className="ti ti-map-pin text-[10px]" aria-hidden="true" />
                                                {lokasi}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
}