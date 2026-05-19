export default function HomeFooter() {
    return (
        <section>
            <div className="flex border bg-[#D9D9D9] rounded-xl m-4 sm:m-10 gap-3 flex-col justify-center items-center p-4 sm:p-6">      
                <div className="flex flex-wrap text-black gap-3 sm:gap-5 justify-center" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    <h1 className="hover:underline text-sm sm:text-base cursor-pointer">FAQ</h1>
                    <h1 className="hover:underline text-sm sm:text-base cursor-pointer">Kebijakan Privasi</h1>
                    <h1 className="hover:underline text-sm sm:text-base cursor-pointer">Bantuan</h1>
                    <h1 className="hover:underline text-sm sm:text-base cursor-pointer">Tentang Kami</h1>
                </div>
                <div className="flex text-black text-center" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    <h1 className="text-[10px] sm:text-sm">Copyright © 2022 Dinas Perpustakaan dan Kearsipan Provinsi DKI Jakarta. Seluruh Hak Cipta Dilindungi Undang-Undang.</h1>
                </div>
            </div>
        </section>
    )
}