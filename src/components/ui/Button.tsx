import { ButtonHTMLAttributes, FC } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline";
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
                "neo-button inline-flex items-center justify-center font-bold text-sm disabled:pointer-events-none",
                {
                    "bg-primary text-white hover:bg-blue-700": variant === "primary",
                    "bg-white text-black hover:bg-gray-50": variant === "secondary",
                    "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white": variant === "outline",

                    "h-9 px-4": size === "sm",
                    "h-12 px-8 text-base": size === "md",
                    "h-14 px-10 text-lg": size === "lg",
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
