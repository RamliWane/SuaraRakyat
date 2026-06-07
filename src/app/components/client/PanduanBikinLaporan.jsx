"use client";

import React from "react";

const panduan = [
    { id: 1, title: "Isi detail laporan dengan lengkap" },
    { id: 2, title: "Tentukan lokasi dengan tepat" },
    { id: 3, title: "Gunakan foto yang jelas dan fokus" },
    { id: 4, title: "Tunggu verifikasi dari admin" },
    { id: 5, title: "Laporan diteruskan ke instansi terkait" },
    { id: 6, title: "Pantau progres lewat notifikasi" },
];

const kategori = [
    { id: 1, title: "Jalan Rusak", total: "128 laporan" },
    { id: 2, title: "Banjir", total: "84 laporan" },
    { id: 3, title: "Lampu Mati", total: "43 laporan" },
];

const estimasi = [
    { label: "Verifikasi Admin", waktu: "± 1 hari", progress: 70 },
    { label: "Diteruskan ke Instansi", waktu: "± 3 hari", progress: 45 },
    { label: "Penyelesaian", waktu: "± 14 hari", progress: 20 },
];

function Section({ children }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
            {children}
        </div>
    );
}

function SectionHeader({ icon, title, linkLabel }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-[12px] font-semibold text-gray-800 flex items-center gap-1.5">
                <i className={`ti ${icon} text-[13px] text-gray-400`} aria-hidden="true" />
                {title}
            </span>
            {linkLabel && (
                <span className="text-[10px] text-gray-400 cursor-pointer flex items-center gap-0.5 hover:text-gray-600 transition-colors">
                    {linkLabel}
                    <i className="ti ti-arrow-right text-[10px]" aria-hidden="true" />
                </span>
            )}
        </div>
    );
}

function Divider() {
    return <div className="h-px bg-gray-100" />;
}

export default function PanduanBikinLaporan() {
    return (
        <div className="w-64 flex flex-col gap-2  border-l border-gray-200 p-2 min-h-screen shrink-0">

            <Section>
                <SectionHeader icon="ti-list-check" title="Panduan laporan" />

                {panduan.map((r, i) => (
                    <React.Fragment key={r.id}>
                        {i > 0 && <Divider />}
                        <div className="flex gap-2.5 items-center">
                            <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                                <i className="ti ti-check text-[10px] text-emerald-600" aria-hidden="true" />
                            </div>
                            <span className="text-[11px] font-medium text-gray-700 leading-snug">{r.title}</span>
                        </div>
                    </React.Fragment>
                ))}
            </Section>

            <Section>
                <SectionHeader icon="ti-trending-up" title="Kategori terpopuler" />

                {kategori.map((t, i) => (
                    <React.Fragment key={t.id}>
                        {i > 0 && <Divider />}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="text-[16px] font-bold text-gray-200 w-4 text-center shrink-0">{i + 1}</span>
                                <p className="text-[11px] font-medium text-gray-800 truncate">{t.title}</p>
                            </div>
                            <span className="text-[10px] text-gray-400 shrink-0">{t.total}</span>
                        </div>
                    </React.Fragment>
                ))}
            </Section>

            <Section>
                <SectionHeader icon="ti-clock" title="Estimasi proses" />
                <div className="flex flex-col gap-3">
                    {estimasi.map((e, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-500">{e.label}</span>
                                <span className="text-[10px] font-medium text-gray-700">{e.waktu}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: `${e.progress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mt-1">
                    <p className="text-[10px] text-emerald-700 leading-relaxed">
                        <i className="ti ti-info-circle mr-1" aria-hidden="true" />
                        Laporan dengan foto dan detail lengkap biasanya diproses lebih cepat.
                    </p>
                </div>
            </Section>
        </div>
    );
}