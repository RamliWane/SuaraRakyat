export default function DetailLaporanPending() {
    return (
        <div className="flex flex-col gap-2">

            {/* HEADER DETAIL */}
            <div className="overflow-hidden rounded-[24px] border border-[#232323] bg-[#161616]">

                {/* IMAGE */}
                <div className="relative h-[280px] w-full overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop"
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-black/20 to-transparent" />

                    <div className="absolute left-6 top-6 flex items-center gap-2">
                        <span className="rounded-full bg-[#DC9B9B] px-3 py-1 text-[11px] font-semibold text-white">
                            Pending
                        </span>

                        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                            Jalan Rusak
                        </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white">
                            Jalan rusak di daerah TB Simatupang
                            menyebabkan kemacetan panjang
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#B0B0B0]">
                            Warga melaporkan kondisi jalan yang
                            berlubang cukup parah dan membahayakan
                            pengendara motor terutama saat malam hari.
                        </p>
                    </div>
                </div>

                {/* INFO */}
                <div className="grid grid-cols-2 gap-5 border-t border-[#232323] p-6 lg:grid-cols-4">

                    <div className="rounded-2xl bg-[#111111] p-4">
                        <p className="text-[11px] uppercase tracking-wide text-[#777]">
                            Dilaporkan Oleh
                        </p>

                        <h2 className="mt-2 text-sm font-semibold text-white">
                            Ramli Silawane
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-[#111111] p-4">
                        <p className="text-[11px] uppercase tracking-wide text-[#777]">
                            Tanggal
                        </p>

                        <h2 className="mt-2 text-sm font-semibold text-white">
                            18 Mei 2026
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-[#111111] p-4">
                        <p className="text-[11px] uppercase tracking-wide text-[#777]">
                            Kecamatan
                        </p>

                        <h2 className="mt-2 text-sm font-semibold text-white">
                            Harjamukti
                        </h2>
                    </div>

                    <div className="rounded-2xl bg-[#111111] p-4">
                        <p className="text-[11px] uppercase tracking-wide text-[#777]">
                            Lokasi
                        </p>

                        <h2 className="mt-2 text-sm font-semibold text-white">
                            Jakarta Timur
                        </h2>
                    </div>
                </div>
            </div>

            {/* GALERI */}
            <div className="rounded-[24px] border border-[#232323] bg-[#161616] p-6">

                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Dokumentasi Laporan
                        </h2>

                        <p className="mt-1 text-sm text-[#7A7A7A]">
                            Foto pendukung dari warga pelapor
                        </p>
                    </div>

                    <span className="rounded-full border border-[#2A2A2A] bg-[#111111] px-3 py-1 text-xs text-[#B0B0B0]">
                        4 Foto
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

                    <div className="group relative overflow-hidden rounded-2xl border border-[#2A2A2A]">
                        <img
                            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-[#2A2A2A]">
                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border border-[#2A2A2A]">
                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                            className="h-44 w-full object-cover transition duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
                    </div>

                    <div className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#323232] bg-[#111111] transition hover:border-[#DC9B9B]">
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
                            Tambah Dokumentasi
                        </p>
                    </div>
                </div>
            </div>

            {/* MAP */}
            <div className="rounded-[24px] border border-[#232323] bg-[#161616] p-6">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-white">
                        Lokasi Laporan
                    </h2>

                    <p className="mt-1 text-sm text-[#7A7A7A]">
                        Titik lokasi laporan dari warga
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-[#262626]">

                    <div className="relative flex h-[320px] items-center justify-center bg-[#101010]">

                        <div className="absolute inset-0 opacity-[0.04]">
                            <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>

                        <div className="z-10 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#DC9B9B]">
                                <svg
                                    className="h-8 w-8 text-white"
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
                            </div>

                            <p className="text-sm text-[#A0A0A0]">
                                Preview lokasi laporan
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#111111] p-4">
                    <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#DC9B9B]"
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

                    <div>
                        <p className="text-[11px] uppercase tracking-wide text-[#666]">
                            Alamat Lengkap
                        </p>

                        <h2 className="mt-1 text-sm font-medium leading-relaxed text-white">
                            Jl. Harjamukti, Kec. Kebayoran Lama,
                            Jakarta Timur
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}