import DetailLaporanPending from '../../components/admin/DetailLaporanPending';
import SidebarAdmin from '../../components/admin/SideBarAdmin';
import NavbarHome from '../../components/client/NavbarHome';
import PanduanBikinLaporan from '../../components/client/PanduanBikinLaporan';

export default async function detailLaporanPending() {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <NavbarHome />

            <div className="flex flex-1 overflow-hidden">
                <SidebarAdmin className="flex-0" />

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-5 animate-slide-up animate-delay-200">

                    <div className="flex items-start gap-5">
                        <div className="flex flex-1 flex-col gap-5">
                            <header>
                                <div className="flex flex-col gap-2">
                                    <section>
                                        <h1 className="text-xl font-bold text-black">
                                            BUAT LAPORAN BARU
                                        </h1>

                                        <p className="text-sm text-gray-400">
                                            Laporkan masalah di sekitar Anda
                                            untuk membantu lingkungan menjadi
                                            lebih baik
                                        </p>
                                    </section>
                                </div>
                            </header>
                            <main>
                                <DetailLaporanPending />
                            </main>
                        </div>
                        <aside className="hidden xl:block w-[270px] sticky top-0 shrink-0">
                            <PanduanBikinLaporan />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    )
}