"use client";

import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";


export default function LikeButton() {
    const [liked, setLiked] = useState(false);

    const initialLikes = 0; // Jumlah like awal
    const totalLikes = liked ? initialLikes + 1 : initialLikes; // Total like yang ditampilkan

    const handleLike = () => {
            setLiked(!liked);
    };
    
    return (
        <div className="flex gap-1 ml-auto text-gray-400">
            <Heart onClick={handleLike} 
                className={`w-4 h-4 cursor-pointer transition-colors 
                    ${liked ? "text-red-500" 
                            : "hover:text-red-500"
                }`} />
            <span className="text-[11px]">{totalLikes}</span>
        </div>
    )
}