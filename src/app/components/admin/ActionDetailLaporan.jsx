"use client"

import { useState } from "react";

const priorityConfig = {
    Darurat: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    Tinggi:  "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    Sedang:  "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    Rendah:  "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100",
};

const priorityActive = {
    Darurat: "bg-red-600 text-white border-red-600",
    Tinggi:  "bg-amber-500 text-white border-amber-500",
    Sedang:  "bg-blue-600 text-white border-blue-600",
    Rendah:  "bg-gray-600 text-white border-gray-600",
};

const estimasi = [
    { label: "Verifikasi Admin", waktu: "± 1 hari", progress: 70 },
    { label: "Diteruskan ke Instansi", waktu: "± 3 hari", progress: 45 },
    { label: "Penyelesaian", waktu: "± 14 hari", progress: 20 },
];

function Section({ children }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
            {children}
        </div>
    );
}

function SectionHeader({ icon, title, subtitle }) {
    return (
        <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <i className={`ti ${icon} text-sm text-emerald-600`} aria-hidden="true" />
            </div>
            <div>
                <p className="text-[13px] font-semibold text-gray-900">{title}</p>
                {subtitle && <p className="text-[11px] text-gray-400">{subtitle}</p>}
            </div>
        </div>
    );
}

function Label({ children }) {
    return (
        <label className="block text-[12px] font-medium text-gray-600 mb-1.5">
            {children}
        </label>
    );
}

const selectCls = "w-full h-10 px-3 text-sm bg-white border border-gray-200 rounded-xl text-gray-800 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 appearance-none cursor-pointer";

export default function ActionDetailLaporan() {
    const [status, setStatus] = useState("menunggu");
    const [priority, setPriority] = useState("");
    const [assignee, setAssignee] = useState("");
    const [note, setNote] = useState("");

    return (
        <div className="flex w-full flex-col gap-2">

            <Section>
                <SectionHeader
                    icon="ti-shield-check"
                    title="Aksi Admin"
                    subtitle="Kelola dan tindaklanjuti laporan ini"
                />

                <div className="h-px bg-gray-100" />

                <div>
                    <Label>Status laporan</Label>
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={selectCls}
                        >
                            <option value="menunggu">Pending</option>
                            <option value="diproses">Diproses</option>
                            <option value="ditolak">Ditolak</option>
                        </select>
                        <i className="ti ti-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" aria-hidden="true" />
                    </div>
                </div>

                <div>
                    <Label>Tingkat prioritas</Label>
                    <div className="grid grid-cols-2 gap-2">
                        {["Darurat", "Tinggi", "Sedang", "Rendah"].map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setPriority(item)}
                                className={`border rounded-xl py-2 text-[12px] font-medium transition-all cursor-pointer
                                    ${priority === item ? priorityActive[item] : priorityConfig[item]}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <Label>Catatan</Label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Berikan Catatan"
                        className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-800 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 placeholder:text-gray-400 resize-none h-20"
                    />
                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                        <i className="ti ti-eye-off text-[11px]" aria-hidden="true" />
                        Catatan Untuk Para Pelapor
                    </p>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="flex-1 flex items-center justify-center gap-1.5 border border-red-200 text-red-600 bg-red-50 rounded-xl py-2.5 text-[12px] font-medium hover:bg-red-100 transition-colors cursor-pointer"
                        >
                            <i className="ti ti-x text-sm" aria-hidden="true" />
                            Tolak
                        </button>
                        <button
                            type="button"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 text-white rounded-xl py-2.5 text-[12px] font-medium hover:bg-emerald-700 transition-colors cursor-pointer border-0"
                        >
                            <i className="ti ti-check text-sm" aria-hidden="true" />
                            Verifikasi
                        </button>
                    </div>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 bg-gray-50 rounded-xl py-2.5 text-[12px] font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <i className="ti ti-send text-sm" aria-hidden="true" />
                        Kirim notifikasi ke warga
                    </button>
                </div>
            </Section>

            <Section>
                <SectionHeader
                    icon="ti-clock"
                    title="Estimasi Proses"
                    subtitle="Perkiraan waktu penanganan laporan"
                />

                <div className="h-px bg-gray-100" />

                <div className="flex flex-col gap-3">
                    {estimasi.map((e, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] text-gray-500">{e.label}</span>
                                <span className="text-[11px] font-medium text-gray-700">{e.waktu}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all"
                                    style={{ width: `${e.progress}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                    <p className="text-[11px] text-emerald-700 leading-relaxed">
                        <i className="ti ti-info-circle mr-1" aria-hidden="true" />
                        Laporan dengan foto dan detail lengkap biasanya diproses lebih cepat.
                    </p>
                </div>
            </Section>

        </div>
    );
}