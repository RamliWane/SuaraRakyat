import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C1A18] text-[#C9C4BB] px-8 pt-12 pb-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-8 pb-10 border-b border-white/8">
        
        {/* Brand */}
        <div>
          <p className="font-serif text-2xl text-white mb-3">
            Suara<span className="text-[#DC9B9B] italic">Rakyat</span>
          </p>
          <div className="w-8 h-0.5 bg-[#DC9B9B] rounded-full mb-4" />
          <p className="text-sm text-[#888580] leading-relaxed max-w-[220px] mb-6">
            Platform aspirasi masyarakat untuk mewujudkan pemerintahan yang transparan dan akuntabel.
          </p>
          <div className="flex gap-2">
            {[
              { icon: "ti-brand-instagram", label: "Instagram" },
              { icon: "ti-brand-x", label: "Twitter" },
              { icon: "ti-brand-facebook", label: "Facebook" },
              { icon: "ti-brand-youtube", label: "Youtube" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-[#888580] hover:border-[#DC9B9B] hover:text-[#DC9B9B] transition-colors duration-200"
              >
                <i className={`ti ${s.icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigasi */}
        <div>
          <p className="text-xs tracking-widest uppercase text-white font-medium mb-4">Navigasi</p>
          <ul className="flex flex-col gap-2.5">
            {["Beranda", "Tentang kami", "Aspirasi", "Berita", "Kontak"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-[#888580] hover:text-[#DC9B9B] transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Layanan */}
        <div>
          <p className="text-xs tracking-widest uppercase text-white font-medium mb-4">Layanan</p>
          <ul className="flex flex-col gap-2.5">
            {["Sampaikan aspirasi", "Lacak laporan", "Forum diskusi", "Data publik"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-[#888580] hover:text-[#DC9B9B] transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-xs tracking-widest uppercase text-white font-medium mb-4">Newsletter</p>
          <p className="text-sm text-[#888580] leading-relaxed mb-4">
            Dapatkan update terbaru langsung di inbox kamu.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email kamu"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-[#C9C4BB] placeholder-[#555250] outline-none focus:border-[#DC9B9B] transition-colors"
            />
            <button
              type="button"
              className="bg-[#DC9B9B] hover:bg-[#c98585] text-white text-sm font-medium px-4 rounded-lg transition-colors duration-200"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-3">
        <p className="text-xs text-[#555250]">
          © 2025 <span className="text-[#DC9B9B]">SuaraRakyat</span>. Semua hak dilindungi.
        </p>
        <div className="flex gap-6">
          {["Kebijakan privasi", "Syarat & ketentuan", "Bantuan"].map((item) => (
            <Link key={item} href="#" className="text-xs text-[#555250] hover:text-[#9E8D6E] transition-colors duration-200">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}