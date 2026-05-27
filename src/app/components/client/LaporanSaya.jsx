"use client";

const statusConfig = {
    pending:  { label: "Pending",  cls: "bg-amber-50 text-amber-700 border-amber-200",  dot: "bg-amber-500" },
    diproses: { label: "Diproses", cls: "bg-blue-50 text-blue-700 border-blue-200",     dot: "bg-blue-500" },
    selesai:  { label: "Selesai",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    ditolak:  { label: "Ditolak",  cls: "bg-red-50 text-red-700 border-red-200",        dot: "bg-red-500" },
};

export default function LaporanSaya({ data = [] }) {
    if (data.length === 0) return (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <i className="ti ti-inbox text-xl text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">Belum ada laporan</p>
            <p className="text-xs text-gray-400">Lo belum pernah bikin laporan.</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {data.map((item) => {
                const statusCfg = statusConfig[item.status?.toLowerCase()] ?? statusConfig.pending;
                return (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-200 hover:shadow-sm transition-all cursor-pointer">
                        <div className="relative h-[120px] bg-gray-100 flex items-center justify-center overflow-hidden">
                            {item.image && item.image !== "no-image.jpg" ? (
                                <img src={item.image} alt="foto" className="w-full h-full object-cover" />
                            ) : (
                                <i className="ti ti-photo-off text-2xl text-gray-300" />
                            )}
                            {item.category_name && (
                                <span className="absolute top-2 left-2 bg-black/55 text-white text-[10px] font-medium px-2 py-1 rounded-md">
                                    {item.category_name}
                                </span>
                            )}
                        </div>

                        <div className="p-4 flex flex-col gap-2.5">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-md border w-fit ${statusCfg.cls}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                                {statusCfg.label}
                            </span>

                            <h3 className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-2">
                                {item.judul || "Tanpa Judul"}
                            </h3>

                            <p className="text-[11px] text-gray-400 flex items-center gap-1">
                                <i className="ti ti-map-pin text-[10px]" />
                                {item.lokasi ?? "-"}
                            </p>

                            <p className="text-[10px] text-gray-400">
                                {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}