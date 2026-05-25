import { cookies } from "next/headers";
import { getLaporanById } from "../../../lib/api/laporan";
import ActionDetailLaporan from '../../components/admin/ActionDetailLaporan';
import DetailLaporanPending from '../../components/admin/DetailLaporanPending';
import SidebarAdmin from '../../components/admin/SideBarAdmin';
import NavbarHome from '../../components/client/NavbarHome';

export default async function DetailLaporanPendingPage({ searchParams }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value ?? "";

    const { id } = await searchParams;

    let data = null;
    let error = null;

    try {
        data = await getLaporanById(id, token);
    } catch (err) {
        error = err.message;
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <NavbarHome />

            <div className="flex flex-1 overflow-hidden">
                <SidebarAdmin className="flex-0" />

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4">
                    <div className="flex items-start gap-5">
                        <div className="flex flex-1 flex-col gap-5">
                            <header>
                                <div className="flex flex-col gap-2">
                                    <section>
                                        <h1 className="text-xl font-bold text-black">
                                            DETAIL LAPORAN ADMIN
                                        </h1>
                                        <p className="text-sm text-gray-400">
                                            Laporkan masalah di sekitar Anda untuk membantu lingkungan menjadi lebih baik
                                        </p>
                                    </section>
                                </div>
                            </header>
                            <main>
                                {error ? (
                                    <div className="bg-white rounded-2xl border border-gray-200 p-16 flex flex-col items-center justify-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                                            <i className="ti ti-alert-circle text-xl text-red-500" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-800">Laporan tidak ditemukan</p>
                                        <p className="text-xs text-gray-400">{error}</p>
                                    </div>
                                ) : (
                                    <DetailLaporanPending data={data} />
                                )}
                            </main>
                        </div>
                        <aside className="hidden xl:block w-[280px] sticky top-0 shrink-0">
                            <ActionDetailLaporan data={data} token={token} />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}