import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    color?: "violet" | "blue" | "green" | "yellow" | "gray" | "amber";
}

export const Badge: React.FC<BadgeProps> = ({ children, className, color = "gray" }) => {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium transition-colors",
                {
                    "bg-violet-50 text-violet-700": color === "violet",
                    "bg-blue-50 text-blue-700": color === "blue",
                    "bg-green-50 text-green-700": color === "green",
                    "bg-yellow-50 text-yellow-700": color === "yellow",
                    "bg-gray-100 text-gray-700": color === "gray",
                    "bg-amber-50 text-amber-700": color === "amber",
                },
                className
            )}
        >
            {children}
        </span>
    );
};
