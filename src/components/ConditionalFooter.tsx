"use client";

import { usePathname } from "next/navigation";
import { Footer as FooterComponent } from "./Footer";

export function ConditionalFooter() {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    if (isAuthPage) return null;

    return <FooterComponent />;
}
