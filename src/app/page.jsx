"use client";
import { div } from "motion/react-client";
import BlurText from "./components/client/BlurText";
import CardNav from "./components/client/Navbar";
import CategoryFeatures from "./components/client/CategoryFeatures";
import Footer from "./components/client/Footer";

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
      <main
        style={{ position: "relative", minHeight: "100vh" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/dpr.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
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
          <div className="flex flex-col justify-center items-center h-screen">
            <section className="text-center flex flex-col p-3">
              <BlurText
                text="Laporin Semua Keluh Kesah Lo Disini!!"
                delay={200}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-4xl mb-3 font-bold"
              />
              <h1 className="text-[15px] font-bold mb-4">Wadah aspirasi warga untuk melaporkan permasalahan lingkungan dan sosial <br />secara terbuka, transparan, demi menciptakan perubahan yang nyata. Bukan Omong doang</h1>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  className="bg-[#DC9B9B] text-white p-3 border-0 rounded-xl px-4 items-center font-medium cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-2"            >
                  GetStarted
                </button>
                <button
                  type="button"
                  className=" bg-white text-black shadow-xl p-3 border-0 rounded-xl px-4 items-center font-medium hover:bg-black hover:text-white cursor-pointer transition-colors duration-300"
                >
                  Aspirasi Masuk, Anggaran Di Korup
                </button>
              </div>
            </section>

          </div>
        </div>
      </main>
<section className="flex justify-center flex-col py-20 px-6 md:px-12">
          <div className="flex flex-col">
          <div>
            <CategoryFeatures />
          </div>
        </div>
        <div className="mt-10">
          <div className="bg-[#1C1A18] rounded-2xl px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#DC9B9B]/15 border border-[#DC9B9B]/30 rounded-full px-3 py-1 text-xs text-[#DC9B9B] mb-5">
                <i className="ti ti-spark text-sm" aria-hidden="true" />
                Bergabung sekarang
              </div>
              <p className="font-serif text-3xl font-normal text-white leading-snug mb-3">
                Suaramu penting,<br />
                <em className="text-[#DC9B9B]">jangan diam saja.</em>
              </p>
              <p className="text-sm text-[#888580] leading-relaxed max-w-sm">
                Ribuan warga sudah menyampaikan keluhan mereka. Giliran kamu untuk ikut berkontribusi demi perubahan yang nyata.
              </p>
              <div className="flex flex-wrap gap-5 mt-5">
                {["Gratis selamanya", "Tanpa iklan", "Data aman"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#555250]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6DC700]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[180px]">
              <button
                type="button"
                className="bg-[#DC9B9B] hover:bg-[#c98585] text-white rounded-xl px-7 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
              >
                <i className="ti ti-user-plus text-base" aria-hidden="true" />
                Daftar sekarang
              </button>
              <button
                type="button"
                className="bg-transparent text-[#C9C4BB] border border-white/15 hover:border-white/35 hover:text-white rounded-xl px-7 py-3 text-sm flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <i className="ti ti-eye text-base" aria-hidden="true" />
                Lihat aspirasi
              </button>
            </div>

          </div>
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
