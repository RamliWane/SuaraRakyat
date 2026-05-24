"use client";

import BlurText from "./components/client/BlurText";
import CardNav from "./components/client/Navbar";
import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: "ti-message-report",
    title: "Laporan Cepat & Mudah",
    desc: "Laporin masalah di sekitar lo dalam hitungan menit. Gak perlu birokrasi ribet, langsung dilihat publik dan bisa direspons instansi terkait.",
    detail: "Formulir simpel, foto bisa langsung dari HP, dan lokasi auto-detect.",
    accent: true,
    tag: "Terpopuler",
  },
  {
    icon: "ti-map-pin",
    title: "Berbasis Lokasi Presisi",
    desc: "Laporan otomatis ter-tag ke wilayah RT, RW, kelurahan, hingga kecamatan supaya langsung diteruskan ke pejabat yang berwenang.",
    detail: "GPS + peta interaktif. Lo bisa drag pin kalau sinyal ga akurat.",
  },
  {
    icon: "ti-trending-up",
    title: "Pantau Progres Nyata",
    desc: "Setiap laporan punya timeline status yang transparan — dari masuk, diverifikasi, diproses, sampai selesai ditangani.",
    detail: "Timeline update real-time. Lo bakal tau persis posisi laporan lo.",
  },
  {
    icon: "ti-users-group",
    title: "Dukung Sesama Warga",
    desc: "Upvote laporan orang lain yang lo rasain juga. Makin banyak dukungan, makin tinggi prioritasnya di mata instansi.",
    detail: "Sistem upvote transparan. Bisa komentar dan tambah bukti foto juga.",
  },
  {
    icon: "ti-bell-ringing",
    title: "Notifikasi Real-time",
    desc: "Dapat notif push atau email tiap ada update: laporan diterima, sedang diproses, ada respon resmi, atau sudah selesai ditangani.",
    detail: "Pilih channel notif sesuai preferensi lo. Ga mau spam? Bisa atur frekuensinya.",
  },
  {
    icon: "ti-shield-check",
    title: "Aman & Terlindungi",
    desc: "Data lo dienkripsi end-to-end. Identitas lo terlindungi kalau pilih anonim. Kami ga jual data ke siapapun, ever.",
    detail: "Comply dengan UU PDP Indonesia. Audit keamanan rutin tiap kuartal.",
  },
];

const steps = [
  {
    num: "1",
    title: "Daftar Akun",
    desc: "Buat akun gratis pakai email atau nomor HP. Verifikasi OTP, selesai. Cuma 2 menit, serius.",
    icon: "ti-user-plus",
    active: true,
  },
  {
    num: "2",
    title: "Buat Laporan",
    desc: "Tulis deskripsi masalah, tambahin foto sebagai bukti, lalu tandain lokasi di peta. Sistemnya bakal auto-kategoriin laporan lo.",
    icon: "ti-edit",
  },
  {
    num: "3",
    title: "Raih Dukungan",
    desc: "Share ke grup RT, medsos, atau forum warga. Semakin banyak upvote, laporan lo semakin naik ke prioritas antrian instansi.",
    icon: "ti-share",
  },
  {
    num: "4",
    title: "Lihat Hasilnya",
    desc: "Pantau progres secara real-time. Kalau instansi lambat, sistem otomatis eskalasi ke level yang lebih tinggi.",
    icon: "ti-circle-check",
  },
];

const stats = [
  { num: "48.2K", label: "Laporan Masuk", sub: "sejak 2023", icon: "ti-file-description" },
  { num: "73%", label: "Ditindaklanjuti", sub: "dalam 30 hari", icon: "ti-trending-up" },
  { num: "312", label: "Kota & Kabupaten", sub: "dari 514 total", icon: "ti-map" },
  { num: "4.8★", label: "Rating Pengguna", sub: "dari 6.200+ ulasan", icon: "ti-star" },
];

