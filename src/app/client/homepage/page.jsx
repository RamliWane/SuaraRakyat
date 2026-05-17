"use client";

import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import RightBar from "../../components/client/RightBar";
import LaporanCard from "../../components/client/LaporanCard";
import FilterCategory from "../../components/client/FilterCategory";
import { useRouter } from "next/navigation";

export default function home() {

    const router = useRouter();

    // // Fetch data users dari API
    // const users = await fetch("http://localhost:5000/users", {
    //     method: "GET",
    //     cache: "no-store",
    // })
    //     .then(res => res.json())// Convert response jadi JSON
    //     .then(data => data.data);// Ambil property 'data' dari response

  const stats = [
    { label: "Total laporan Dibuat", value: "3", badge: "+12 hari ini", badgeColor: "bg-[#EAF3DE] text-[#27500A]", valueColor: "" },
    { label: "Diproses", value: "0", badge: "Sedang berjalan", badgeColor: "bg-[#E6F1FB] text-[#0C447C]", valueColor: "text-[#185FA5]" },
    { label: "Selesai", value: "3", badge: "90.6% resolusi", badgeColor: "bg-[#EAF3DE] text-[#27500A]", valueColor: "text-[#3B6D11]" },
    { label: "Like", value: "48", badge: "Disukai", badgeColor: "bg-[#FAEEDA] text-[#633806]", valueColor: "text-[#BA7517]" },
  ];

    return (
        <div className="h-screen flex flex-col overflow-hidden text-black">
            <NavbarHome />
            <div className="flex flex-1 overflow-hidden">
                <SideBar className=" flex-0" />

                <div className="main-grid overflow-y-auto overflow-x-hidden no-scrollbar animate-slide-up animate-delay-200 grid-rows-[auto_auto_auto]">
                    <header className="flex-1 [grid-area:header] min-w-0 p-0 sm:p-2 md:p-4 lg:p-4">
                        <div className="flex flex-col min-w-0 gap-3 p-3">
                            <div className="flex justify-between">
                                <section>
                                    <h1 className="text-xl font-medium">Selamat datang, User 👋</h1>
                                    <p className="text-sm text-gray-500">Ini ringkasan laporan dan aktivitas terbaru kamu.</p>
                                </section>
                                <button
                                onClick={() => router.push("/client/bikinlaporan")}
                                    className="px-3 bg-[#DC9B9B] text-[15px] rounded-md transition-colors whitespace-nowrap font-medium text-white"
                                >
                                   + Buat Laporan
                                </button>
                            </div>
                            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {stats.map((s) => (
                                <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
                                    <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                                    <p className={`text-2xl font-medium mb-2 ${s.valueColor}`}>{s.value}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.badgeColor}`}>{s.badge}</span>
                                </div>
                                ))}
                            </section>
                        </div>
                    </header>

                    <aside className="[grid-area:aside]">
                        <div className="hidden xl:block w-70 sticky top-0 h-screen overflow-y-auto no-scrollbar">
                            <RightBar />
                        </div>
                    </aside>

                    <main className="flex [grid-area:main] flex-col m-5">
                        <div className="flex flex-col gap-3 ">
                            <section className="flex items-start justify-between flex-wrap">
                                <div className="flex flex-col">
                                    <h1 className="text-[17px] font-medium">Laporan Para Warga</h1>
                                    <h1 className="text-[13px] font-medium">Laporan terbaru dari para warga</h1>
                                </div>
                                <FilterCategory />
                            </section>
                            <LaporanCard />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}