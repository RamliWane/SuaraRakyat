"use client";
import BlurText from "./components/client/BlurText";
import CardNav from "./components/client/Navbar";

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
        <section className="text-center">
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
            className="bg-[#DC9B9B] text-white p-3 hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 items-center h-full font-medium cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-2"            >
            GetStarted
          </button>
            <button
            type="button"
            className=" bg-white text-black shadow-xl p-3 hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-10 items-center h-full font-medium hover:bg-black hover:text-white cursor-pointer transition-colors duration-300"
            >
            Aspirasi Masuk, Anggaran Di Korup
          </button>
          </div>  
        </section>
      </div>
  </div>
    </main>
  );
}
