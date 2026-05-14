"use client"
import { libraryNav, menuNav } from "@/lib/navigationItems";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className={`h-screen transform transition-all border-r border-gray-300 duration-300 overflow-hidden shrink-0
            ${isOpen ? "translate-x-0 w-50" : "-translate-x-full w-0"}
            lg:translate-x-0 lg:w-50`}>

            <div className="h-full bg-white shadow-xl text-gray-500 p-10 min-w-50">
                <div className="m-4 space-y-6">
                    <h3 className="text-[12px] font-bold -ml-5">LIBRARY</h3>
                    <ul className="space-x-2">
                        {libraryNav.map((item) => (
                            <Link href={item.href} key={item.label}>
                                <li className={`flex items-center gap-8 cursor-pointer ${pathname === item.href ? "text-blue-600" : "hover:text-blue-600 text-gray-500"}`}>    
                                    <div className="flex gap-2">    
                                        {item.icon}
                                        {item.label}
                                    </div>
                                    {pathname === item.href && (
                                        <div className="w-1.5 h-6 pl-1 bg-blue-500 rounded-full"/>
                                    )}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <h3 className="text-[12px] font-bold -ml-5">MENU</h3>
                    <ul className="space-x-2">
                        {menuNav.map((item) => (
                            <Link href={item.href} key={item.label}>
                                <li className={`flex items-center gap-1 cursor-pointer ${pathname === item.href ? "text-blue-600" : "hover:text-blue-600 text-gray-500"}`}>
                                    {item.icon}
                                    {item.label}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}