import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    color?: "blue" | "green" | "yellow" | "gray" | "amber";
}

export const Badge: React.FC<BadgeProps> = ({ children, className, color = "gray" }) => {
    return (
        <span
            className={cn(
                "inline-flex items-center border-2 border-black px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    "bg-blue-100": color === "blue",
                    "bg-green-100": color === "green",
                    "bg-yellow-100": color === "yellow",
                    "bg-gray-100": color === "gray",
                    "bg-amber-400": color === "amber",
                },
                className
            )}
        >
            {children}
        </span>
    );
};
