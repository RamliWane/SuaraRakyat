import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import FilterCategory from "../../components/client/FilterCategory";
import { getAllLaporanSaya } from "../../../lib/api/laporan";
import LaporanSaya from "../../components/client/LaporanSaya";

export default async function Submission() {
    let data = [];
    try {
        data = await getAllLaporanSaya();
    } catch (err) {
        console.error(err.message);
    }
    return (
        <div className="h-screen flex flex-col overflow-hidden text-black">
            <NavbarHome />
            <div className="flex flex-1 overflow-hidden">
                <SideBar className=" flex-0" />

                <div className="overflow-y-auto overflow-x-hidden no-scrollbar animate-slide-up animate-delay-200">
                    <header className="flex-1 min-w-0 p-0 sm:p-2 md:p-4 lg:p-4">
                        <div className="flex flex-col min-w-0 gap-3 p-3">
                            <section>
                                <h1 className="text-xl font-bold">LAPORAN SAYA</h1>
                                <p className="text-sm text-gray-500">Ini ringkasan laporan dan aktivitas terbaru kamu.</p>
                            </section>
                                <FilterCategory />
                        </div>
                    </header>

                    <LaporanSaya data={data} />
                </div>
            </div>
        </div>
    )
}