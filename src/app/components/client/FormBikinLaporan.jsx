"use client";

import { useActionState, useEffect } from "react";
import tambahLaporan from "../../../lib/tambahlaporan";
import Toast, { showToast } from "../../components/client/Toast";

export default function FormBikinLaporan() {
    const [state, formAction, isPending] = useActionState(tambahLaporan, null);

    useEffect(() => {
        if (!state) return;
        if (state.success) showToast("Laporan berhasil dikirim!", "success");
        else showToast(state.error || "Terjadi kesalahan.", "error");
    }, [state]);

    const inputCls = "h-11 w-full px-4 text-sm bg-white border border-gray-200 rounded-xl text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50";
    const selectCls = "h-11 w-full px-4 text-sm bg-white border border-gray-200 rounded-xl text-gray-800 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 appearance-none cursor-pointer";
    const labelCls = "mb-1.5 block text-[13px] font-medium text-gray-700";

    return (
        <>
            <Toast />
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <i className="ti ti-file-plus text-base text-[#A2CB8B]" aria-hidden="true" />
                        </div>
                        <div>
                            <h2 className="text-[15px] font-semibold text-gray-900">Informasi Laporan</h2>
                            <p className="text-[12px] text-gray-400 mt-0.5">
                                Lengkapi detail laporan agar mudah diproses pihak terkait.
                            </p>
                        </div>
                    </div>
                </div>

                <form action={formAction} className="p-6 flex flex-col gap-5">

                    <div>
                        <label className={labelCls}>
                            <i className="ti ti-photo mr-1.5 text-gray-400" aria-hidden="true" />
                            Foto / Video Bukti
                        </label>
                        <div className="flex gap-3 overflow-x-auto pb-1">

                            <label className="flex h-28 min-w-[130px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:border-emerald-300 hover:bg-emerald-50 flex-shrink-0">
                                <input type="file" className="hidden" accept="image/*,video/*" multiple />
                                <i className="ti ti-cloud-upload text-2xl text-gray-300 mb-1.5" aria-hidden="true" />
                                <p className="text-[11px] font-medium text-gray-400">Upload Bukti</p>
                                <p className="text-[10px] text-gray-300 mt-0.5">JPG, PNG, MP4</p>
                            </label>

                            {[
                                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop",
                                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
                            ].map((src, i) => (
                                <div key={i} className="relative h-28 min-w-[130px] overflow-hidden rounded-xl border border-gray-200 flex-shrink-0 group">
                                    <img src={src} className="h-full w-full object-cover" alt={`Bukti ${i + 1}`} />
                                    <button
                                        type="button"
                                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-0 cursor-pointer"
                                    >
                                        <i className="ti ti-x text-[11px] text-white" aria-hidden="true" />
                                    </button>
                                    <div className="absolute bottom-1.5 left-1.5 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded-md">
                                        Foto {i + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>
                                <i className="ti ti-heading mr-1.5 text-gray-400" aria-hidden="true" />
                                Judul Laporan
                            </label>
                            <input
                                name="judul"
                                type="text"
                                placeholder="Contoh: Jalan berlubang di Jl. Mawar"
                                className={inputCls}
                            />
                        </div>
                        <div>
                            <label className={labelCls}>
                                <i className="ti ti-map-pin mr-1.5 text-gray-400" aria-hidden="true" />
                                Lokasi Kejadian
                            </label>
                            <input
                                name="lokasi"
                                type="text"
                                placeholder="Contoh: Jl. Mawar No. 12, Depok"
                                className={inputCls}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>
                                <i className="ti ti-layout-grid mr-1.5 text-gray-400" aria-hidden="true" />
                                Kategori
                            </label>
                            <div className="relative">
                                <select name="category_id" className={selectCls}>
                                    <option value="1">Infrastruktur</option>
                                    <option value="2">Lingkungan</option>
                                    <option value="3">Keamanan</option>
                                    <option value="4">Pendidikan</option>
                                </select>
                                <i className="ti ti-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" aria-hidden="true" />
                            </div>
                        </div>
                        <div>
                            <label className={labelCls}>
                                <i className="ti ti-alert-triangle mr-1.5 text-gray-400" aria-hidden="true" />
                                Tingkat Urgensi
                            </label>
                            <div className="relative">
                                <select name="urgensi" className={selectCls}>
                                    <option value="tinggi">🔴 Tinggi — Butuh penanganan cepat</option>
                                    <option value="sedang">🟡 Sedang — Perlu perhatian</option>
                                    <option value="rendah">🟢 Rendah — Bisa ditangani bertahap</option>
                                </select>
                                <i className="ti ti-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" aria-hidden="true" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>
                            <i className="ti ti-map mr-1.5 text-gray-400" aria-hidden="true" />
                            Preview Lokasi
                        </label>
                        <div className="h-48 rounded-xl border border-gray-200 bg-emerald-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-emerald-100 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <i className="ti ti-map-pin text-xl text-emerald-600" aria-hidden="true" />
                            </div>
                            <p className="text-[13px] font-medium text-emerald-700">Klik untuk pilih lokasi</p>
                            <p className="text-[11px] text-emerald-500">atau isi lokasi di field di atas</p>
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>
                            <i className="ti ti-align-left mr-1.5 text-gray-400" aria-hidden="true" />
                            Deskripsi Laporan
                        </label>
                        <textarea
                            name="deskripsi"
                            rows={5}
                            placeholder="Jelaskan detail permasalahan: kapan terjadi, kondisi saat ini, dampak yang dirasakan warga..."
                            className="w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 resize-none"
                        />
                        <p className="text-[11px] text-gray-400 mt-1">
                            Minimal 50 karakter. Semakin detail, semakin cepat diproses.
                        </p>
                    </div>

                    <input type="hidden" name="user_id" value="1" />

                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex gap-3">
                        <i className="ti ti-info-circle text-[#A2CB8B] text-base flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-[11px] text-emerald-700 leading-relaxed">
                            Laporan yang dilengkapi foto dan deskripsi jelas memiliki peluang lebih tinggi untuk ditindaklanjuti dalam 7 hari kerja.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#A2CB8B] text-sm font-semibold text-white transition-all hover:bg-[#A2CB8B]/80 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed border-0 cursor-pointer shadow-sm shadow-emerald-100"
                    >
                        {isPending ? (
                            <>
                                <i className="ti ti-loader-2 animate-spin text-base" aria-hidden="true" />
                                Mengirim laporan...
                            </>
                        ) : (
                            <>
                                <i className="ti ti-send text-base" aria-hidden="true" />
                                Kirim Laporan
                            </>
                        )}
                    </button>

                </form>
            </div>
        </>
    );
}