const categories = [
  { icon: "ti-road", label: "Infrastruktur", count: "12.4K laporan", color: "bg-orange-50 text-orange-600 group-hover:bg-orange-500" },
  { icon: "ti-trash", label: "Sampah & Kebersihan", count: "8.1K laporan", color: "bg-green-50 text-green-600 group-hover:bg-green-500" },
  { icon: "ti-health-recognition", label: "Kesehatan", count: "5.9K laporan", color: "bg-red-50 text-red-600 group-hover:bg-red-500" },
  { icon: "ti-school", label: "Pendidikan", count: "4.3K laporan", color: "bg-blue-50 text-blue-600 group-hover:bg-blue-500" },
  { icon: "ti-bolt", label: "Listrik & Air", count: "6.7K laporan", color: "bg-yellow-50 text-yellow-600 group-hover:bg-yellow-500" },
  { icon: "ti-gavel", label: "Hukum & HAM", count: "3.2K laporan", color: "bg-purple-50 text-purple-600 group-hover:bg-purple-500" },
  { icon: "ti-pig-money", label: "Korupsi", count: "7.6K laporan", color: "bg-pink-50 text-pink-600 group-hover:bg-pink-500" },
  { icon: "ti-leaf", label: "Lingkungan", count: "5.1K laporan", color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500" },
  { icon: "ti-home", label: "Perumahan & Tata Kota", count: "4.8K laporan", color: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500" },
  { icon: "ti-bus", label: "Transportasi", count: "3.7K laporan", color: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500" },
];

const testimonials = [
  {
    stars: 5,
    text: "Jalan depan komplek gue rusak parah udah 3 tahun. Udah minta ke kelurahan berkali-kali, ga ada respons. Abis lapor di sini dan dapet 200+ upvote, 2 minggu langsung ada alat berat dateng. Beneran gak nyangka secepet itu.",
    initials: "BW",
    name: "Budi Wicaksono",
    role: "Warga Bekasi Utara",
    date: "Maret 2025",
    tag: "Infrastruktur",
    featured: true,
    avatarColor: "#047857",
  },
  {
    stars: 5,
    text: "Saya lapor soal pembuangan limbah pabrik ke sungai yang bikin warga sekitar sakit. Sebulan kemudian udah ada tim investigasi dari KLHK. Terima kasih, akhirnya suara saya didengar.",
    initials: "SR",
    name: "Siti Rahayu",
    role: "Warga Karawang",
    date: "Februari 2025",
    tag: "Lingkungan",
    avatarColor: "#059669",
  },
  {
    stars: 5,
    text: "Platform ini beda dari yang lain karena bisa pantau statusnya langsung. Minimal kita tau laporan kita kemana, bukan ilang begitu aja kayak laporan ke hotline pemerintah.",
    initials: "AP",
    name: "Ahmad Prasetyo",
    role: "Aktivis Warga Surabaya",
    date: "April 2025",
    tag: "Transparansi",
    avatarColor: "#374151",
  },
  {
    stars: 4,
    text: "Awalnya skeptis, tapi ternyata laporan saya soal lampu jalan mati di gang samping rumah beneran ditangani dalam 3 minggu. Yang bikin beda itu fitur follow-up otomatisnya.",
    initials: "DN",
    name: "Dewi Nuraini",
    role: "Ibu Rumah Tangga, Bandung",
    date: "Januari 2025",
    tag: "Infrastruktur",
    avatarColor: "#7c3aed",
  },
  {
    stars: 5,
    text: "Saya lapor soal pungli di sekolah anak saya. Prosesnya anonim, jadi saya ga takut. Alhamdulillah kasusnya udah ditindaklanjuti dinas pendidikan setempat.",
    initials: "RM",
    name: "Rizky Maulana",
    role: "Orang Tua Murid, Medan",
    date: "Maret 2025",
    tag: "Pendidikan",
    avatarColor: "#b45309",
  },
  {
    stars: 5,
    text: "Sebagai jurnalis warga, ini tool yang luar biasa buat nge-track isu lokal. Data laporan yang terbuka bikin saya bisa nulis dengan bukti konkret, bukan cuma katanya-katanya.",
    initials: "LH",
    name: "Linda Hartono",
    role: "Jurnalis Warga, Jakarta",
    date: "April 2025",
    tag: "Jurnalisme",
    avatarColor: "#0369a1",
  },
];

const recentReports = [
  { cat: "Infrastruktur", title: "Jalan berlubang Jl. Raya Bogor KM 24", loc: "Depok, Jawa Barat", votes: 342, status: "Diproses", statusColor: "text-blue-600 bg-blue-50", time: "2 jam lalu" },
  { cat: "Lingkungan", title: "Tumpukan sampah liar di pinggir kali Ciliwung", loc: "Condet, Jakarta Timur", votes: 218, status: "Terverifikasi", statusColor: "text-emerald-600 bg-emerald-50", time: "5 jam lalu" },
  { cat: "Korupsi", title: "Dugaan markup anggaran renovasi balai RT", loc: "Tangerang Selatan, Banten", votes: 487, status: "Eskalasi", statusColor: "text-red-600 bg-red-50", time: "1 hari lalu" },
  { cat: "Kesehatan", title: "Puskesmas tutup di jam operasional resmi", loc: "Ciamis, Jawa Barat", votes: 156, status: "Selesai", statusColor: "text-gray-600 bg-gray-100", time: "3 hari lalu" },
];

const faqs = [
  {
    q: "Apakah laporan saya dijamin ditindaklanjuti?",
    a: "Kami tidak bisa jamin 100%, karena keputusan akhir ada di tangan instansi terkait. Tapi dengan transparansi publik, tekanan sosial dari banyak upvote, dan sistem eskalasi otomatis kami — peluangnya jauh lebih besar dibanding laporan konvensional yang gampang hilang di meja birokrasi.",
  },
  {
    q: "Identitas saya aman kalau lapor hal sensitif?",
    a: "Sangat aman. Ada opsi laporan anonim yang menyembunyikan seluruh identitas lo dari publik maupun instansi penerima. Data lo dienkripsi end-to-end dan tidak pernah dijual ke pihak manapun. Kami juga tidak bekerja sama dengan pihak keamanan untuk membuka identitas pelapor tanpa proses hukum yang sah.",
  },
  {
    q: "Apakah ada biaya untuk menggunakan platform ini?",
    a: "Nol rupiah. Gratis selamanya untuk semua fitur utama. Kami percaya akses ke platform demokrasi digital harusnya bukan privilege orang yang punya duit. Operasional kami didanai oleh donasi sukarela dan grant dari lembaga non-profit.",
  },
  {
    q: "Bisa lapor dari kota manapun di Indonesia?",
    a: "Ya, platform ini mencakup seluruh 514 kabupaten/kota di Indonesia. Laporan otomatis diarahkan ke pejabat daerah yang relevan berdasarkan koordinat GPS dan kategori laporan. Untuk daerah yang belum memiliki mitra instansi, laporan tetap dipublikasikan secara terbuka.",
  },
  {
    q: "Berapa lama biasanya laporan ditangani?",
    a: "Rata-rata laporan yang mendapat cukup upvote ditangani dalam 14–30 hari kerja. Laporan darurat (seperti bencana atau kejahatan) memiliki jalur prioritas dan biasanya direspons dalam 24–48 jam. Kecepatan juga tergantung dari kapasitas dan keseriusan instansi di daerah masing-masing.",
  },
  {
    q: "Bagaimana cara sistem eskalasi bekerja?",
    a: "Jika laporan tidak mendapat respons dari instansi tingkat kelurahan dalam 7 hari, sistem otomatis mengeskalasi ke kecamatan. Jika 14 hari masih tidak ada respons, eskalasi ke dinas terkait di tingkat kota/kabupaten. Proses ini terus berjalan hingga level provinsi jika diperlukan.",
  },
];

const partners = [
  "KPK", "KLHK", "Ombudsman RI", "ICW", "YLKI", "Walhi", "LBH Jakarta", "Transparency Intl"
];

const footerLinks = [
  { heading: "Platform", links: ["Cara Kerja", "Kategori Laporan", "Peta Laporan", "Statistik Nasional", "API Publik"] },
  { heading: "Komunitas", links: ["Forum Warga", "Blog & Artikel", "Relawan", "Partner NGO", "Program Daerah"] },
  { heading: "Lainnya", links: ["Tentang Kami", "Kontak", "Kebijakan Privasi", "Syarat & Ketentuan", "Laporan Keuangan"] },
];

function SectionBadge({ icon, children, dark = false }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium uppercase tracking-widest mb-5
      ${dark ? "bg-white/10 border border-white/20 text-emerald-300" : "bg-emerald-50 border border-emerald-200 text-emerald-700"}`}>
      <i className={`ti ${icon} text-sm`} aria-hidden="true" />
      {children}
    </span>
  );
}

function FaqRow({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-5 text-left text-[15px] font-medium text-gray-900 bg-transparent border-0 cursor-pointer gap-4"
        onClick={() => setOpen(p => !p)} aria-expanded={open}>
        {item.q}
        <i className={`ti ti-chevron-down text-lg text-emerald-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-56" : "max-h-0"}`}>
        <p className="text-sm text-gray-500 leading-relaxed pb-6 pr-8">{item.a}</p>
      </div>
    </div>
  );
}

export default function Home() {

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  const items = [
    {
      label: "About",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <div className="no-scrollbar">
      <main style={{ position: "relative", minHeight: "100vh" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/dpr.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 15,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.92) 100%)",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <CardNav
            logoAlt="SuaraRakyat"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
            theme="light"
          />

          <div className="flex flex-col justify-center items-center min-h-screen px-6 pb-20">
            <section className="text-center flex flex-col items-center max-w-3xl">

              <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium uppercase tracking-widest mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700">
                <i className="ti ti-speakerphone text-sm" aria-hidden="true" />
                Platform Aspirasi Warga Indonesia
              </span>

              <BlurText
                text="Suaramu Bisa Ubah Indonesia"
                delay={200}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 leading-tight mb-5"
              />

              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl mb-10">
                Wadah aspirasi warga untuk melaporkan permasalahan lingkungan dan sosial secara terbuka dan transparan.{" "}
                <span className="text-emerald-700 font-semibold">Bukan omong doang.</span>
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                <button
                  type="button"
                  className="bg-emerald-700 text-white border-0 rounded-xl px-8 py-4 text-sm font-bold flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-emerald-800 hover:-translate-y-0.5 shadow-lg shadow-emerald-200"
                >
                  <i className="ti ti-edit text-base" aria-hidden="true" />
                  Buat Laporan Sekarang
                </button>
                <button
                  type="button"
                  className="bg-white text-gray-700 border border-gray-200 rounded-xl px-8 py-4 text-sm font-medium flex items-center gap-2 cursor-pointer transition-all duration-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 shadow-sm"
                >
                  <i className="ti ti-eye text-base" aria-hidden="true" />
                  Lihat Laporan Terbaru
                </button>
              </div>

              <div className="flex flex-wrap gap-5 justify-center">
                {[
                  { icon: "ti-shield-check", label: "Identitas Terlindungi" },
                  { icon: "ti-lock", label: "Data Terenkripsi" },
                  { icon: "ti-heart", label: "Gratis Selamanya" },
                  { icon: "ti-users", label: "48.200+ Warga Aktif" },
                ].map((item) => (
                  <span key={item.label} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <i className={`ti ${item.icon} text-emerald-500 text-sm`} aria-hidden="true" />
                    {item.label}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <div className="bg-emerald-600 py-3 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max">
          {[...Array(3)].flatMap(() => [
            "🚧 48.200+ laporan masuk",
            "✅ 35.000+ sudah ditindaklanjuti",
            "📍 312 kota & kabupaten terjangkau",
            "🔥 Laporan terbaru: Banjir di Cawang, Jakarta Timur",
            "⚡ Eskalasi otomatis jika instansi tidak merespons",
            "🛡️ Identitas pelapor 100% terlindungi",
          ]).map((t, i) => (
            <span key={i} className="text-white text-sm font-medium">{t}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }`}</style>
      </div>

      <section className="bg-white py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <SectionBadge icon="ti-sparkles">Fitur Unggulan</SectionBadge>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 leading-tight mb-5">
              Semua yang lo butuhin<br />ada di satu tempat
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
              Dirancang buat warga biasa yang capek diam — bukan buat orang yang udah punya koneksi ke pejabat. Platform yang berpihak ke lo, bukan ke birokrasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title}
                className={`relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4
                  ${f.accent ? "bg-emerald-800 border-emerald-700 hover:shadow-[0_12px_40px_rgba(6,95,70,0.3)]"
                    : "bg-white border-gray-200 hover:border-emerald-200 hover:shadow-[0_8px_40px_rgba(6,95,70,0.08)]"}`}>
                {f.tag && (
                  <span className={`absolute top-5 right-5 text-xs font-semibold rounded-full px-2.5 py-1
                    ${f.accent ? "bg-white/15 text-white" : "bg-emerald-100 text-emerald-700"}`}>{f.tag}</span>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0
                  ${f.accent ? "bg-white/10 text-emerald-200" : "bg-emerald-50 text-emerald-600"}`}>
                  <i className={`ti ${f.icon}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className={`font-serif text-xl font-normal mb-2 ${f.accent ? "text-white" : "text-gray-900"}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed mb-3 ${f.accent ? "text-emerald-200" : "text-gray-500"}`}>{f.desc}</p>
                  <p className={`text-xs leading-relaxed border-t pt-3 ${f.accent ? "text-emerald-300 border-white/10" : "text-gray-400 border-gray-100"}`}>
                    <i className="ti ti-info-circle mr-1" aria-hidden="true" />{f.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-28 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <SectionBadge icon="ti-route">Cara Kerja</SectionBadge>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 leading-tight mb-5">
              Dari keluh kesah<br />jadi perubahan nyata
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-lg">
              Prosesnya dirancang sesederhana mungkin. Lo gak perlu ngerti hukum atau punya koneksi. Cukup internet dan keberanian buat ngomong.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px border-t-2 border-dashed border-emerald-300" />
            {steps.map((s, i) => (
              <div key={s.num} className="flex flex-col items-start bg-white rounded-2xl border border-gray-200 p-6 relative z-10 hover:border-emerald-200 hover:shadow-sm transition-all">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-2xl mb-5 border-2 flex-shrink-0
                  ${s.active ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white border-emerald-400 text-emerald-600"}`}>
                  {s.num}
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base mb-3
                  ${s.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                  <i className={`ti ${s.icon}`} aria-hidden="true" />
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">{s.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0">
              <i className="ti ti-clock text-lg" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-emerald-900 mb-1">Sistem Eskalasi Otomatis</h4>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Kalau instansi tidak merespons dalam 7 hari, laporan lo otomatis naik ke level yang lebih tinggi — dari kelurahan ke kecamatan, lalu ke dinas kota, hingga provinsi. Tanpa lo harus ngapa-ngapain lagi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-800 py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white mb-3">Angka yang bicara sendiri</h2>
            <p className="text-emerald-300 text-base">Data real, bukan dikarang-karang buat pemanis landing page.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center bg-white/5 border border-white/10 rounded-2xl p-7">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-emerald-200 text-xl mb-4">
                  <i className={`ti ${s.icon}`} aria-hidden="true" />
                </div>
                <span className="font-serif text-4xl md:text-5xl font-normal text-emerald-200 leading-none mb-2">{s.num}</span>
                <span className="text-sm font-medium text-white mb-1">{s.label}</span>
                <span className="text-xs text-emerald-400">{s.sub}</span>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-white/10 pt-10">
            <p className="text-center text-xs text-emerald-400 uppercase tracking-widest mb-6">Sudah bekerja sama dengan</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {partners.map(p => (
                <span key={p} className="bg-white/8 border border-white/10 rounded-full px-4 py-2 text-sm text-emerald-300 font-medium">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionBadge icon="ti-live-view">Live Feed</SectionBadge>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 leading-tight">
                Laporan terbaru<br />dari seluruh Indonesia
              </h2>
            </div>
            <button type="button" className="flex items-center gap-2 text-emerald-600 font-medium text-sm border border-emerald-200 rounded-xl px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer self-start md:self-auto flex-shrink-0">
              Lihat semua laporan <i className="ti ti-arrow-right text-base" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {recentReports.map((r, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-emerald-200 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">{r.cat}</span>
                    <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${r.statusColor}`}>{r.status}</span>
                    <span className="text-xs text-gray-400">{r.time}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">{r.title}</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <i className="ti ti-map-pin text-xs" aria-hidden="true" />{r.loc}
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                    <i className="ti ti-arrow-up text-base" aria-hidden="true" />{r.votes.toLocaleString()}
                  </div>
                  <i className="ti ti-chevron-right text-gray-300 text-lg" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-14">
            <SectionBadge icon="ti-layout-grid">Kategori</SectionBadge>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 leading-tight mb-5">
              Laporin apa aja,<br />dari mana aja
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-lg">
              Dari jalan berlubang sampe dugaan korupsi anggaran, semua ada tempat di sini. Laporan lo dikategoriin otomatis, diteruskan ke instansi yang berwenang.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((c) => (
              <div key={c.label}
                className="group bg-white border border-gray-200 rounded-2xl p-5 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50 hover:-translate-y-0.5 hover:shadow-sm">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200 group-hover:text-white ${c.color}`}>
                  <i className={`ti ${c.icon}`} aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center leading-tight">{c.label}</span>
                <span className="text-xs text-gray-400">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-28 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <SectionBadge icon="ti-quote">Cerita Nyata</SectionBadge>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 leading-tight mb-5">
              Warga udah ngerasain bedanya
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xl">
              Bukan testimoni palsu buat pemanis. Mereka beneran ada, laporannya beneran diproses, dan perubahannya beneran terjadi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name}
                className={`rounded-2xl p-7 border flex flex-col gap-5 ${t.featured ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={`ti ti-star-filled text-sm ${i < t.stars ? "text-emerald-500" : "text-gray-200"}`} aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-white border border-gray-200 rounded-full px-2.5 py-0.5">{t.tag}</span>
                </div>
                <p className="text-[15px] text-gray-700 leading-relaxed italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-200/60">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: t.avatarColor }}>
                    {t.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role} · {t.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-6 md:px-16">
        <div className="max-w-4xl mx-auto bg-emerald-900 rounded-3xl px-8 md:px-16 py-20 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-400/8 pointer-events-none" />
          <div className="absolute -bottom-24 -left-12 w-60 h-60 rounded-full bg-emerald-400/5 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

          <SectionBadge icon="ti-check" dark>Gratis selamanya</SectionBadge>
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-white leading-tight mb-5 relative z-10">
            Suaramu nyata,<br /><em className="text-emerald-300 not-italic">jadiin perubahan nyata.</em>
          </h2>
          <p className="text-emerald-300 text-base leading-relaxed max-w-md mb-10 relative z-10">
            Ribuan warga udah buktiin ini bukan sekadar aplikasi omong kosong. Tiap laporan yang masuk adalah satu langkah kecil buat Indonesia yang lebih baik. Giliran lo ikut berkontribusi.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative z-10 mb-8">
            <button type="button"
              className="bg-white text-emerald-800 border-0 rounded-xl px-8 py-4 text-sm font-bold flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-emerald-100 hover:-translate-y-0.5">
              <i className="ti ti-user-plus text-base" aria-hidden="true" />
              Daftar Sekarang — Gratis
            </button>
            <button type="button"
              className="bg-white/10 text-white border border-white/20 rounded-xl px-8 py-4 text-sm font-medium flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-white/15">
              <i className="ti ti-eye text-base" aria-hidden="true" />
              Lihat Laporan Terbaru
            </button>
          </div>
          <div className="flex flex-wrap gap-6 justify-center relative z-10">
            {["Tanpa iklan", "Data aman & terenkripsi", "Gratis selamanya", "Open source"].map(item => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-emerald-400">
                <i className="ti ti-circle-check text-sm" aria-hidden="true" />{item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-10">
            <SectionBadge icon="ti-help-circle">FAQ</SectionBadge>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-gray-900 leading-tight mb-5">
              Yang sering<br />ditanya orang
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Kalau pertanyaan lo ga ada di sini, langsung aja kontak tim kami. Kami bales dalam 1×24 jam kerja.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-emerald-600 font-medium text-sm border border-emerald-200 rounded-xl px-5 py-3 bg-emerald-50 hover:bg-emerald-100 transition-colors">
              <i className="ti ti-mail text-base" aria-hidden="true" />
              Hubungi Tim Kami
            </a>
          </div>
          <div>
            {faqs.map(item => <FaqRow key={item.q} item={item} />)}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 pt-20 pb-8 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-14 border-b border-white/10">
            <div className="col-span-2 flex flex-col gap-5">
              <span className="font-serif text-2xl text-white">SuaraRakyat</span>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[240px]">
                Wadah aspirasi warga Indonesia. Transparan, terbuka, dan berdampak nyata. Karena diam bukan solusi.
              </p>
              <div className="flex gap-2">
                {["ti-brand-twitter", "ti-brand-instagram", "ti-brand-github", "ti-brand-youtube"].map(ic => (
                  <button key={ic} aria-label={ic.replace("ti-brand-", "")}
                    className="w-9 h-9 rounded-lg bg-white/7 border-0 flex items-center justify-center text-base text-gray-400 cursor-pointer transition-all duration-200 hover:bg-emerald-700 hover:text-white">
                    <i className={`ti ${ic}`} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className="bg-emerald-900/50 border border-emerald-800 rounded-xl p-4">
                <p className="text-xs text-emerald-400 font-medium mb-2">Status Platform</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  <span className="text-xs text-emerald-300">Semua sistem berjalan normal</span>
                </div>
              </div>
            </div>
            {footerLinks.map(col => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h5 className="text-xs font-semibold text-white uppercase tracking-widest mb-1">{col.heading}</h5>
                {col.links.map(link => (
                  <a key={link} href="#"
                    className="text-sm text-gray-400 no-underline transition-colors duration-200 hover:text-emerald-400">{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8">
            <span className="text-xs text-gray-500">© 2025 SuaraRakyat. Dibuat dengan keberanian warga Indonesia.</span>
            <div className="flex gap-5">
              {["Privasi", "Ketentuan", "Aksesibilitas", "Sitemap"].map(l => (
                <a key={l} href="#" className="text-xs text-gray-500 no-underline hover:text-emerald-400 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
