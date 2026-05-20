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


    return (
        <>
            <Toast />
            <div className="rounded-[10px] border border-[#1B1B1B] bg-[#141414] p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Informasi Laporan
                    </h2>

                    <p className="mt-1 text-sm text-[#8A8A8A]">
                        Lengkapi detail laporan dengan benar agar
                        mudah diproses oleh pihak terkait.
                    </p>
                </div>

                <form action={formAction} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Foto / Video Bukti
                        </label>

                        <div className="flex gap-3 overflow-x-auto">
                            <div className="flex h-28 min-w-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#2A2A2A] bg-[#101010] transition-all hover:border-[#DC9B9B]">
                                <svg
                                    className="mb-2 h-7 w-7 text-[#777]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.7}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>

                                <p className="text-xs text-[#8A8A8A]">
                                    Upload Bukti
                                </p>
                            </div>

                            <div className="h-28 min-w-[140px] overflow-hidden rounded-2xl border border-[#2A2A2A]">
                                <img
                                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="h-28 min-w-[140px] overflow-hidden rounded-2xl border border-[#2A2A2A]">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Judul Laporan
                            </label>

                            <input name="judul" type="text" placeholder="Masukkan judul laporan..." className="h-12 w-full rounded-xl border border-[#262626] bg-[#101010] px-4 text-sm text-white outline-none transition-all placeholder:text-[#666] focus:border-[#DC9B9B]" />
                        </div>

                        <input type="hidden" name="user_id" value="1" />

                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Lokasi Kejadian
                            </label>

                            <input name="lokasi" type="text" placeholder="Masukkan lokasi..." className="h-12 w-full rounded-xl border border-[#262626] bg-[#101010] px-4 text-sm text-white outline-none transition-all placeholder:text-[#666] focus:border-[#DC9B9B]" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Kategori
                            </label>

                            <select name="category_id" className="h-12 w-full rounded-xl border border-[#262626] bg-[#101010] px-4 text-sm text-white outline-none focus:border-[#DC9B9B]">
                                <option value="1">Infrastruktur</option>
                                <option value="2">Lingkungan</option>
                                <option value="3">Keamanan</option>
                                <option value="4">Pendidikan</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Tingkat Urgensi
                            </label>

                            <select name="urgensi" className="h-12 w-full rounded-xl border border-[#262626] bg-[#101010] px-4 text-sm text-white outline-none focus:border-[#DC9B9B]">
                                <option value="tinggi">Tinggi</option>
                                <option value="sedang">Sedang</option>
                                <option value="rendah">Rendah</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Preview Lokasi
                        </label>

                        <div className="overflow-hidden rounded-2xl border border-[#262626]">
                            <div className="flex h-56 items-center justify-center bg-[#0E0E0E]">
                                <div className="text-center">
                                    <svg
                                        className="mx-auto mb-3 h-10 w-10 text-[#DC9B9B]"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>

                                    <p className="text-sm text-[#8A8A8A]">
                                        Preview lokasi akan tampil di sini
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                            Deskripsi Laporan
                        </label>

                        <textarea 
                            name="deskripsi"
                            rows={5}
                            placeholder="Jelaskan detail permasalahan..."
                            className="w-full rounded-2xl border border-[#262626] bg-[#101010] p-4 text-sm text-white outline-none transition-all placeholder:text-[#666] focus:border-[#DC9B9B]"
                        />
                    </div>

                    <button
                            type="submit"
                            disabled={isPending}
                            className="flex h-12 w-full items-center justify-center rounded-xl bg-[#DC9B9B] text-sm font-medium text-white transition-all hover:bg-[#DC9B9B]/80 disabled:opacity-60"
                        >
                            {isPending ? "Mengirim..." : "Kirim Laporan"}
                        </button>
                </form>
            </div>
        </>
    )
}