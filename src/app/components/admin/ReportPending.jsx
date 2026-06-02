"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLaporanPending } from "../../../lib/api/laporan";

const statusConfig = {
    pending:  "bg-amber-50 text-amber-700 border-amber-200",
    diproses: "bg-blue-50 text-blue-700 border-blue-200",
    selesai:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    ditolak:  "bg-red-50 text-red-700 border-red-200",
};

const urgensiConfig = {
    tinggi: "bg-red-50 text-red-700",
    sedang: "bg-amber-50 text-amber-700",
    rendah: "bg-gray-100 text-gray-500",
};

export default function SubmissionPending({ token }) {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getLaporanPending(token);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [token]);

    if (loading) return (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center justify-center gap-3">
            <i className="ti ti-loader-2 animate-spin text-2xl text-emerald-500" />
            <p className="text-sm text-gray-400">Memuat data laporan...</p>
        </div>
    );

    if (error) return (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <i className="ti ti-alert-circle text-xl text-red-500" />
            </div>
            <p className="text-sm font-medium text-gray-800">Gagal memuat data</p>
            <p className="text-xs text-gray-400">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="text-xs text-emerald-600 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
                Coba lagi
            </button>
        </div>
    );

    if (data.length === 0) return (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <i className="ti ti-inbox text-xl text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700">Tidak ada laporan pending</p>
            <p className="text-xs text-gray-400">Semua laporan sudah ditangani.</p>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

            {/* Table header */}
            <div className="grid grid-cols-[0.4fr_1.2fr_1.5fr_1fr_1fr_1fr_0.8fr] px-5 py-3 bg-gray-50 border-b border-gray-200">
                {["No", "Foto", "Username", "Status", "Kategori", "Urgensi", "Aksi"].map((h) => (
                    <span key={h} className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        {h}
                    </span>
                ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100">
                {data.map((item, index) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-[0.4fr_1.2fr_1.5fr_1fr_1fr_1fr_0.8fr] px-5 py-3.5 hover:bg-gray-50 transition-colors items-center"
                    >
                        {/* No */}
                        <span className="text-[12px] text-gray-400">{index + 1}</span>

                        {/* Foto */}
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                            {item.image && item.image !== "no-image.jpg" ? (
                                <img
                                    src={item.image}
                                    alt="foto laporan"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <i className="ti ti-photo-off text-gray-300 text-sm" aria-hidden="true" />
                                </div>
                            )}
                        </div>

                        {/* Username */}
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                                {item.username?.charAt(0).toUpperCase() ?? "U"}
                            </div>
                            <span className="text-[12px] font-medium text-gray-700 truncate">
                                {item.username}
                            </span>
                        </div>

                        {/* Status */}
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border w-fit ${statusConfig[item.status?.toLowerCase()] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                            {item.status}
                        </span>

                        {/* Kategori */}
                        <span className="text-[12px] text-gray-600 truncate">
                            {item.category_name}
                        </span>

                        {/* Urgensi */}
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md w-fit ${urgensiConfig[item.urgensi?.toLowerCase()] ?? "bg-gray-100 text-gray-500"}`}>
                            {item.urgensi}
                        </span>

                        {/* Aksi */}
                        <button
                            onClick={() => router.push(`/admin/detailreportpending/${item.id}`)}
                            className="flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer border-0 w-fit"
                        >
                            <i className="ti ti-settings text-[11px]" aria-hidden="true" />
                            Manage
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer count */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                <p className="text-[11px] text-gray-400">
                    Total <span className="font-semibold text-gray-600">{data.length}</span> laporan pending
                </p>
            </div>
        </div>
    );
}