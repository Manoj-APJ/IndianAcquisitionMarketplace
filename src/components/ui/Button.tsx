import { ButtonHTMLAttributes, FC } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
    size?: "sm" | "md" | "lg";
}

export const Button: FC<ButtonProps> = ({
    className,
    variant = "primary",
    size = "md",
    children,
    ...props
}) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center font-semibold text-sm disabled:pointer-events-none disabled:opacity-50 transition-all duration-200",
                {
                    "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-glow": variant === "primary",
                    "bg-white text-gray-900 hover:bg-gray-50 shadow-soft": variant === "secondary",
                    "bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300": variant === "outline",
                    "bg-transparent hover:bg-gray-100 text-gray-700": variant === "ghost",
                    "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white hover:shadow-glow-orange": variant === "gradient",

                    "h-9 px-4 rounded-xl text-xs": size === "sm",
                    "h-11 px-6 rounded-xl": size === "md",
                    "h-12 px-8 text-base rounded-2xl": size === "lg",
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
