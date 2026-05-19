"use client";

import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import { useState } from "react";
import Stepper from "../../components/client/StepperMain";

export default function BikinLaporan() {
    const [name, setName] = useState("");

    return (
        <div className="h-screen flex flex-col overflow-hidden text-black">
            <NavbarHome />
            <div className="flex flex-1 overflow-hidden">
                <SideBar />

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar animate-slide-up animate-delay-200">
                    <header className="flex-1 min-w-0 p-0 sm:p-2 md:p-4 lg:p-4">
                        <div className="flex flex-col min-w-0 gap-3 p-3">
                            <section>
                                <h1 className="text-xl font-bold">BUAT LAPORAN BARU</h1>
                                <p className="text-sm text-gray-500">Laporkan Masalah Di Sekitar Anda Untuk Membantu Lingkungan Menjadi Lebih Baik</p>
                            </section>
                        </div>
                    </header>

                    <main className="flex">
                       <Stepper />
                    </main>
                </div>
            </div>
        </div>
    )
}