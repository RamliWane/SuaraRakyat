"use client"

import { useState } from "react";
import React from "react";
import { TrendingUp, Clock3, CircleCheck, Send } from "lucide-react";

const panduan = [
    {
        id: 1,
        icon: <CircleCheck size={18} className="text-green-500" />,
        title: "Isi detail laporan"
    },
    {
        id: 2,
        icon: <CircleCheck size={18} className="text-green-500" />,
        title: "Tentukan lokasi"
    },
    {
        id: 3,
        icon: <CircleCheck size={18} className="text-green-500" />,

        title: "Verifikasi admin"
    },
    {
        id: 4,
        icon: <CircleCheck size={18} className="text-green-500" />,

        title: "Gunakan foto yang jelas dan fokus"
    },
    {
        id: 5,
        icon: <CircleCheck size={18} className="text-green-500" />,

        title: "Tentukan lokasi dengan tepat"
    },
    {
        id: 6,
        icon: <CircleCheck size={18} className="text-green-500" />,

        title: "Laporan akan ditindak lanjuti oleh pihak terkait"
    }
];

const kategori = [
    {
        title: "Jalan Rusak",
        total: "128 laporan",
    },
    {
        title: "Banjir",
        total: "84 laporan",
    },
    {
        title: "Lampu Mati",
        total: "43 laporan",
    },
];

export default function ActionDetailLaporan() {

    const [status, setStatus] = useState("Menunggu review");
    const [priority, setPriority] = useState("");
    const [assignee, setAssignee] = useState("");
    const [note, setNote] = useState("");

    return (
        <div className="flex w-full flex-col gap-2">
            <div className="rounded-[10px] border border-[#232323] bg-[#181818] p-5 text-white">
                <h2 className="text-sm font-semibold text-gray-300">AKSI ADMIN</h2>
                <div>
                    <label className="text-xs text-gray-400">Status laporan</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full mt-1 bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-sm"
                    >
                        <option>Menunggu review</option>
                        <option>Diproses</option>
                        <option>Selesai</option>
                    </select>
                </div>

                <div>
                    <label className="text-xs text-gray-400">Prioritas</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {["Darurat", "Tinggi", "Sedang", "Rendah"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setPriority(item)}
                                className={`border rounded-md py-1 text-sm ${priority === item
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-500"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xs text-gray-400">Assign ke dinas/petugas</label>
                    <select
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        className="w-full mt-1 bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-sm"
                    >
                        <option value="">— Pilih petugas —</option>
                        <option value="petugas1">Petugas 1</option>
                        <option value="petugas2">Petugas 2</option>
                    </select>
                </div>

                <div>
                    <label className="text-xs text-gray-400">Catatan internal</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Catatan untuk tim internal (tidak terlihat warga)..."
                        className="w-full mt-1 bg-[#2a2a2a] border border-gray-600 rounded-md p-2 text-sm h-20 resize-none"
                    />
                </div>
                <div className="mt-3 flex flex-col gap-2">

                    <div className="flex gap-2 mt-auto">
                        <button className="flex-1 border border-gray-500 rounded-md py-2 text-sm hover:bg-gray-700">
                            ✕ Tolak
                        </button>
                        <button className="flex-1 bg-green-600 rounded-md py-2 text-sm hover:bg-green-700">
                            ✔ Verifikasi
                        </button>
                    </div>

                    <button className="w-full border border-gray-500 rounded-md py-2 text-sm hover:bg-gray-700 flex items-center justify-center gap-2">
                        <Send size={16} />
                        Kirim notifikasi ke warga
                    </button>
                </div>
            </div>
            <div className="rounded-[10px] border border-[#232323] bg-[#181818] p-5">
                <div className="mb-4 flex items-center gap-2">
                    <Clock3 size={16} className="text-[#DC9B9B]" />

                    <h2 className="text-sm font-bold text-white">
                        Estimasi Proses
                    </h2>
                </div>

                <div className="rounded-2xl bg-[#131313] p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-[#8A8A8A]">
                            Verifikasi Admin
                        </span>

                        <span className="text-xs font-medium text-white">
                            ± 1 Hari
                        </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#222]">
                        <div className="h-full w-[70%] rounded-full bg-[#DC9B9B]" />
                    </div>

                    <p className="mt-3 text-[11px] leading-relaxed text-[#7A7A7A]">
                        Laporan dengan detail lengkap biasanya lebih cepat diproses.
                    </p>
                </div>
            </div>
        </div>
    );
}