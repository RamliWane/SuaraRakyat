import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import FilterCategory from "../../components/client/FilterCategory";
import { getAllLaporanSaya } from "../../../lib/api/laporan";
import LaporanSaya from "../../components/client/LaporanSaya";
import { cookies } from "next/headers";

export default async function Submission() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value ?? "";

    let data = [];
    try {
        data = await getAllLaporanSaya();
    } catch (err) {
        console.error(err.message);
    }

    const pending  = data.filter(d => d.status === "pending").length;
    const diproses = data.filter(d => d.status === "diproses").length;
    const selesai  = data.filter(d => d.status === "selesai").length;
    const ditolak  = data.filter(d => d.status === "ditolak").length;

    return (
        <div className="h-screen flex flex-col overflow-hidden text-black bg-gray-50">
            {/* <NavbarHome /> */}
            <div className="flex flex-1 overflow-hidden">
                <SideBar className="flex-0" />

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    <div className="p-6 flex flex-col gap-5">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-[20px] font-bold text-gray-900">Laporan Saya</h1>
                                <p className="text-sm text-gray-400 mt-0.5">Total <span className="font-bold text-[#A2CB8B]">{data.length}</span> Laporan Yang Pernah Anda Buat</p>
                            </div>
                            <a
                                href="/client/bikinlaporan"
                                className="flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#A2CB8B] hover:bg-[#A2CB8B]/80 rounded-xl px-4 py-2.5 transition-colors"
                            >
                                <i className="ti ti-plus text-sm" />
                                Buat Laporan
                            </a>
                        </div>
                        <FilterCategory />

                        <LaporanSaya data={data} token={token} />
                    </div>
                </div>
            </div>
        </div>
    );
}