"use client"
import Image from "next/image";
import { libraryNav, menuNav } from "../../../lib/navigationitems";
import Link from "next/link"
import { Logout } from "../../../lib/api/auth";
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const pathname = usePathname();

    async function handleLogout() {
        await Logout();
}

    return (
        <>
            {/* Hamburger — mobile only */}
            <button
                onClick={() => setIsOpen(p => !p)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-[#A2CB8B] text-white rounded-xl flex items-center justify-center shadow-lg border-0 cursor-pointer"
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

            <div
                onMouseEnter={() => setExpanded(true)}
                onMouseLeave={() => setExpanded(false)}
                className={`fixed lg:static top-0 left-0 h-screen z-40 shrink-0
                    transform transition-all duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                    ${expanded ? "w-[200px]" : "w-[60px]"}`}
            >
                <div className="h-full bg-[#A2CB8B] rounded-r-2xl shadow-xl text-white flex flex-col py-8 px-3 overflow-hidden">
                
                    <div className="flex flex-col gap-3 flex-1 justify-center">
                        <div>
                            <ul className="flex flex-col gap-2">
                                {libraryNav.map((item) => (
                                    <Link href={item.href} key={item.label} onClick={() => setIsOpen(false)}>
                                        <li className={`relative flex items-center gap-2.5 px-2 py-2.5 rounded-xl text-[14px] font-medium cursor-pointer transition-all duration-200
                                            ${pathname === item.href
                                                ? "bg-white text-[#A2CB8B]"
                                                : "text-white hover:bg-white/10"
                                            }`}>
                                            <span className="shrink-0">{item.icon}</span>
                                            {expanded && (
                                                <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
                                            )}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <ul className="flex flex-col gap-1">
                                {menuNav.map((item) => (
                                    <Link href={item.href} key={item.label} onClick={() => setIsOpen(false)}>
                                        <li className={`relative flex items-center gap-2.5 px-2 py-2.5 rounded-xl text-[14px] font-medium cursor-pointer transition-all duration-200
                                            ${pathname === item.href
                                                ? "bg-white text-[#A2CB8B]"
                                                : "text-white hover:bg-white/10"
                                            }`}>
                                            <span className="shrink-0">{item.icon}</span>
                                            {expanded && (
                                                <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
                                            )}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[14px] font-medium text-white hover:bg-red-500/20 hover:text-red-100 transition-all duration-200 cursor-pointer border-0 bg-transparent"
                        >
                            <span className="shrink-0"><i className="ti ti-logout text-base" /></span>
                            {expanded && <span className="whitespace-nowrap">Logout</span>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}