import SidebarAdmin from '../../components/admin/SideBarAdmin';
import NavbarHome from '../../components/client/NavbarHome';

export default async function DashboardAdmin() {
  const stats = [
    { label: "Total laporan", value: "1,284", badge: "+12 hari ini", badgeColor: "bg-[#EAF3DE] text-[#27500A]", valueColor: "" },
    { label: "Menunggu", value: "48", badge: "Perlu ditinjau", badgeColor: "bg-[#FAEEDA] text-[#633806]", valueColor: "text-[#BA7517]" },
    { label: "Diproses", value: "73", badge: "Sedang berjalan", badgeColor: "bg-[#E6F1FB] text-[#0C447C]", valueColor: "text-[#185FA5]" },
    { label: "Selesai", value: "1,163", badge: "90.6% resolusi", badgeColor: "bg-[#EAF3DE] text-[#27500A]", valueColor: "text-[#3B6D11]" },
  ];

  const laporanTerbaru = [
    { icon: "ti-road", iconBg: "bg-[#FAEEDA] text-[#BA7517]", title: "Jalan berlubang Jl. Sudirman", meta: "Budi S. · 10 menit lalu", status: "Pending", statusClass: "bg-[#FAEEDA] text-[#633806]" },
    { icon: "ti-trash", iconBg: "bg-[#FCEBEB] text-[#A32D2D]", title: "Tumpukan sampah RT 05", meta: "Siti R. · 1 jam lalu", status: "Diproses", statusClass: "bg-[#E6F1FB] text-[#0C447C]" },
    { icon: "ti-droplet", iconBg: "bg-[#E6F1FB] text-[#185FA5]", title: "Banjir di kawasan Perum Indah", meta: "Andi W. · 3 jam lalu", status: "Pending", statusClass: "bg-[#FAEEDA] text-[#633806]" },
    { icon: "ti-bulb", iconBg: "bg-[#EAF3DE] text-[#3B6D11]", title: "Lampu jalan mati Gg. Mawar", meta: "Rina K. · 5 jam lalu", status: "Selesai", statusClass: "bg-[#EAF3DE] text-[#27500A]" },
  ];

  const kategori = [
    { label: "Jalan rusak", count: 312, pct: 78, color: "bg-[#DC9B9B]" },
    { label: "Sampah", count: 241, pct: 60, color: "bg-[#9E8D6E]" },
    { label: "Banjir", count: 187, pct: 47, color: "bg-[#378ADD]" },
    { label: "Lampu jalan", count: 143, pct: 36, color: "bg-[#6DC700]" },
    { label: "Lainnya", count: 98, pct: 24, color: "bg-gray-400" },
  ];

  const aktivitas = [
    { dot: "bg-[#DC9B9B]", text: "Laporan #1284 diverifikasi admin", time: "5 menit lalu" },
    { dot: "bg-[#378ADD]", text: 'Status #1280 diubah ke "Diproses"', time: "22 menit lalu" },
    { dot: "bg-[#6DC700]", text: "Laporan #1275 ditandai selesai", time: "1 jam lalu" },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden text-black">
      <NavbarHome />
      <div className="flex flex-1 overflow-hidden">
        <SidebarAdmin />

        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 sm:p-6 space-y-6 bg-gray-50">

          <section>
            <h1 className="text-xl font-medium">Selamat datang, Admin</h1>
            <p className="text-sm text-gray-500">Jumat, 15 Mei 2026 — Berikut ringkasan laporan hari ini</p>
          </section>

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                <p className={`text-2xl font-medium mb-2 ${s.valueColor}`}>{s.value}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.badgeColor}`}>{s.badge}</span>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">Laporan terbaru</p>
                <span className="text-xs text-gray-400 cursor-pointer hover:text-[#DC9B9B] transition-colors">Lihat semua</span>
              </div>
              <div className="space-y-3">
                {laporanTerbaru.map((l) => (
                  <div key={l.title} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${l.iconBg}`}>
                      <i className={`ti ${l.icon} text-base`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{l.title}</p>
                      <p className="text-xs text-gray-400">{l.meta}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${l.statusClass}`}>{l.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Laporan per kategori</p>
                  <span className="text-xs text-gray-400">Bulan ini</span>
                </div>
                <div className="space-y-3">
                  {kategori.map((k) => (
                    <div key={k.label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{k.label}</span>
                        <span>{k.count}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full">
                        <div className={`h-1.5 rounded-full ${k.color}`} style={{ width: `${k.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <p className="text-sm font-medium mb-3">Aktivitas terbaru</p>
                <div className="space-y-3">
                  {aktivitas.map((a) => (
                    <div key={a.text} className="flex gap-3 items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`} />
                      <div>
                        <p className="text-xs">{a.text}</p>
                        <p className="text-xs text-gray-400">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}