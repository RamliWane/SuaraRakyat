"use client"
import { useRouter } from "next/navigation";

export default function ButtonBuatLaporan() {
    const router = useRouter();

    return (
        <button onClick={() => router.push("/client/bikinlaporan")} className="px-3 bg-[#A2CB8B] text-[15px] rounded-md transition-colors whitespace-nowrap font-medium text-white">
            + Buat Laporan
        </button>
    )
    
}