"use client";

import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import Stepper from "../../components/client/StepperMain";
import FormBikinLaporan from "../../components/client/FormBikinLaporan";
import PanduanBikinLaporan from "../../components/client/PanduanBikinLaporan";

export default function BikinLaporan() {
    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <NavbarHome />

            <div className="flex flex-1 overflow-hidden">
                <SideBar className="flex-0" />

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-5 animate-slide-up animate-delay-200">

                    <div className="flex items-start gap-5">
                        <div className="flex flex-1 flex-col gap-5">
                            <header>
                                <div className="flex flex-col gap-2">
                                    <section>
                                        <h1 className="text-xl font-bold text-black">
                                            BUAT LAPORAN BARU
                                        </h1>

                                        <p className="text-sm text-gray-400">
                                            Laporkan masalah di sekitar Anda
                                            untuk membantu lingkungan menjadi
                                            lebih baik
                                        </p>
                                    </section>

                                    <Stepper />
                                </div>
                            </header>
                            <main>
                                <FormBikinLaporan />
                            </main>
                        </div>
                        <aside className="hidden xl:block w-60 sticky top-0">
                            <PanduanBikinLaporan />
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}