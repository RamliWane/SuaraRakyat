"use client";

import React from "react";
import {
    TrendingUp,
    Clock3,
    MessageCircleCheck,
    CircleCheck,
} from "lucide-react";

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
    return (
        <div className="flex w-full flex-col gap-2">

            <div className="rounded-[10px] border border-[#232323] bg-[#181818] p-5">
                <div className="mb-5">
                    <h2 className="text-sm font-bold text-white">
                        Panduan Membuat Laporan
                    </h2>

                    <p className="mt-1 text-xs leading-relaxed text-[#7A7A7A]">
                        Ikuti langkah berikut agar laporan cepat diproses.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {panduan.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-3 "
                        >
                            <div className="flex gap-3">
                                <div className="w-4 h-4">
                                    {item.icon}
                                </div>
                                <span className="text-[12px] font-medium text-white">
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[10px] border border-[#232323] bg-[#181818] p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-white">
                        Kategori Populer
                    </h2>

                    <TrendingUp size={16} className="text-[#DC9B9B]" />
                </div>

                <div className="flex flex-col gap-3">
                    {kategori.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 rounded-2xl bg-[#131313] p-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#222222]">
                                {item.icon}
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">
                                    {item.title}
                                </span>

                                <span className="text-[11px] text-[#7A7A7A]">
                                    {item.total}
                                </span>
                            </div>
                        </div>
                    ))}
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