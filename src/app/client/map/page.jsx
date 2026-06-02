"use client";

import dynamic from "next/dynamic";
import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import FilterCategory from "../../components/client/FilterCategory";    

const statusFilters = [
    { label: "Semua status", value: "all", dot: "bg-gray-400" },
    { label: "Diproses", value: "diproses", dot: "bg-blue-500" },
    { label: "Selesai", value: "selesai", dot: "bg-emerald-500" },
    { label: "Ditolak", value: "ditolak", dot: "bg-red-500" },
];

const recentPins = [
    { title: "Jalan berlubang Jl. Raya Bogor", loc: "Depok, Jabar", votes: 342, status: "Diproses", statusCls: "bg-blue-50 text-blue-700 border-blue-200", time: "2 jam lalu", cat: "Infrastruktur" },
    { title: "Tumpukan sampah kali Ciliwung", loc: "Condet, Jaktim", votes: 218, status: "Terverifikasi", statusCls: "bg-emerald-50 text-emerald-700 border-emerald-200", time: "5 jam lalu", cat: "Lingkungan" },
    { title: "Dugaan markup anggaran RT 05", loc: "Tangsel, Banten", votes: 487, status: "Eskalasi", statusCls: "bg-red-50 text-red-700 border-red-200", time: "1 hari lalu", cat: "Korupsi" },
    { title: "Puskesmas tutup jam operasional", loc: "Ciamis, Jabar", votes: 156, status: "Selesai", statusCls: "bg-gray-100 text-gray-600 border-gray-200", time: "3 hari lalu", cat: "Kesehatan" },
    { title: "Lampu jalan mati 3 bulan", loc: "Bekasi Utara, Jabar", votes: 203, status: "Diproses", statusCls: "bg-blue-50 text-blue-700 border-blue-200", time: "4 hari lalu", cat: "Infrastruktur" },
];

// Di bagian atas Map.jsx

const MapView = dynamic(() => import("../../components/client/MapView"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <i className="ti ti-loader-2 animate-spin text-2xl text-emerald-500" />
                <p className="text-sm text-gray-400">Memuat peta...</p>
            </div>
        </div>
    ),
});

export default function Map() {
    return (
        <div className="h-screen flex flex-col overflow-hidden text-black bg-gray-50">
            {/* <NavbarHome /> */}
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    <div className="p-4 flex flex-col gap-4 max-w-[1400px] mx-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-[18px] font-semibold text-gray-900 flex items-center gap-2">
                                    <i className="ti ti-map text-emerald-600" aria-hidden="true" />
                                    Peta Laporan
                                </h1>
                                <p className="text-[12px] text-gray-400 mt-0.5">
                                    Lihat sebaran laporan dari seluruh wilayah Indonesia secara real-time.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-600 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-xl px-4 py-2 transition-colors cursor-pointer"
                            >
                                <i className="ti ti-plus text-sm" aria-hidden="true" />
                                Buat Laporan
                            </button>
                        </div>

                        <div className="flex gap-3 h-[520px]">

                            <div className="flex-1 bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col">

                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 gap-3 flex-wrap">
                                    <div className="flex gap-1.5 flex-wrap">
                                        <FilterCategory />
                                    </div>
                                    <div className="flex gap-1.5">
                                        {statusFilters.map((s) => (
                                            <button
                                                key={s.value}
                                                type="button"
                                                className="flex items-center gap-1.5 text-[11px] text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 relative overflow-hidden">
                                    <MapView />
                                </div>
                            </div>

                            <div className="w-[260px] flex-shrink-0 bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                    <span className="text-[12px] font-semibold text-gray-900 flex items-center gap-1.5">
                                        <i className="ti ti-list text-gray-400 text-[13px]" aria-hidden="true" />
                                        Laporan Terbaru
                                    </span>
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                                        {recentPins.length}
                                    </span>
                                </div>

                                <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col divide-y divide-gray-100">
                                    {recentPins.map((r, i) => (
                                        <div
                                            key={i}
                                            className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-start justify-between gap-2 mb-1.5">
                                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${r.statusCls}`}>
                                                    {r.status}
                                                </span>
                                                <span className="text-[10px] text-gray-400 shrink-0">{r.time}</span>
                                            </div>
                                            <p className="text-[12px] font-medium text-gray-800 leading-snug line-clamp-2 mb-1">
                                                {r.title}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                                                    <i className="ti ti-map-pin text-[10px]" aria-hidden="true" />
                                                    {r.loc}
                                                </span>
                                                <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-0.5">
                                                    <i className="ti ti-arrow-up text-[10px]" aria-hidden="true" />
                                                    {r.votes}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-4 py-3 border-t border-gray-100">
                                    <button
                                        type="button"
                                        className="w-full text-[11px] font-medium text-emerald-600 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 rounded-xl py-2 transition-colors cursor-pointer"
                                    >
                                        Lihat semua laporan
                                        <i className="ti ti-arrow-right ml-1 text-[11px]" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}