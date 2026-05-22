"use client"
import { useRouter } from "next/navigation";

export default function ButtonBuatLaporan() {
    const router = useRouter();

    return (
        <button onClick={() => router.push("/client/bikinlaporan")} className="px-3 bg-[#DC9B9B] text-[15px] rounded-md transition-colors whitespace-nowrap font-medium text-white">
            + Buat Laporan
        </button>
    )
    
}