"use client";

import { usePathname } from "next/navigation";

export function ConditionalWrapper({
    navbar,
    footer,
    children
}: {
    navbar: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    return (
        <>
            {!isAuthPage && navbar}
            <main className={isAuthPage ? "" : "min-h-screen"}>
                {children}
            </main>
            {!isAuthPage && footer}
        </>
    );
}
