"use client"
import { AdminNavigation, AdminNavigationMenu } from "../../../lib/navigationitems";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react";

export default function SidebarAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Hamburger button — mobile only */}
            <button
                onClick={() => setIsOpen(p => !p)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center shadow-lg border-0 cursor-pointer"
                aria-label="Toggle sidebar"
            >
                <i className={`ti ${isOpen ? "ti-x" : "ti-menu-2"} text-lg`} />
            </button>

            {/* Backdrop — mobile only */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed lg:static top-0 left-0 h-screen z-40 shrink-0
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0 w-49`}>

                <div className="h-full bg-[#A2CB8B] shadow-xl text-white flex flex-col py-8 px-5">
                    <div className="flex flex-col gap-6 flex-1">
                        <div>
                            <h1 className="text-[10px] font-bold tracking-widest text-white uppercase mb-3 px-1">
                                NAVIGATION
                            </h1>
                            <ul className="flex flex-col gap-1">
                                {AdminNavigation.map((item) => (
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
                                {AdminNavigationMenu.map((item) => (
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
                </div>
            </div>
        </>
    )
}