import { cookies } from "next/headers";
import { getLaporanById } from "../../../../lib/api/laporan";
import { getFeedbackByReportId } from "../../../../lib/api/feedback";
import NavbarHome from "../../../components/client/NavbarHome";
import SideBar from "../../../components/client/SideBar";
import CommentRightBar from "../../../components/client/CommentRightBar";

export default async function DetailLaporanUser({ params }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value ?? "";
    const { id } = await params;

    let laporan = null;
    let feedback = [];

    try {
        laporan = await getLaporanById(id, token);
        feedback = await getFeedbackByReportId(id, token);
    } catch (err) {
        console.error(err.message);
    }

    const statusConfig = {
        pending:  { label: "Pending",  cls: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-500" },
        diproses: { label: "Diproses", cls: "bg-blue-50 text-blue-700 border-blue-200",          dot: "bg-blue-500" },
        selesai:  { label: "Selesai",  cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
        ditolak:  { label: "Ditolak",  cls: "bg-red-50 text-red-700 border-red-200",             dot: "bg-red-500" },
    };

    const statusCfg = statusConfig[laporan?.status?.toLowerCase()] ?? statusConfig.pending;

    const steps = [
        { label: "Laporan Masuk",  done: true },
        { label: "Diverifikasi",   done: laporan?.status !== "pending" },
        { label: "Diproses",       done: laporan?.status === "diproses" || laporan?.status === "selesai" },
        { label: "Selesai",        done: laporan?.status === "selesai" },
    ];

    return (
        <div className="h-screen flex flex-col overflow-hidden text-black bg-gray-50">
            {/* <NavbarHome /> */}
            <div className="flex flex-1 overflow-hidden">
                <SideBar className="flex-0" />

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    <div className="p-5 flex flex-col gap-3">
                        <a href="/client/submission" className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-600 transition-colors w-fit">
                            <i className="ti ti-arrow-left text-sm" />
                            Kembali
                        </a>

                        {!laporan ? (
                            <div className="bg-white border border-gray-200 rounded-2xl p-16 flex flex-col items-center justify-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                                    <i className="ti ti-alert-circle text-xl text-red-500" />
                                </div>
                                <p className="text-sm font-medium text-gray-800">Laporan tidak ditemukan</p>
                            </div>
                        ) : (
                            <div className="flex gap-2 items-start">
                                <div className="flex-1 min-w-0 flex flex-col gap-2">
                                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                                        <div className="relative h-80 bg-gray-100 flex items-center justify-center overflow-hidden">
                                            {laporan.image && laporan.image !== "no-image.jpg" ? (
                                                <img src={laporan.image} className="w-full h-80 object-cover" alt="foto" />
                                            ) : (
                                                <i className="ti ti-photo-off text-4xl text-gray-300" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-4 left-5 right-5">
                                                <h1 className="text-xl font-bold text-white leading-tight">{laporan.judul}</h1>
                                            </div>
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${statusCfg.cls}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                                                    {statusCfg.label}
                                                </span>
                                                {laporan.category_name && (
                                                    <span className="bg-black/50 text-white text-[11px] px-2.5 py-1 rounded-lg backdrop-blur-sm">
                                                        {laporan.category_name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Info grid */}
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100">
                                            {[
                                                { icon: "ti-map-pin",        label: "Lokasi",   value: laporan.lokasi },
                                                { icon: "ti-alert-triangle", label: "Urgensi",  value: laporan.urgensi },
                                                { icon: "ti-layout-grid",    label: "Kategori", value: laporan.category_name },
                                                { icon: "ti-calendar",       label: "Tanggal",  value: laporan.created_at ? new Date(laporan.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-" },
                                            ].map((item) => (
                                                <div key={item.label} className="bg-white px-4 py-3">
                                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                                        <i className={`ti ${item.icon} text-[11px]`} />
                                                        {item.label}
                                                    </p>
                                                    <p className="mt-1 text-[13px] font-semibold text-gray-900 capitalize">{item.value ?? "-"}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-2xl p-5">
                                        <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Deskripsi Laporan</h3>
                                        <p className="text-[13px] text-gray-600 leading-relaxed">{laporan.deskripsi}</p>
                                    </div>

                                    <div className="rounded-2xl border border-gray-200 bg-white p-5">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <h2 className="text-[14px] font-semibold text-gray-900">Dokumentasi Laporan</h2>
                                                <p className="mt-0.5 text-[12px] text-gray-400">Foto pendukung dari warga pelapor</p>
                                            </div>
                                            <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500">
                                                {laporan.image && laporan.image !== "no-image.jpg" ? "1 Foto" : "Belum ada foto"}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                            {laporan.image && laporan.image !== "no-image.jpg" && (
                                                <div className="group relative overflow-hidden rounded-xl border border-gray-100 cursor-pointer">
                                                    <img
                                                        src={laporan.image}
                                                        className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                                                        alt="Dokumentasi 1"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                                                        <i className="ti ti-zoom-in text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                                    </div>
                                                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded-md">
                                                        Foto 1
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Feedback */}
                                    <div className="bg-white border border-gray-200 rounded-2xl p-5">
                                        <h3 className="text-[13px] font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <i className="ti ti-message-circle text-emerald-500" />
                                            Pesan dari Admin
                                        </h3>
                                        {feedback.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-8 gap-2">
                                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                                                    <i className="ti ti-message-off text-gray-400 text-lg" />
                                                </div>
                                                <p className="text-[12px] text-gray-400">Belum ada pesan dari admin</p>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-3">
                                                {feedback.map((f) => (
                                                    <div key={f.id} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                                                            {f.username?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <p className="text-[12px] font-semibold text-emerald-800">
                                                                    {f.username} <span className="text-emerald-500 font-normal">· Admin</span>
                                                                </p>
                                                                <p className="text-[10px] text-emerald-400">
                                                                    {new Date(f.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                                                </p>
                                                            </div>
                                                            <p className="text-[13px] text-emerald-700 leading-relaxed">{f.message}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* KANAN — Komentar */}
                                <div className="w-[300px] shrink-0 sticky top-0">
                                    <CommentRightBar reportId={id} token={token} />
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}