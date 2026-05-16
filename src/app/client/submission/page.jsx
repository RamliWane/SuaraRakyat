import NavbarHome from "../../components/client/NavbarHome";
import SideBar from "../../components/client/SideBar";
import RightBar from "../../components/client/RightBar";
import FilterCategory from "../../components/client/FilterCategory";

export default function Submission() {
    return (
        <div className="h-screen flex flex-col overflow-hidden text-black">
            <NavbarHome />
            <div className="flex flex-1 overflow-hidden">
                <SideBar className=" flex-0" />

                <div className="main-grid overflow-y-auto overflow-x-hidden no-scrollbar animate-slide-up animate-delay-200 grid-rows-[auto_auto_auto]">
                    <header className="flex-1 min-w-0 p-0 sm:p-2 md:p-4 lg:p-4">
                        <div className="flex flex-col min-w-0 gap-3 p-3">
                            <section>
                                <h1 className="text-xl font-bold">LAPORAN SAYA</h1>
                                <p className="text-sm text-gray-500">Ini ringkasan laporan dan aktivitas terbaru kamu.</p>
                            </section>
                                <FilterCategory />
                        </div>
                    </header>

                    <main className="flex [grid-area:main] flex-col m-5">
                        <div className="flex flex-col gap-3 ">
                            <section className="flex items-start justify-between gap-2 flex-wrap">
                                <div className="flex flex-col">
                                    <h1 className="text-[17px] font-bold">RECENTLY PLAYED</h1>
                                    <h1 className="text-[13px] font-mono">Tingkatkan Literasi Mu!</h1>
                                </div>
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}