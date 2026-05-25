import React from "react";

const reports = [
    {
        id: 1,
        icon: "ti-road",
        iconCls: "bg-[#f1f0e8] text-[#444441]",
        title: "Jalan berlubang Jl. Mawar",
        date: "14 Mei",
        location: "Kebayoran Baru",
        status: "Diproses",
        progress: 45,
    },
    {
        id: 2,
        icon: "ti-droplet",
        iconCls: "bg-[#e1f5ee] text-[#085041]",
        title: "Saluran mampet RT 03",
        date: "10 Mei",
        location: "Tebet",
        status: "Ditolak",
        progress: 20,
    },
    {
        id: 3,
        icon: "ti-bulb",
        iconCls: "bg-[#faeeda] text-[#633806]",
        title: "Lampu mati Sisingamangaraja",
        date: "5 Mei",
        location: "Jaksel",
        status: "Selesai",
        progress: 100,
    },
];

const trending = [
    { rank: 1, title: "Jalan berlubang SDN 04", location: "Kebayoran Baru", like: 42 },
    { rank: 2, title: "Sampah liar Jl. Wahid Hasyim", location: "Menteng", like: 38 },
    { rank: 3, title: "Saluran mampet RT 03 Tebet", location: "Tebet", like: 28 },
];

const statusConfig = {
    Diproses: { badge: "bg-blue-50 text-blue-800", bar: "bg-blue-400" },
    Selesai:  { badge: "bg-emerald-50 text-emerald-800", bar: "bg-emerald-500" },
    Ditolak:  { badge: "bg-red-50 text-red-800", bar: "bg-red-400" },
};

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

export default function RightBar() {
    return (
        <div className="w-[252px] flex flex-col gap-2 bg-gray-50 border-l border-gray-200 p-3 min-h-screen shrink-0">

            {/* Laporan Saya */}
            <Section>
                <SectionHeader icon="ti-file-description" title="Laporan saya" linkLabel="Lihat semua" />

                {reports.map((r, i) => {
                    const cfg = statusConfig[r.status];
                    return (
                        <React.Fragment key={r.id}>
                            {i > 0 && <Divider />}
                            <div className="flex gap-2.5 items-start">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[13px] shrink-0 ${r.iconCls}`}>
                                    <i className={`ti ${r.icon}`} aria-hidden="true" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col gap-1">
                                    <div className="flex justify-between items-start gap-1">
                                        <span className="text-[11px] font-medium text-gray-800 truncate">{r.title}</span>
                                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${cfg.badge}`}>
                                            {r.status}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">{r.date} · {r.location}</span>
                                    <div className="h-[2px] bg-gray-100 rounded-full overflow-hidden mt-0.5">
                                        <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${r.progress}%` }} />
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
                                    <i className="ti ti-map-pin text-[9px]" aria-hidden="true" />{t.location}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <i className="ti ti-arrow-up text-[12px] text-emerald-500" aria-hidden="true" />
                                <span className="text-[11px] font-semibold text-emerald-600">{t.like}</span>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </Section>

            <Section>
                <SectionHeader icon="ti-map" title="Peta laporan" linkLabel="Buka penuh" />

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl h-[80px] flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-emerald-100 transition-colors relative overflow-hidden">
                    {[
                        { top: "28%", left: "30%", delay: "0s" },
                        { top: "50%", left: "58%", delay: "0.7s" },
                        { top: "18%", left: "68%", delay: "1.4s" },
                    ].map((dot, i) => (
                        <React.Fragment key={i}>
                            <span
                                className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400/30 animate-ping"
                                style={{ top: dot.top, left: dot.left, animationDelay: dot.delay }}
                            />
                            <span
                                className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500 border-2 border-white"
                                style={{ top: `calc(${dot.top} + 4px)`, left: `calc(${dot.left} + 4px)` }}
                            />
                        </React.Fragment>
                    ))}
                    <i className="ti ti-map-2 text-xl text-emerald-300 relative z-10" aria-hidden="true" />
                    <span className="text-[10px] text-gray-400 relative z-10">Lihat peta interaktif</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5">
                        <p className="text-[17px] font-bold text-gray-800">24</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">Laporan aktif</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5">
                        <p className="text-[17px] font-bold text-gray-800">3</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">Dalam prosesmu</p>
                    </div>
                </div>
            </Section>
        </div>
    );
}