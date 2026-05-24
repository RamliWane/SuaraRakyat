"use client";

import React from "react";

export default function FilterCategory() {
    const filters = ["Semua", "Infrastruktur", "Lingkungan", "Keamanan", "Pendidikan"];
    const [activeFilter, setActiveFilter] = React.useState("Semua");
    
    return (
    <div className="flex flex-nowrap gap-2">
        {filters.map((filter) => (
            <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 sm:px-4 py-1.5 sm:py-1 text-[13px] rounded-md transition-colors whitespace-nowrap ${
                    activeFilter === filter
                        ? "bg-[#A2CB8B] text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
                {filter}
            </button>
        ))}
    </div>
);
}

