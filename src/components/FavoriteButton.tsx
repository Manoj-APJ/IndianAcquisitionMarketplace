"use client";

import { useTransition } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/app/actions/favorites";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
    listingId: string;
    initialIsFavorite: boolean;
    isLoggedIn?: boolean;
}

export function FavoriteButton({ listingId, initialIsFavorite, isLoggedIn }: FavoriteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLoggedIn) {
            router.push("/login");
            return;
        }

        startTransition(async () => {
            await toggleFavorite(listingId, initialIsFavorite);
        });
    };

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className={cn(
                "p-2 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-soft",
                initialIsFavorite
                    ? "bg-red-500 text-white"
                    : "bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 border border-gray-100"
            )}
        >
            <Heart size={18} fill={initialIsFavorite ? "currentColor" : "none"} />
        </button>
    );
}
