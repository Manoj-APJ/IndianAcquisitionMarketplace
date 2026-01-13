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

    // Optimistic UI could be handled with useOptimistic in React 19 / Next 14, 
    // but standard state or just relying on server revalidation + fast transition is ok for now.
    // For immediate feedback, we'll assume success, but standard props are safer without complex state.
    // Let's stick to the prop for truth but allow immediate visual toggle if we wrapped this in local state.
    // We'll trust revalidatePath for now to keep it simple.

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
                "p-2 rounded-full border-2 border-black transition-all hover:scale-110 active:scale-95",
                initialIsFavorite ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-500 hover:border-red-500"
            )}
        >
            <Heart size={20} fill={initialIsFavorite ? "currentColor" : "none"} />
        </button>
    );
}
