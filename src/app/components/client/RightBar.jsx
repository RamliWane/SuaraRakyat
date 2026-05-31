"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getAllLaporanSaya } from "../../../lib/api/laporan";

const categoryIcons = {
    "Infrastruktur": { icon: "ti-road",   iconCls: "bg-[#f1f0e8] text-[#444441]" },
    "Lingkungan":    { icon: "ti-leaf",   iconCls: "bg-[#e1f5ee] text-[#085041]" },
    "Keamanan":      { icon: "ti-shield", iconCls: "bg-[#faeeda] text-[#633806]" },
    "Pendidikan":    { icon: "ti-school", iconCls: "bg-[#eef2ff] text-[#3730a3]" },
};

const statusConfig = {
    pending:  { badge: "bg-amber-50 text-amber-800",      bar: "bg-amber-400",    progress: 10 },
    diproses: { badge: "bg-blue-50 text-blue-800",        bar: "bg-blue-400",     progress: 50 },
    selesai:  { badge: "bg-emerald-50 text-emerald-800",  bar: "bg-emerald-500",  progress: 100 },
    ditolak:  { badge: "bg-red-50 text-red-800",          bar: "bg-red-400",      progress: 100 },
};

const trending = [
    { rank: 1, title: "Jalan berlubang SDN 04", location: "Kebayoran Baru", like: 42 },
    { rank: 2, title: "Sampah liar Jl. Wahid Hasyim", location: "Menteng", like: 38 },
    { rank: 3, title: "Saluran mampet RT 03 Tebet", location: "Tebet", like: 28 },
];

function Section({ children }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
            {children}
        </div>
    );
}

function SectionHeader({ icon, title, linkLabel, href }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-[12px] font-semibold text-gray-800 flex items-center gap-1.5">
                <i className={`ti ${icon} text-[13px] text-gray-400`} />
                {title}
            </span>
            {linkLabel && (
                <a href={href} className="text-[10px] text-gray-400 cursor-pointer flex items-center gap-0.5 hover:text-gray-600 transition-colors">
                    {linkLabel}
                    <i className="ti ti-arrow-right text-[10px]" />
                </a>
            )}
        </div>
    );
}

function Divider() {
    return <div className="h-px bg-gray-100" />;
}

const MapView = dynamic(() => import("../../components/client/MapView"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
            <i className="ti ti-loader-2 animate-spin text-2xl text-emerald-500" />
        </div>
    ),
});

export default function RightBar() {
    const [laporan, setLaporan] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllLaporanSaya();
                setLaporan(data?.slice(0, 3) ?? []);
            } catch {
                // silent
            }
        }
        fetchData();
    }, []);

    return (
        <div className="w-70 flex flex-col gap-2 bg-gray-50 border-l border-gray-200 p-3 min-h-screen shrink-0">

            <Section>
                <SectionHeader icon="ti-file-description" title="Laporan saya" linkLabel="Lihat semua" href="/client/submission" />

                {laporan.length === 0 ? (
                    <p className="text-[11px] text-gray-400 text-center py-2">Belum ada laporan</p>
                ) : laporan.map((r, i) => {
                    const cfg = statusConfig[r.status?.toLowerCase()] ?? statusConfig.pending;
                    const iconCfg = categoryIcons[r.category_name] ?? { icon: "ti-file", iconCls: "bg-gray-100 text-gray-500" };
                    return (
                        <React.Fragment key={r.id}>
                            {i > 0 && <Divider />}
                            <div className="flex gap-2.5 items-start">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[13px] shrink-0 ${iconCfg.iconCls}`}>
                                    <i className={`ti ${iconCfg.icon}`} />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-1">
                                    <div className="flex justify-between items-start gap-1">
                                        <span className="text-[11px] font-medium text-gray-800 truncate">{r.judul}</span>
                                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${cfg.badge}`}>
                                            {r.status}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">
                                        {r.created_at ? new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" }) : "-"} · {r.lokasi}
                                    </span>
                                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden mt-0.5">
                                        <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${cfg.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
            </Section>

            <Section>
                <SectionHeader icon="ti-trending-up" title="Trending minggu ini" />
                {trending.map((t, i) => (
                    <React.Fragment key={t.rank}>
                        {i > 0 && <Divider />}
                        <div className="flex items-center gap-2.5">
                            <span className="text-[16px] font-bold text-gray-200 w-4 text-center shrink-0">{t.rank}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-medium text-gray-800 truncate">{t.title}</p>
                                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                    <i className="ti ti-map-pin text-[9px]" />{t.location}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <i className="ti ti-arrow-up text-[12px] text-emerald-500" />
                                <span className="text-[11px] font-semibold text-emerald-600">{t.like}</span>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </Section>

            <Section>
                <SectionHeader icon="ti-map" title="Peta laporan" linkLabel="Buka penuh" href="/client/peta" />
                <div className="rounded-xl overflow-hidden" style={{ height: "160px" }}>
                    <MapView />
                </div>
            </Section>
        </div>
    );
}