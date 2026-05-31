"use client"
import { libraryNav, menuNav } from "../../../lib/navigationitems";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/logout", { method: "POST" });
        router.push("/");
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(p => !p)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center shadow-lg border-0 cursor-pointer"
                aria-label="Toggle sidebar"
            >
                <i className={`ti ${isOpen ? "ti-x" : "ti-menu-2"} text-lg`} />
            </button>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`fixed lg:static top-0 left-0 h-screen z-40 shrink-0
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 w-50`}>

                <div className="h-full bg-[#A2CB8B] shadow-xl text-white flex flex-col py-8 px-5">
                    <div className="flex flex-col gap-6 flex-1">
                        <div>
                            <h1 className="text-[10px] font-bold tracking-widest text-white uppercase mb-3 px-1">
                                NAVIGATION
                            </h1>
                            <ul className="flex flex-col gap-1">
                                {libraryNav.map((item) => (
                                    <Link href={item.href} key={item.label} onClick={() => setIsOpen(false)}>
                                        <li className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-medium cursor-pointer transition-all duration-200
                                            ${pathname === item.href
                                                ? "bg-white text-[#A2CB8B]"
                                                : "text-white hover:bg-white/10 hover:text-white"
                                            }`}>
                                            {item.icon}
                                            {item.label}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h1 className="text-[10px] font-bold tracking-widest text-white uppercase mb-3 px-1">
                                MENU
                            </h1>
                            <ul className="flex flex-col gap-1">
                                {menuNav.map((item) => (
                                    <Link href={item.href} key={item.label} onClick={() => setIsOpen(false)}>
                                        <li className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-medium cursor-pointer transition-all duration-200
                                            ${pathname === item.href
                                                ? "bg-white text-[#A2CB8B]"
                                                : "text-white hover:bg-white/10 hover:text-white"
                                            }`}>
                                            {item.icon}
                                            {item.label}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/20">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-medium text-white hover:bg-red-500/20 hover:text-red-100 transition-all duration-200 cursor-pointer border-0 bg-transparent"
                        >
                            <i className="ti ti-logout text-base" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}