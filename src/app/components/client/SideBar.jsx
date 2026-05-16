"use client"
import { libraryNav, menuNav } from "../../../lib/navigationitems";
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

            <div className="h-full bg-[#1C1A18] shadow-xl text-white p-10 min-w-50">
                <div className="m-4 space-y-6">
                    <h3 className="text-[12px] font-bold -ml-5">NAVIGATION</h3>
                    <ul className="space-x-2">
                        {libraryNav.map((item) => (
                            <Link href={item.href} key={item.label}>
                                <li className={`flex items-center gap-8 cursor-pointer ${pathname === item.href ? "text-[#DC9B9B]" : "hover:text-[#DC9B9B] text-white"}`}>    
                                    <div className="flex gap-2">    
                                        {item.icon}
                                        {item.label}
                                    </div>
                                    {pathname === item.href && (
                                        <div className="w-1.5 h-6 pl-1 bg-[#DC9B9B] rounded-full"/>
                                    )}
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <h3 className="text-[12px] font-bold -ml-5">MENU</h3>
                    <ul className="space-x-2">
                        {menuNav.map((item) => (
                            <Link href={item.href} key={item.label}>
                                <li className={`flex items-center gap-1 cursor-pointer ${pathname === item.href ? "text-[#DC9B9B]" : "hover:text-[#DC9B9B] text-white"}`}>
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