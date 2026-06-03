"use client";

import { useActionState, useEffect, useState } from "react";
import tambahLaporan from "../../../lib/api/laporan";
import NotifBuatLaporan, { showToast } from "./NotifBuatLaporan";
import supabase from "../../../lib/supabase";
import dynamic from "next/dynamic";

const PilihLokasi = dynamic(() => import("./PilihLokasi"), { ssr: false });

export default function FormBikinLaporan() {
    const [state, formAction, isPending] = useActionState(tambahLaporan, null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [coords, setCoords] = useState(null);
    const [alamat, setAlamat] = useState("");

    useEffect(() => {
        if (!state) return;
        if (state.success) showToast("Laporan berhasil dikirim!", "success");
        else showToast(state.error || "Terjadi kesalahan.", "error");
    }, [state]);

    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setImagePreview(URL.createObjectURL(file));

        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
            .from("laporan-images")
            .upload(fileName, file);

        if (error) {
            showToast("Gagal upload gambar", "error");
            setUploading(false);
            return;
        }

        const { data: urlData } = supabase.storage
            .from("laporan-images")
            .getPublicUrl(fileName);

        setImageUrl(urlData.publicUrl);
        setUploading(false);
    }

    async function handleMapClick({ lat, lng }) {
        setCoords({ lat, lng });

        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { "Accept-Language": "id" } }
        );
        const data = await res.json();
        setAlamat(data.display_name ?? "");
    }

    const inputCls = "h-11 w-full px-4 text-sm bg-white border border-gray-200 rounded-xl text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50";
    const selectCls = "h-11 w-full px-4 text-sm bg-white border border-gray-200 rounded-xl text-gray-800 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 appearance-none cursor-pointer";
    const labelCls = "mb-1.5 block text-[13px] font-medium text-gray-700";

    return (
        <>
            <NotifBuatLaporan />
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                <div className="px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
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

                    {/* Foto Bukti */}
                    <div>
                        <label className={labelCls}>
                            <i className="ti ti-photo mr-1.5 text-gray-400" />
                            Foto Bukti
                        </label>
                        <div className="flex gap-3 overflow-x-auto pb-1">
                            <label className="flex h-38 min-w-50 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:border-emerald-300 hover:bg-emerald-50 shrink-0">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {uploading ? (
                                    <i className="ti ti-loader-2 animate-spin text-2xl text-emerald-400" />
                                ) : (
                                    <>
                                        <i className="ti ti-cloud-upload text-2xl text-gray-300 mb-1.5" />
                                        <p className="text-[11px] font-medium text-gray-400">Upload Foto</p>
                                        <p className="text-[10px] text-gray-300 mt-0.5">JPG, PNG</p>
                                    </>
                                )}
                            </label>

                            {imagePreview && (
                                <div className="relative h-38 min-w-50 overflow-hidden rounded-xl border border-gray-200 shrink-0 group">
                                    <img src={imagePreview} className="h-full w-full object-cover" alt="Preview" />
                                    <button
                                        type="button"
                                        onClick={() => { setImageUrl(null); setImagePreview(null); }}
                                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-0 cursor-pointer"
                                    >
                                        <i className="ti ti-x text-[11px] text-white" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <input type="hidden" name="image" value={imageUrl ?? "no-image.jpg"} />

                    {/* Judul */}
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

                    {/* Kategori + Urgensi */}
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

                    {/* Map + Lokasi */}
                    <div>
                        <label className={labelCls}>
                            <i className="ti ti-map mr-1.5 text-gray-400" aria-hidden="true" />
                            Pilih Lokasi di Peta
                        </label>
                        <div className="h-70 rounded-xl border border-gray-200 overflow-hidden mb-2">
                            <PilihLokasi coords={coords} onMapClick={handleMapClick} />
                        </div>
                        <input
                            name="lokasi"
                            type="text"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            placeholder="Klik peta untuk isi otomatis, atau ketik manual..."
                            className={inputCls}
                        />
                        <p className="text-[11px] text-gray-400 mt-1">
                            Klik pada peta untuk menentukan titik lokasi kejadian.
                        </p>
                    </div>

                    <input type="hidden" name="lat" value={coords?.lat ?? ""} />
                    <input type="hidden" name="lng" value={coords?.lng ?? ""} />

                    {/* Deskripsi */}
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

                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex gap-3">
                        <i className="ti ti-info-circle text-[#A2CB8B] text-base shrink-0 mt-0.5" aria-hidden="true" />
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