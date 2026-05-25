export default function DetailLaporanPending() {
    return (
        <div className="flex flex-col gap-3">

            {/* HEADER */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                {/* Image */}
                <div className="relative h-[260px] w-full overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop"
                        className="h-full w-full object-cover"
                        alt="Foto laporan"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute left-5 top-5 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Pending
                        </span>
                        <span className="rounded-lg border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                            Jalan Rusak
                        </span>
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-5 left-5 right-5">
                        <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white">
                            Jalan rusak di daerah TB Simatupang menyebabkan kemacetan panjang
                        </h1>
                        <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/70">
                            Warga melaporkan kondisi jalan yang berlubang cukup parah dan membahayakan pengendara motor terutama saat malam hari.
                        </p>
                    </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border-t border-gray-100">
                    {[
                        { icon: "ti-user", label: "Dilaporkan Oleh", value: "Ramli Silawane" },
                        { icon: "ti-calendar", label: "Tanggal", value: "18 Mei 2026" },
                        { icon: "ti-building", label: "Kecamatan", value: "Harjamukti" },
                        { icon: "ti-map-pin", label: "Lokasi", value: "Jakarta Timur" },
                    ].map((item) => (
                        <div key={item.label} className="bg-white px-5 py-4">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                <i className={`ti ${item.icon} text-[11px]`} aria-hidden="true" />
                                {item.label}
                            </p>
                            <p className="mt-1.5 text-[13px] font-semibold text-gray-900">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* GALERI */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-[14px] font-semibold text-gray-900">Dokumentasi Laporan</h2>
                        <p className="mt-0.5 text-[12px] text-gray-400">Foto pendukung dari warga pelapor</p>
                    </div>
                    <span className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500">
                        4 Foto
                    </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop",
                    ].map((src, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-xl border border-gray-100 cursor-pointer">
                            <img
                                src={src}
                                className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                                alt={`Dokumentasi ${i + 1}`}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                                <i className="ti ti-zoom-in text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded-md">
                                Foto {i + 1}
                            </div>
                        </div>
                    ))}

                    {/* Tambah foto */}
                    <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 transition-all hover:border-emerald-300 hover:bg-emerald-50">
                        <input type="file" className="hidden" accept="image/*" multiple />
                        <i className="ti ti-cloud-upload text-2xl text-gray-300 mb-1.5" aria-hidden="true" />
                        <p className="text-[11px] font-medium text-gray-400">Tambah Foto</p>
                        <p className="text-[10px] text-gray-300 mt-0.5">JPG, PNG</p>
                    </label>
                </div>
            </div>

            {/* MAP */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="mb-4">
                    <h2 className="text-[14px] font-semibold text-gray-900">Lokasi Laporan</h2>
                    <p className="mt-0.5 text-[12px] text-gray-400">Titik lokasi laporan dari warga</p>
                </div>

                {/* Map placeholder */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-emerald-50 h-[280px] flex flex-col items-center justify-center gap-3 relative">
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: "linear-gradient(to right, #d1fae5 1px, transparent 1px), linear-gradient(to bottom, #d1fae5 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                        }}
                    />
                    {/* Pulse */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="relative">
                            <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
                            <div className="relative w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                                <i className="ti ti-map-pin text-xl text-white" aria-hidden="true" />
                            </div>
                        </div>
                        <p className="text-[12px] font-medium text-emerald-700">Preview lokasi laporan</p>
                        <p className="text-[11px] text-emerald-500">Klik untuk buka peta penuh</p>
                    </div>
                </div>

                <div className="mt-3 flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <i className="ti ti-map-pin text-sm text-emerald-600" aria-hidden="true" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Alamat Lengkap</p>
                        <p className="text-[13px] font-medium text-gray-800 leading-relaxed">
                            Jl. Harjamukti, Kec. Kebayoran Lama, Jakarta Timur
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}