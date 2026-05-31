import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import RightBar from "../../components/client/RightBar";
import LaporanCard from "../../components/client/LaporanCard";
import FilterCategory from "../../components/client/FilterCategory";
import HomeFooter from "../../components/client/HomeFooter";
import ButtonBuatLaporan from "../../components/client/ButtonBuatLaporan";
import { getAllLaporan } from "../../../lib/api/laporan";
import { cookies } from "next/headers";

export default async function home() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value ?? "";

        let reporting = [];
        try {
            reporting = await getAllLaporan();
        } catch (err) {
            console.error(err.message);
        }

    const stats = [
        { label: "Total laporan Dibuat", value: "3", badge: "+12 hari ini", badgeColor: "bg-[#EAF3DE] text-[#27500A]" },
        { label: "Diproses", value: "0", badge: "Sedang berjalan", badgeColor: "bg-[#E6F1FB] text-[#0C447C]", valueColor: "text-[#185FA5]" },
        { label: "Selesai", value: "3", badge: "90.6% resolusi", badgeColor: "bg-[#EAF3DE] text-[#27500A]", valueColor: "text-[#3B6D11]" },
        { label: "Like", value: "48", badge: "Disukai", badgeColor: "bg-[#FAEEDA] text-[#633806]", valueColor: "text-[#BA7517]" },
    ];

    return (
        <div className="h-screen flex flex-col overflow-hidden text-black bg-white">
            <NavbarHome />
            <div className="flex flex-1 overflow-hidden">
                <SideBar className="flex-0" />

                <div className="main-grid overflow-y-auto overflow-x-hidden no-scrollbar animate-slide-up animate-delay-200 grid-rows-[auto_auto_auto] flex-1">
                    
                    <header className="flex-1 [grid-area:header] min-w-0 p-0 sm:p-2 md:p-4 lg:p-4">
                        <div className="flex flex-col min-w-0 gap-3 p-3">
                            <div className="flex justify-between">
                                <section>
                                    <h1 className="text-xl font-medium">Selamat datang, User 👋</h1>
                                    <p className="text-sm text-gray-500">Ini ringkasan laporan dan aktivitas terbaru kamu.</p>
                                </section>
                                <ButtonBuatLaporan />
                            </div>
                            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {stats.map((s) => (
                                    <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                        <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                                        <p className={`text-2xl font-medium mb-2 ${s.valueColor || ""}`}>{s.value}</p>
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
                        <div className="flex flex-col gap-3">
                            <section className="flex items-start justify-between flex-wrap gap-2">
                                <div className="flex flex-col">
                                    <h1 className="text-[17px] font-medium">Laporan Para Warga</h1>
                                    <h1 className="text-[13px] font-medium text-gray-400">Laporan terbaru dari para warga</h1>
                                </div>
                                <FilterCategory />
                            </section>
                            
                           <LaporanCard dataLaporan={reporting} token={token}/>
                        </div>
                    </main>
                    
                    <footer className="[grid-area:footer]">
                        <HomeFooter />
                    </footer>
                </div>
            </div>
        </div>
    );
}