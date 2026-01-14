"use client";

import { usePathname } from "next/navigation";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    return (
        <>
            <main className={isAuthPage ? "" : "min-h-screen"}>
                {children}
            </main>
        </>
    );
}
