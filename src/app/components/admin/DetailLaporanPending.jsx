
"use client";

import dynamic from "next/dynamic";
const LaporanMap = dynamic(() => import("./LaporanMap"), { ssr: false });

const statusConfig = {
    pending:  { label: "Pending",  cls: "bg-amber-50 border-amber-200 text-amber-700",   dot: "bg-amber-500" },
    diproses: { label: "Diproses", cls: "bg-blue-50 border-blue-200 text-blue-700",     dot: "bg-blue-500" },
    selesai:  { label: "Selesai",  cls: "bg-emerald-50 border-emerald-200 text-emerald-700", dot: "bg-emerald-500" },
    ditolak:  { label: "Ditolak",  cls: "bg-red-50 border-red-200 text-red-700",         dot: "bg-red-500" },
};

export default function DetailLaporanPending({ data }) {
    if (!data) return (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex items-center justify-center">
            <p className="text-sm text-gray-400">Data tidak tersedia.</p>
        </div>
    );

    const statusCfg = statusConfig[data.status?.toLowerCase()] ?? statusConfig.pending;

    const infoGrid = [
        { icon: "ti-user",     label: "Dilaporkan Oleh", value: data.username ?? "-" },
        { icon: "ti-calendar", label: "Tanggal",          value: data.created_at ? new Date(data.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-" },
        { icon: "ti-layout-grid", label: "Kategori",      value: data.category_name ?? "-" },
        { icon: "ti-map-pin",  label: "Lokasi",           value: data.lokasi ?? "-" },
    ];

    return (
        <div className="flex flex-col gap-3">

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="relative h-55 w-full overflow-hidden">
                    {data.image && data.image !== "no-image.jpg" ? (
                        <img
                            src={data.image}
                            className="h-full w-full object-cover"
                            alt="Foto laporan"
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-100 flex flex-col items-center justify-center gap-2">
                            <i className="ti ti-photo-off text-4xl text-gray-300" aria-hidden="true" />
                            <p className="text-xs text-gray-400">Tidak ada foto</p>
                        </div>
                    )}
                    <div className="absolute inset-0 gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute left-5 top-5 flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium ${statusCfg.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                            {statusCfg.label}
                        </span>
                        {data.category_name && (
                            <span className="rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                                {data.category_name}
                            </span>
                        )}
                        {data.urgensi && (
                            <span className="rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm capitalize">
                               Urgensi : {data.urgensi}
                            </span>
                        )}
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 ">
                        <h1 className="max-w-3xl text-2xl font-bold leading-tight text-black hover:text-white">
                            {data.judul ?? "Tanpa Judul"}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border-t border-gray-100">
                    {infoGrid.map((item) => (
                        <div key={item.label} className="bg-white px-5 py-4">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                <i className={`ti ${item.icon} text-[11px]`} aria-hidden="true" />
                                {item.label}
                            </p>
                            <p className="mt-1.5 text-[13px] font-medium text-gray-900">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-3 flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <i className="ti ti-map-pin text-sm text-emerald-600" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Deskripsi</p>
                        <p className="text-[13px] font-medium text-gray-800 leading-relaxed">
                            {data.deskripsi ?? "Deskripsi tidak tersedia"}
                        </p>
                    </div>
                </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-[14px] font-semibold text-gray-900">Dokumentasi Laporan</h2>
                        <p className="mt-0.5 text-[12px] text-gray-400">Foto pendukung dari warga pelapor</p>
                    </div>
                    <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500">
                        {data.image && data.image !== "no-image.jpg" ? "1 Foto" : "Belum ada foto"}
                    </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {data.image && data.image !== "no-image.jpg" && (
                        <div className="group relative overflow-hidden rounded-xl border border-gray-100 cursor-pointer">
                            <img
                                src={data.image}
                                className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                                alt="Dokumentasi 1"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                                <i className="ti ti-zoom-in text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded-md">
                                Foto 1
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="mb-4">
                    <h2 className="text-[14px] font-semibold text-gray-900">Lokasi Laporan</h2>
                    <p className="mt-0.5 text-[12px] text-gray-400">Titik lokasi laporan dari warga</p>
                </div>
                <LaporanMap lat={data.lat} lng={data.lng} judul={data.judul} />
            </div>
        </div>
    );
}