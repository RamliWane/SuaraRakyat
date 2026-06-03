import { cookies } from "next/headers";
import { getLaporanById } from "../../../../lib/api/laporan";
import ActionDetailLaporan from '../../../components/admin/ActionDetailLaporan';
import DetailLaporanPending from '../../../components/admin/DetailLaporanPending';
import SidebarAdmin from '../../../components/admin/SideBarAdmin';


export default async function DetailLaporanPendingPage({ params }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value ?? "";

    const { id } = await params;

    let data = null;
    let error = null;

    try {
        if (id) {
            data = await getLaporanById(id, token);
        } else {
            error = "ID tidak ditemukan";
        }
    } catch (err) {
        error = err.message;
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                <SidebarAdmin className="flex-0" />

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4">
                    <div className="flex items-start gap-5">

                        <div className="flex flex-1 flex-col gap-5">

                            <main>
                                {error ? (
                                    <div>{error}</div>
                                ) : (
                                    <DetailLaporanPending data={data} />
                                )}
                            </main>
                        </div>

                        <aside className="hidden xl:block w-65 sticky top-0 shrink-0">
                             {error ? error : (
                                <ActionDetailLaporan 
                                    reportId={id} 
                                    token={token} 
                                />
                            )}
                        </aside>

                    </div>
                </div>
            </div>
        </div>
    );
}