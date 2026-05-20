
export default function DetailLaporanPending() {
    return (
        <div className="flex flex-col gap-3">
            <div className="rounded-[10px] border border-[#1B1B1B] bg-[#141414] p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        Jalan rusak di daeran tb pokok nya dah
                    </h2>

                    <p className="mt-1 font-medium text-[15px] text-[#8A8A8A]">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id tempora at obcaecati maiores molestiae pariatur quaerat optio debitis, corrupti laboriosam fugit repellat magnam perferendis quidem beatae provident delectus labore nemo?
                    </p>
                </div>
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <p className="text-[12px] text-gray-300">Dilaporkan Oleh</p>
                        <h1 className="text-white">Ramli silawane</h1>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[12px] text-gray-300">Tanggal Laporan</p>
                        <h1 className="text-white">Sekarang</h1>
                    </div>
                </div>
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <p className="text-[12px] text-gray-300">Daerah</p>
                        <h1 className="text-white">Depok Sonoan Dikit</h1>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[12px] text-gray-300">Kecamatan</p>
                        <h1 className="text-white">Harjamukti</h1>
                    </div>
                </div>
               
            </div>
            <div className="rounded-[10px] border border-[#1B1B1B] bg-[#141414] p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-white">
                        FOTO LAPORAN
                    </h2>
                </div>

                    <div>
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
                            <div className="h-28 min-w-[140px] overflow-hidden rounded-2xl border border-[#2A2A2A]">
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-white opacity-60 text-[10px] font-medium">4 Foto Dilampirkan - Click Untuk Perbesar</h1>
                        </div>
                    </div>
            </div>
        </div>
    )
}