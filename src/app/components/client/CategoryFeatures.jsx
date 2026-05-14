export default function Features() {
  const features = [
    {
      icon: "ti-shield-check",
      color: "rose",
      title: "Keamanan data",
      desc: "Data kamu dienkripsi dan dilindungi penuh, tanpa pihak ketiga yang bisa mengaksesnya.",
      badge: "Terverifikasi",
    },
    {
      icon: "ti-bolt",
      color: "earth",
      title: "Proses cepat",
      desc: "Sistem kami dioptimalkan agar setiap transaksi dan permintaan berjalan dalam hitungan detik.",
      badge: "Real-time",
    },
    {
      icon: "ti-users",
      color: "green",
      title: "Komunitas aktif",
      desc: "Bergabung bersama ribuan pengguna yang saling mendukung dan berbagi pengalaman.",
      badge: "10k+ anggota",
    },
    {
      icon: "ti-headset",
      color: "soft",
      title: "Dukungan 24/7",
      desc: "Tim kami siap membantu kapanpun kamu butuhkan, via chat, email, atau telepon.",
      badge: "Siap membantu",
    },
  ];

  const colorMap = {
    rose:  { wrap: "bg-[#FDF0F0] text-[#DC9B9B]", badge: "bg-[#FDF0F0] text-[#B07070]" },
    earth: { wrap: "bg-[#F5F0E8] text-[#9E8D6E]", badge: "bg-[#F5F0E8] text-[#7A6A52]" },
    green: { wrap: "bg-[#F0F8E6] text-[#6DC700]", badge: "bg-[#F0F8E6] text-[#4F9800]" },
    soft:  { wrap: "bg-[#EEF4FF] text-[#6B8FD4]", badge: "bg-[#EEF4FF] text-[#4A6DB5]" },
  };

  return (
    <section className="py-16 px-6 md:px-12">
      <h2 className="font-serif text-4xl font-normal text-gray-900 leading-tight mb-3">
        Dirancang untuk <span className="text-[#DC9B9B] italic">kemudahan</span>
        <br />& kepercayaan
      </h2>
      <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-10">
        Semua yang kamu butuhkan tersedia dalam satu platform cepat, aman, dan mudah digunakan.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-gray-100 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300 ease-out cursor-default"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-xl ${colorMap[f.color].wrap}`}>
              <i className={`ti ${f.icon}`} aria-hidden="true" />
            </div>
            <p className="font-medium text-gray-800 mb-2">{f.title}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            <span className={`inline-block text-xs px-3 py-1 rounded-full mt-4 font-medium ${colorMap[f.color].badge}`}>
              {f.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}