import React from "react";

const reports = [
  {
    id: 1,
    icon: "🏗️",
    title: "Jalan berlubang...",
    date: "14 Mei",
    location: "Kebayoran Baru",
    status: "Diproses",
    progress: 45,
  },
  {
    id: 2,
    icon: "💧",
    title: "Saluran mam...",
    date: "10 Mei",
    location: "Tebet",
    status: "Ditugaskan",
    progress: 20,
  },
  {
    id: 3,
    icon: "💡",
    title: "Lampu mati Sisin...",
    date: "5 Mei",
    location: "Jaksel",
    status: "Selesai",
    progress: 100,
  },
];

const trending = [
  { rank: 1, title: "Jalan berlubang SDN 04", location: "Kebayoran Baru", votes: 42 },
  { rank: 2, title: "Sampah liar Jl. Wahid H...", location: "Menteng", votes: 38 },
  { rank: 3, title: "Saluran mampet RT 03 T...", location: "Tebet", votes: 28 },
];

const statusStyle = {
  Diproses: "bg-orange-500 text-white",
  Ditugaskan: "border border-green-400 text-green-400",
  Selesai: "text-green-400",
};

export default function RightBar() {
  return (
    <div className="w-70 flex flex-col gap-3 bg-[#111] p-3 min-h-screen">
      <div className="bg-[#1a1a1a] rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-sm">Laporan saya</span>
          <span className="text-gray-500 text-xs cursor-pointer">Lihat semua</span>
        </div>

        <div className="flex flex-col gap-4">
          {reports.map((r) => (
            <div key={r.id} className="flex gap-3 items-start">
              <div className="w-9 h-9 bg-[#2a2a2a] rounded-xl flex items-center justify-center text-base shrink-0">
                {r.icon}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-gray-200 text-xs font-semibold">{r.title}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <span className="text-gray-500 text-[11px]">{r.date} · {r.location}</span>
                <div className="h-[3px] bg-[#2d2d2d] rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-green-400 rounded-full"
                    style={{ width: `${r.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl p-4 flex flex-col gap-3">
        <span className="text-white font-bold text-sm">Trending minggu ini</span>

        <div className="flex flex-col gap-4">
          {trending.map((t) => (
            <div key={t.rank} className="flex items-center gap-3">
              <span className="text-gray-500 font-bold text-sm w-3 shrink-0">{t.rank}</span>
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-gray-200 text-xs font-semibold">{t.title}</span>
                <span className="text-gray-500 text-[11px]">{t.location}</span>
              </div>
              <div className="flex items-center gap-1 text-green-400 font-semibold text-xs">
                <span className="text-[10px]">↑</span>
                <span>{t.votes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-white font-bold text-sm">Peta laporan</span>
          <span className="text-gray-500 text-xs cursor-pointer">Buka penuh</span>
        </div>

        <div className="bg-[#2a2a2a] rounded-xl h-24 flex flex-col items-center justify-center gap-1.5 cursor-pointer">
          <span className="text-2xl opacity-50">🗺️</span>
          <span className="text-gray-500 text-xs">Lihat peta interaktif</span>
        </div>

        <span className="text-gray-500 text-xs text-center">24 laporan aktif di sekitar kamu</span>
      </div>
    </div>
  );
}