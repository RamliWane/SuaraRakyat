"use client";

const dummyData = [
    {
        id: 1,
        status: "Diproses",
        kategori: "Infrastruktur",
        nama: "Rina Handayani",
        lokasi: "Kebayoran Baru",
        waktu: "2 jam lalu",
        judul: "Jalan berlubang depan SDN 04 sangat berbahaya, sudah 2 motor jatuh",
        deskripsi: "Lubang sedalam ±30cm dan lebar 50cm. Saat hujan tertutup air sehingga tidak terlihat. Mohon segera diperbaiki.",
        gambar: null,
    },
    {
        id: 2,
        status: "Selesai",
        kategori: "Lingkungan",
        nama: "Budi Santoso",
        lokasi: "Tebet",
        waktu: "5 jam lalu",
        judul: "Tumpukan sampah liar di pinggir jalan sudah seminggu tidak diangkut",
        deskripsi: "Bau menyengat mengganggu warga sekitar. Sudah lapor RT tapi belum ada tindakan.",
        gambar: null,
    },
    {
        id: 3,
        status: "Ditolak",
        kategori: "Keamanan",
        nama: "Sari Dewi",
        lokasi: "Menteng",
        waktu: "1 hari lalu",
        judul: "Lampu jalan mati di gang sempit rawan kejahatan",
        deskripsi: "Sudah 3 minggu mati. Warga takut keluar malam.",
        gambar: null,
    },
    {
        id: 4,
        status: "Diproses",
        kategori: "Infrastruktur",
        nama: "Ahmad Fauzi",
        lokasi: "Jaksel",
        waktu: "1 hari lalu",
        judul: "Saluran air mampet menyebabkan banjir setiap hujan deras turun",
        deskripsi: "Air meluap sampai masuk ke rumah warga. Sudah terjadi 4 kali bulan ini. Kami mohon segera ditangani karena kerugian material cukup besar.",
        gambar: null,
    },
    {
        id: 5,
        status: "Selesai",
        kategori: "Pendidikan",
        nama: "Mega Pratiwi",
        lokasi: "Cijantung",
        waktu: "2 hari lalu",
        judul: "Atap kelas SDN 07 bocor parah saat hujan",
        deskripsi: "Murid terpaksa belajar dengan payung. Sudah dilaporkan ke pihak sekolah namun belum ada respons dari dinas.",
        gambar: null,
    },
    {
        id: 6,
        status: "Diproses",
        kategori: "Lingkungan",
        nama: "Hendra Wijaya",
        lokasi: "Pasar Minggu",
        waktu: "2 hari lalu",
        judul: "Pohon besar condong ke kabel listrik sangat berbahaya",
        deskripsi: "Ranting sudah menyentuh kabel PLN. Khawatir roboh saat angin kencang.",
        gambar: null,
    },
    {
        id: 7,
        status: "Selesai",
        kategori: "Keamanan",
        nama: "Lilis Suryani",
        lokasi: "Mampang",
        waktu: "3 hari lalu",
        judul: "CCTV di area pasar mati semua sejak bulan lalu",
        deskripsi: "Beberapa kasus copet terjadi setelah CCTV mati. Warga resah.",
        gambar: null,
    },
    {
        id: 8,
        status: "Diproses",
        kategori: "Infrastruktur",
        nama: "Rizky Ramadhan",
        lokasi: "Kalibata",
        waktu: "3 hari lalu",
        judul: "Jembatan penghubung antar RW retak dan mulai ambles di bagian tengah",
        deskripsi: "Jembatan ini digunakan ratusan warga tiap hari untuk akses ke pasar dan sekolah. Retakan semakin lebar tiap minggu dan sudah mulai ambles di tengah. Sangat berbahaya untuk pejalan kaki dan motor.",
        gambar: null,
    },
];

const statusStyle = {
    Diproses: "bg-amber-50 text-amber-700",
    Selesai: "bg-green-50 text-green-700",
    Ditolak: "bg-red-50 text-red-600",
};

export default function LaporanCard() {
    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
            {dummyData.map((laporan) => {
                const { id, status, kategori, nama, lokasi, waktu, judul, deskripsi, gambar } = laporan;
                const inisial = nama.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

                return (
                    <div key={id} className="break-inside-avoid mb-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-700 overflow-hidden">
                        
                        <div className="bg-zinc-800 h-[120px] flex items-center justify-center">
                            {gambar ? (
                                <img src={gambar} alt="foto laporan" className="w-full h-full object-cover" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 17l4-8 4 4 2-3 4 7H4z" /><circle cx="9" cy="9" r="1" />
                                </svg>
                            )}
                        </div>

                        <div className="p-3 flex flex-col gap-2.5">

                            <div className="flex gap-1.5 flex-wrap">
                                <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md ${statusStyle[status] ?? "bg-gray-100 text-gray-600"}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                    {status}
                                </span>
                                <span className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 text-[11px] px-2 py-0.5 rounded-md border border-gray-200 dark:border-zinc-700">
                                    {kategori}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[12px] font-medium shrink-0">
                                    {inisial}
                                </div>
                                <div>
                                    <p className="text-[13px] font-medium text-gray-900 dark:text-white">{nama}</p>
                                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                                        </svg>
                                        {lokasi} · {waktu}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-zinc-700 pt-2.5">
                                <p className="text-[13px] font-medium text-gray-900 dark:text-white leading-snug mb-1">{judul}</p>
                                <p className="text-[12px] text-gray-500 dark:text-zinc-400 leading-relaxed">{deskripsi}</p>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}